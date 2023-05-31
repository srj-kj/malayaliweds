import express, { Request, Response } from "express";
import User from "../model/userSchema";
import bcrypt from "bcrypt";
import moment from "moment";

import jwt from "jsonwebtoken";
const router = express.Router();
import { OAuth2Client } from "google-auth-library";

import dotenv from "dotenv";
import sharp from "sharp";
import crypto from "crypto";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../helpers/s3";

dotenv.config();
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

function generateProfileId() {
  return Math.floor(10000 + Math.random() * 90000);
}

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    if (user.blocked) {
      return res.status(404).json({ message: "Unauthorized User" });
    }

    const userPass = await bcrypt.compare(password, user.password as string);

    if (!userPass) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );
    const data: any = {
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      profileId: user.profileId,
      accessToken,
    };
    if (!user?.profileImage) {
      return res.status(200).json(data);
    }
    const url = await getObjectSignedUrl(user?.profileImage as string);
    data.url = url;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const user: any = {
      username: req.body.name,
      email: req.body.email,
      phone: req.body.mobile,
      dob: req.body.dob,
      gender: req.body.gender,
    };

    const dob = moment(user?.dob);

    const today = moment();
    user.age = today.diff(dob, "years");

    const userFind = await User.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });

    if (userFind) {
      return res.status(400).json({ message: "User Exist" });
    }
    let profileId = generateProfileId();
    let isUnique = false;

    // Generate a unique 5-digit profile ID
    while (!isUnique) {
      const existingProfile = await User.findOne({ profileId });
      if (existingProfile) {
        // If profile ID already exists, generate a new one
        profileId = generateProfileId();
      } else {
        // Profile ID is unique
        isUnique = true;
      }
    }

    user.profileId = profileId;
    const password = await bcrypt.hash(req.body.password, 10);
    user.password = password;
    await User.create(user);
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const email = data.email;
    const user = await User.findOne({ email });
    const accessToken = jwt.sign(
      { userId: user?._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );

    if (user?.blocked) {
      return res.status(404).json({ message: "Account is Restricted" });
    }

    if (!user) {
      const userField = {
        email: data.email,
        username: data.name,
        isGoogleRegister: true,
      };

      const gUser = await User.create(userField);
      const accessToken = jwt.sign(
        { userId: gUser?._id.toString() },
        process.env.JWT_SECRET as string,
        { expiresIn: "2d" }
      );

      const details = {
        email: data.email,
        username: data.name,
        isGoogleRegister: true,
        accessToken,
      };
      res.status(200).json({ details, message: "Registration successful" });
    }
    if (user) {
      const details = {
        email: user.email,
        username: user.username,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        accessToken,
      };
      res.status(200).json({ details, message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const otp = async (req: Request, res: Response) => {
  try {
    const phone = req.body.phone;

    const user = await User.findOne({ phone });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    const accessToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2d" }
    );
    const data = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      accessToken,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const general = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (req.body.height) {
      req.body.height = parseInt(req.body.height);
    }

    const data = {
      username: req.body.username,
      height: req.body.height,
      spokenLanguages: req.body.spokenLanguages,
      country: req.body.country,
      MaritalStatus: req.body.MaritalStatus,
      MotherTongue: req.body.MotherTongue,
      Bodytype: req.body.Bodytype,
      state: req.body.state,
      diet: req.body.diet,
      smoke: req.body.smoke,
      city: req.body.city,
      weight: req.body.weight,
      bio: req.body.bio,
      bloodgroup: req.body.bloodgroup,
      drink: req.body.drink,
      Complexion: req.body.Complexion,
      PhysicalStatus: req.body.PhysicalStatus,
    };

    await User.findByIdAndUpdate(id, data, { upsert: true });

    res.status(201).json({ message: "Successfully Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGeneral = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    const data = {
      height: user?.height,
      spokenLanguages: user?.spokenLanguages,
      country: user?.country,
      MaritalStatus: user?.MaritalStatus,
      MotherTongue: user?.MotherTongue,
      Bodytype: user?.Bodytype,
      state: user?.state,
      diet: user?.diet,
      smoke: user?.smoke,
      city: user?.city,
      bio: user?.bio,
      weight: user?.weight,
      bloodgroup: user?.bloodgroup,
      drink: user?.drink,
      PhysicalStatus: user?.PhysicalStatus,
      Complexion: user?.Complexion,
    };

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postreligion = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { religion, Caste } = req.body;
  const data = {
    religion: religion,
    Caste: Caste,
  };
  await User.findByIdAndUpdate(id, data, { upsert: true });
  res.status(201).json({ message: "Successfully Updated" });
};

export const getReligion = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    const data = {
      religion: user?.religion,
      Caste: user?.Caste,
    };

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEducation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });

    const data = {
      Education: user?.Education,
      eduDetails: user?.eduDetails,
      school: user?.school,
      schoolPlace: user?.schoolPlace,
      Schoolyear: user?.Schoolyear,
      clgName: user?.clgName,
      clgPlace: user?.clgPlace,
      clgyear: user?.clgyear,
      Job: user?.Job,
      CompanyName: user?.CompanyName,
      jobLocation: user?.jobLocation,
    };

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postEducation = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    Education,
    eduDetails,
    school,
    schoolPlace,
    Schoolyear,
    clgName,
    clgPlace,
    clgyear,
    Job,
    CompanyName,
    jobLocation,
  } = req.body;
  const data = {
    Education: Education,
    eduDetails: eduDetails,
    school: school,
    schoolPlace: schoolPlace,
    Schoolyear: Schoolyear,
    clgName: clgName,
    clgPlace: clgPlace,
    clgyear: clgyear,
    Job: Job,
    CompanyName: CompanyName,
    jobLocation: jobLocation,
  };
  await User.findByIdAndUpdate(id, data, { upsert: true });
  res.status(201).json({ message: "Successfully Updated" });
};

export const getPref = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    const data = {
      ageFrom: user?.ageFrom,
      ageTo: user?.ageTo,
      heightFrom: user?.heightFrom,
      heightTo: user?.heightTo,
      prefReligion: user?.prefReligion,
      prefCaste: user?.prefCaste,
      prefDiet: user?.prefDiet,
      prefSmoke: user?.prefSmoke,
      prefDrink: user?.prefDrink,
    };

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postPref = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.body.ageFrom) {
    req.body.ageFrom = parseInt(req.body.ageFrom);
  }
  if (req.body.ageTo) {
    req.body.ageTo = parseInt(req.body.ageTo);
  }
  if (req.body.heightFrom) {
    req.body.heightFrom = parseInt(req.body.heightFrom);
  }
  if (req.body.heightTo) {
    req.body.heightTo = parseInt(req.body.heightTo);
  }

  const {
    ageFrom,
    ageTo,
    heightFrom,
    heightTo,
    prefCaste,
    prefDiet,
    prefSmoke,
    prefDrink,
    prefReligion,
  } = req.body;
  const data = {
    ageFrom: ageFrom,
    ageTo: ageTo,
    heightFrom: heightFrom,
    heightTo: heightTo,
    prefCaste: prefCaste,
    prefDiet: prefDiet,
    prefSmoke: prefSmoke,
    prefDrink: prefDrink,
    prefReligion: prefReligion,
  };
  await User.findByIdAndUpdate(id, data, { upsert: true });
  res.status(201).json({ message: "Successfully Updated" });
};

export const search = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  const query: any = {};

  // Check if age range is specified in req.body
  if (user?.ageFrom && user?.ageTo) {
    query.age = { $gte: user.ageFrom, $lte: user.ageTo };
  }
  if (user?.heightFrom && user?.heightTo) {
    query.height = { $gte: user.heightFrom, $lte: user.heightTo };
  }

  // Check if country is specified in req.body
  if (user?.country) {
    query.country = user?.country;
  }

  // Check if city is specified in req.body
  if (req.body.city) {
    query.city = req.body.city;
  }

  // Check if state is specified in req.body
  if (req.body.state) {
    query.state = req.body.state;
  }

  // Check if drink is specified in req.body
  if (user?.prefDiet) {
    query.diet = user?.prefDiet;
  }

  // Check if alcohol is specified in req.body
  if (user?.prefDrink) {
    query.drink = user?.prefDrink;
  }

  if (user?.prefSmoke) {
    query.smoke = user?.prefSmoke;
  }
  if (user?.prefReligion) {
    query.religion = user?.prefReligion;
  }

  // Check if gender is specified in req.body
  if (user?.gender === "male") {
    query.gender = "female";
  } else {
    query.gender = "male";
  }

  if (user) {
    try {
      let searchResults: any = await User.find(query)
        .where("blockingUsers.blockingUserId")
        .ne(user._id)
        .where("blockedUsers.blockedUserId")
        .ne(user._id)
        .select("-password")
        .exec();
      // console.log(user);
      if (searchResults) {
        const profileImageUrl: any = searchResults.map(
          async (person: any, index: any) => {
            if (person.profileImage) {
              const url = await getObjectSignedUrl(person?.profileImage);
              person.set("url", url, { strict: false });
            }
            return person;
          }
        );

        searchResults = await Promise.all(profileImageUrl);

        return res.status(200).json(searchResults);
      }
      console.log(searchResults);

      res.status(200).json(searchResults);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const profile = await User.findById(req.params.id)
      .select("-password")
      .exec();
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    if (profile.profileImage) {
      const url = await getObjectSignedUrl(profile.profileImage);
      profile.set("url", url, { strict: false });
      return res.status(200).json(profile);
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const connection = async (req: Request, res: Response) => {
  const follower = await User.findById(req.body.user).select(
    "_id username email following followers"
  );
  const follow = await User.findById(req.body.followingId).select(
    "_id username email following followers"
  );

  const isFollowing = follower?.following.some(
    (obj) => obj.followId == req.body.followingId
  );

  if (isFollowing) {
    await User.findByIdAndUpdate(
      follower?._id,
      { $pull: { following: { followId: follow?._id } } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      follow?._id,
      { $pull: { followers: { followerId: follower?._id } } },
      { new: true }
    );

    return res.status(200).json({ msg: "Unfollow successful" });
  }

  const followers = {
    followerId: follower?._id,
    followerName: follower?.username,
    followerEmail: follower?.email,
  };

  const following = {
    followId: follow?._id,
    followName: follow?.username,
    followEmail: follow?.email,
  };

  // Update follower's array
  await User.findByIdAndUpdate(
    req.body.followingId,
    { $push: { followers: followers } },
    { new: true }
  );

  // Update following's array
  await User.findByIdAndUpdate(
    req.body.user,
    { $push: { following: following } },
    { new: true }
  );
  res.status(200).json({ msg: "Follow successful" });
};

export const follow = async (req: Request, res: Response) => {
  const following = await User.findById(req.body.user);

  const checked: any = following?.following.some(
    (obj) => obj.followId == req.body.follower
  );

  res.status(200).json(checked);
};

export const block = async (req: Request, res: Response) => {
  try {
    const blockingUser = await User.findById(req.body.user).select(
      "_id username email blockedUsers blockingUsers"
    );
    const blockedUser = await User.findById(req.body.blockedUserId).select(
      "_id username email blockedUsers blockingUsers"
    );

    if (!blockingUser || !blockedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isBlocked = blockingUser.blockedUsers.some(
      (obj) => obj.blockedUserId.toString() === req.body.blockedUserId
    );

    if (isBlocked) {
      await User.findByIdAndUpdate(
        blockingUser._id,
        { $pull: { blockedUsers: { blockedUserId: blockedUser._id } } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        blockedUser._id,
        { $pull: { blockingUsers: { blockingUserId: blockingUser._id } } },
        { new: true }
      );

      return res.status(200).json({ msg: "Unblock successful" });
    }

    const blockedUserObject = {
      blockedUserId: blockedUser._id,
      blockedUserName: blockedUser.username,
      blockedUserEmail: blockedUser.email,
    };

    const blockingUserObject = {
      blockingUserId: blockingUser._id,
      blockingUserName: blockingUser.username,
      blockingUserEmail: blockingUser.email,
    };

    await User.findByIdAndUpdate(
      req.body.blockedUserId,
      { $push: { blockingUsers: blockingUserObject } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.body.user,
      { $push: { blockedUsers: blockedUserObject } },
      { new: true }
    );

    return res.status(200).json({ msg: "Block successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkBlock = async (req: Request, res: Response) => {
  const blockingUser = await User.findById(req.body.user);
  const checked: any = blockingUser?.blockedUsers.some(
    (obj) => obj.blockedUserId == req.body.blockedUserId
  );
  res.status(200).json(checked);
};

export const searchProfile = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.body.search;
    const profiles = await User.find({
      $or: [
        { email: { $regex: searchTerm, $options: "i" } },
        {
          profileId: isNaN(searchTerm)
            ? { $regex: searchTerm, $options: "i" }
            : parseInt(searchTerm),
        },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    }).select("_id");

    if (profiles.length === 0) {
      return res.status(404).json({ error: "No profiles found" });
    }

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const proPic = async (req: Request, res: Response) => {
  const file = req.file;
  const id = req.params.id;
  const imageName = generateFileName();

  const fileBuffer = await sharp(file?.buffer)
    .resize({ height: 150, width: 150, fit: "contain" })
    .toBuffer();
  console.log(imageName);

  await uploadFile(fileBuffer, imageName, file?.mimetype);
  const data = { profileImage: imageName };
  await User.findByIdAndUpdate(id, data, { upsert: true });
  const user = await User.findById({ _id: id }).select("profileImage");
  const url = await getObjectSignedUrl(user?.profileImage as string);
  res.status(201).json({ msg: "profile image updated successfully", url });
};

interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
}

interface UserDocument {
  _id: string;
  images: string[];
}

export const imagesUpload = async (
  req: Request,
  res: Response
): Promise<void> => {
  const files = req.files as UploadedFile[];
  const id = req.params.id as string;
  console.log(files);
  console.log(req.file);

  // Generate an array of image names for each uploaded file
  const imageNames: string[] = files.map(() => generateFileName());

  // Resize and process each image
  const processedImages = await Promise.all(
    files.map(async (file, index) => {
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 260, width: 1215, fit: "contain" })
        .toBuffer();
      const imageName = imageNames[index];
      await uploadFile(fileBuffer, imageName, file.mimetype);
      return imageName;
    })
  );

  // Update the user document with the array of image names
  const data: Partial<UserDocument> = { images: processedImages };

  await User.findByIdAndUpdate(id, data, { upsert: true });

  // Retrieve the updated user document
  const user = await User.findById(id).select("images");

  // Generate signed URLs for each image
  if (user) {
    const urls = await Promise.all(
      user.images.map((image) => getObjectSignedUrl(image))
    );

    res.status(201).json({ msg: "Images uploaded successfully", urls });
  }
};

export const getUploadedImages = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  console.log(id);

  const user = await User.findById(id).select("images");
  if (user?.images) {
    const urls = await Promise.all(
      user.images.map((image) => getObjectSignedUrl(image))
    );

    res.status(201).json({ urls });
  }
};

export const postMatch = async (req: Request, res: Response) => {};
