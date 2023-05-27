import express from "express";
import { googleAuth, login, otp, signup } from "../controller/userController";
import User from "../model/userSchema";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.post("/auth/google", googleAuth);

router.post("/otp/login", otp);

router.post("/profile/general/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.height) {
      req.body.height = parseInt(req.body.height);
    }
    console.log(req.body);

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
});

router.get("/profile/general/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    console.log(user);

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
});
router.post("/profile/religion/:id", async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const { religion, Caste } = req.body;
  const data = {
    religion: religion,
    Caste: Caste,
  };
  await User.findByIdAndUpdate(id, data, { upsert: true });
  res.status(201).json({ message: "Successfully Updated" });
});

router.get("/profile/religion/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    console.log(user);

    const data = {
      religion: user?.religion,
      Caste: user?.Caste,
    };

    res.status(201).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile/education/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    console.log(user);
    console.log(user?.Job);
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
});

// router.get("/profile/general/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await User.findById({ _id: id });
//     console.log(user);

//     const data = {
//       height: user?.height,
//       spokenLanguages: user?.spokenLanguages,
//       country: user?.country,
//       MaritalStatus: user?.MaritalStatus,
//       MotherTongue: user?.MotherTongue,
//       Bodytype: user?.Bodytype,
//       state: user?.state,
//       diet: user?.diet,
//       smoke: user?.smoke,
//       city: user?.city,
//       bio: user?.bio,
//       weight: user?.weight,
//       bloodgroup: user?.bloodgroup,
//       drink: user?.drink,
//       PhysicalStatus: user?.PhysicalStatus,
//       Complexion: user?.Complexion,
//     };

//     res.status(201).json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.post("/profile/education/:id", async (req, res) => {
  console.log(req.body);
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
});

router.get("/profile/preferences/:id", async (req, res) => {
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
});

router.post("/profile/preferences/:id", async (req, res) => {
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
  console.log(req.body);

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
});

router.get("/search/:id", async (req, res) => {
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

  // Check if complexion is specified in req.body
  // if (user?.Complexion) {
  //   query.complexion = user?.Complexion;
  // }

  // Check if country is specified in req.body
  // if (user?.country) {
  //   query.country = user?.country;
  // }

  // Check if city is specified in req.body
  // if (req.body.city) {
  //   query.city = req.body.city;
  // }

  // Check if state is specified in req.body

  // Check if diet is specified in req.body
  // if (user?.prefDiet) {
  //   query.diet = user?.prefDiet;
  // }

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

  console.log(query);

  if (user) {
    try {
      const people = await User.find(query).select("-password").exec();

      res.status(200).json(people);
    } catch (err) {
      console.log("An error occurred:", err);
    }
  }
});

router.get("/profile/:id", async (req, res) => {
  console.log(req.params.id);
  const profile = await User.findById(req.params.id).select("-password").exec();
  console.log(profile);

  res.status(200).json(profile);
});

router.post("/connect/", async (req, res) => {
  console.log(req.body);

  const follower = await User.findById(req.body.user).select(
    "_id username email"
  );
  const follow = await User.findById(req.body.followingId).select(
    "_id username email"
  );

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

  console.log(followers);
  console.log(following);

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
});

router.post("/follow", async (req, res) => {
  const following = await User.findById(req.body.user);
  const checked: any = following?.following.some(
    (obj) => obj.followId == req.body.follower
  );

  console.log(checked);
  res.status(200).json(checked);
});
export default router;
