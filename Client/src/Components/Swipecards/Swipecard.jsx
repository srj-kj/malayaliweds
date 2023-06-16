import React, { useState, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faHeart,
  faTimes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../Axios/axios";

import "./swipecard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Swipecard({ userProfiles, socket }) {
  console.log(socket);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showNoProfiles, setShowNoProfiles] = useState(false);
  const [matchuser, setmatchUser] = useState({});
  const [removeUser, setRemoveUser] = useState({});
  const [unmatchuser, setUnmatchUser] = useState({});
  const [undoRemove, setUndoRemove] = useState({});
  const [like, setLike] = useState({});
  const currentIndexRef = useRef(currentIndex);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((state) => state?.app?.user);

  const childRefs = useRef([]);
  useEffect(() => {
    const show = userProfiles.length > 0 ? false : true;
    setShowNoProfiles(show);
    childRefs.current = Array(userProfiles.length)
      .fill()
      .map((_, index) => childRefs.current[index] || React.createRef());
    setCurrentIndex(userProfiles.length);
  }, [userProfiles]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  useEffect(() => {
    if (matchuser._id) {
      handleMatch(matchuser._id);
    }
  }, [matchuser]);

  useEffect(() => {
    if (like._id) {
      handleLike(like._id);
    }
  }, [like]);

  useEffect(() => {
    if (unmatchuser._id) {
      setmatchUser({});
      handleUndoMatch(unmatchuser._id);
    }
  }, [unmatchuser]);

  useEffect(() => {
    if (undoRemove._id) {
      setRemoveUser({});
      handleUndoRemove(unmatchuser._id);
    }
  }, [undoRemove]);

  useEffect(() => {
    if (removeUser._id) {
      handleRemove(removeUser._id);
    }
  }, [removeUser]);
  const swiped = (direction, nameToDelete, index, character) => {
    alert(direction);
    if (direction == "right") {
      setmatchUser(character);
    } else if (direction == "left") {
      setRemoveUser(character);
    } else {
      return setLike(character);
    }

    console.log(direction, index, nameToDelete);
    updateCurrentIndex(index);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current === 0) {
      setShowNoProfiles(true);
    }
  };

  const swipe = (dir) => {
    console.log(currentIndex, userProfiles.length);
    console.log(currentIndex >= 1 && currentIndex < userProfiles.length);
    if (currentIndex >= 0 && currentIndex <= userProfiles.length) {
      const test = currentIndex - 1;
      console.log(test, "swipe");
      const childRef = childRefs.current[test];

      return childRef.current.swipe(dir);
    }
    return;
  };

  const undoSwipe = () => {
    console.log(currentIndex, userProfiles.length, "hiiiiiiiiii");
    if (currentIndex <= userProfiles.length) {
      const newIndex = currentIndex + 1;
      console.log(newIndex);
      updateCurrentIndex(newIndex);
      setUnmatchUser(matchuser);
    }
  };
  function handleMatch(id) {
    alert("hi");

    const data = {
      user: user.id,
      matchUser: id,
    };
    socket?.current.emit("match", id);
    axios.post("/api/match", data).then(() => {
      setRefresh(!refresh);
    });
  }
  function handleUndoMatch(id) {
    alert("remove");
    const data = {
      user: user.id,
      matchUser: id,
    };
    axios.post("/api/undomatch", data).then(() => {
      setRefresh(!refresh);
    });
  }

  function handleRemove(id) {
    alert("remooooooo");
    const data = {
      user: user.id,
      removeUser: id,
    };
    axios.post("/api/notinterest", data).then(() => {
      setRefresh(!refresh);
    });
  }
  function handleUndoRemove(id) {
    alert("remooooooo");
    const data = {
      user: user.id,
      removeUser: id,
    };
    axios.post("/api/undoremove", data).then(() => {
      setRefresh(!refresh);
    });
  }
  function handleLike(id) {
    const data = {
      user: user.id,
      likedUser: id,
    };
    axios.post("/api/like", data).then(() => {
      setRefresh(!refresh);
    });
  }

  const viewProfile = (profileId) => {
    axios.get(`/profile/${profileId}`).then((response) => {
      if (response.data) {
        //dispatch(profileDetails(response.data));
        navigate(`/profile/${profileId}`);
      }
    });
  };
  return (
    <div>
      {!showNoProfiles ? (
        <div className="card card-compact ml-0 mt-6 w-full max-w-full justify-center bg-rose-100">
          <div className="cardContainer w-full h-full">
            {userProfiles.slice(0, currentIndex).map((character, index) => (
              <TinderCard
                ref={childRefs.current[index]}
                className="swipe"
                key={character._id}
                onSwipe={(dir) => {
                  swiped(dir, character.username, index, character);
                }}
                onCardLeftScreen={() => outOfFrame(character.username, index)}
              >
                <div
                  style={{ backgroundImage: `url(${character.url})` }}
                  className="card max-w-full max-h-full relative"
                  onClick={() => viewProfile(character._id)}
                >
                  <h3>{character.username}</h3>
                  
                </div>
              </TinderCard>
            ))}
            {!showNoProfiles && (
              <div className="buttons-container absolute bottom-0 gap-4 flex justify-center mb-3">
                <button
                  className="btn-round"
                  onClick={undoSwipe}
                  disabled={currentIndex >= userProfiles.length}
                >
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      className="text-gray-600 w-15 h-15"
                      icon={faUndo}
                    />
                  </div>
                </button>
                <button
                  className="rounded-full border-1 border-pink-600"
                  onClick={() => {
                    swipe("right");
                  }}
                >
                  <div className="circle-bg-green flex justify-center items-center">
                    <FontAwesomeIcon
                      className="text-white w-15 h-15"
                      icon={faHeart}
                    />
                  </div>
                </button>

                <button
                  className="rounded-full border-1 border-pink-600"
                  onClick={() => {
                    swipe(" ");
                  }}
                >
                  <div className="circle-bg-blue flex justify-center items-center">
                    <FontAwesomeIcon
                      className="text-white w-15 h-15"
                      icon={faThumbsUp}
                    />
                  </div>
                </button>

                <button className="btn-round" onClick={() => swipe("left")}>
                  <div className="circle-bg-gray">
                    <FontAwesomeIcon
                      className="rounded-full text-white w-12 h-12"
                      icon={faTimes}
                    />
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card ml-10  md:bg-slate-400 md:w-full mt-10 card-compact w-80 max-w-full max-h-full justify-center bg-green-500">
          <div className="noProfilesMessage text-black text-xl font-bold">
            No matched profiles for you.
          </div>
          <div className="text-white text-lg font-bold mt-5">
            Change Your Preferences{" "}
          </div>
          <div className="text-white text-lg font-bold">for more profiles</div>
        </div>
      )}
    </div>
  );
}

export default Swipecard;
