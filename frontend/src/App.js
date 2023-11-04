import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jokes } from "./dummyData.js";
import { avatarjoke, jokelogo } from "./assets/index.js";
const COOKIE_PREFIX = "joke_";

function App() {
  const [jokeIndex, setJokeIndex] = useState(0);
  const [userVotes, setUserVotes] = useState([]);
  const [hasUserVoted, setHasUserVoted] = useState(false);

  useEffect(() => {
    const hasVoted = Cookies.get(`${COOKIE_PREFIX}${jokeIndex + 1}_voted`);
    if (hasVoted) {
      setHasUserVoted(true);
    }
  }, [jokeIndex]);

  const handleVote = (vote) => {
    if (jokeIndex < jokes.length) {
      if (!hasUserVoted) {
        const updatedUserVotes = [
          ...userVotes,
          { jokeId: jokes[jokeIndex].id, vote },
        ];
        setUserVotes(updatedUserVotes);

        Cookies.set(`${COOKIE_PREFIX}${jokeIndex}_voted`, true);

        setJokeIndex(jokeIndex + 1);
        setHasUserVoted(false);
      }
    }
  };

  return (
    <div className="App">
      <div className="container-fuild">
        <div className="container-md	">
          <div className="header d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={jokelogo} alt="logo" width={80} height={80} />
            </div>
            <div className="d-flex gap-3">
              <div className="d-flex flex-column">
                <span className="fw-light fst-italic text-xs">
                  Handicrafted By
                </span>
                <span className="text-end text-xs">Jim HLS</span>
              </div>
              <img
                src={avatarjoke}
                alt="avatar"
                width={48}
                height={48}
                className="rounded-circle"
              />
            </div>
          </div>
        </div>
        <div
          className="hero  text-center d-flex align-items-center justify-content-center flex-column"
          style={{ height: "190px" }}
        >
          <div>
            <p className="h4 text-white mh">
              A joke a day keeps the doctor away
            </p>
            <span className="text-white h8 sh">
              If you joke wrong way, your teeth have to pay. (Serious)
            </span>
          </div>
        </div>
        <div className="container">
          <div className="content container mt-5 ">
            {jokeIndex < jokes.length ? (
              <div>
                <p className="text-sm">{jokes[jokeIndex].content}</p>
                <div className="d-flex align-items-center justify-content-center">
                  <hr style={{ width: "50%" }} className="d-none d-sm-block" />
                </div>
                {hasUserVoted ? (
                  <p className="text-center">
                    You've already voted for this joke.
                  </p>
                ) : (
                  <div className="btn-groups d-flex align-items-center justify-content-center gap-4 mt-3">
                    <button
                      onClick={() => handleVote("like")}
                      className="button-primary text-sm"
                    >
                      This is Funny!
                    </button>
                    <button
                      onClick={() => handleVote("dislike")}
                      className="button-success text-sm"
                    >
                      This is not funny.
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center">
                That's all the jokes for today! Come back another day!
              </p>
            )}
          </div>
        </div>
        <div className="container-fluid footer border rounded-bottom-1 p-4">
          <div className=" container">
            <div className="text-center ">
              <p className=" fw-light text-xs">
                This website is created as part of Hlsolutions program. The
                materials contained on this website are provided for general
                infomation only and do not constitute any form of advice. HLS
                assumes no responsibility for the accuracy of any paricular
                statement and accepts no liability for any loss or damage which
                may arise from reliance on the infomation contained on this
                site.
              </p>
              <span className="text-sm">Copyright 2021 HLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
