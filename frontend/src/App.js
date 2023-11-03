import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jokes } from "./dummyData.js";

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
        <div className="header d-flex container align-items-center justify-content-between">
          <div>
            <img
              src="data:image/png;base64,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"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <div className="d-flex gap-3">
            <div className="d-flex flex-column">
              <span className="fw-light fst-italic">Handicrafted By</span>
              <span className="text-end">Jim HLS</span>
            </div>
            <img
              src="data:image/png;base64,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"
              alt="avatar"
              width={48}
              height={48}
              className="rounded-circle"
            />
          </div>
        </div>
        <div
          className="hero text-center bg-success d-flex align-items-center justify-content-center flex-column"
          style={{ height: "200px" }}
        >
          <div>
            <p className="h3 text-white mh">
              A joke a day keeps the doctor away
            </p>
            <span className="text-white h8 sh">
              If you joke wrong way, your teeth have to pay. (Serious)
            </span>
          </div>
        </div>
        <div className="content container mt-5">
          {jokeIndex < jokes.length ? (
            <>
              <p>{jokes[jokeIndex].content}</p>
              <div className="d-flex align-items-center justify-content-center">
                <hr style={{ width: "50%" }} className="d-none d-sm-block" />
              </div>
              {hasUserVoted ? (
                <p className="text-center">
                  You've already voted for this joke.
                </p>
              ) : (
                <div className="btn-groups d-flex align-items-center justify-content-center gap-2 mt-3">
                  <button
                    onClick={() => handleVote("like")}
                    className="button-primary"
                  >
                    This is Funny!
                  </button>
                  <button
                    onClick={() => handleVote("dislike")}
                    className="button-success"
                  >
                    This is not funny.
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center">
              That's all the jokes for today! Come back another day!
            </p>
          )}
        </div>
        <div className=" footer border rounded-bottom-1 p-4">
          <div className=" container">
            <div className="text-center ">
              <p className=" fw-light ">
                This website is created as part of Hlsolutions program. The
                materials contained on this website are provided for general
                infomation only and do not constitute any form of advice. HLS
                assumes no responsibility for the accuracy of any paricular
                statement and accepts no liability for any loss or damage which
                may arise from reliance on the infomation contained on this
                site.
              </p>
              <span className="">Copyright 2021 HLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
