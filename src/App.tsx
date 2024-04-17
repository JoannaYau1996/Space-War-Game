import { useState, useRef, useEffect } from 'react';
import './App.css'



export default function App() {

  const username_value = useRef("");
  const intros = useRef([]);
  const go_top_el = useRef([]);
  const go_bottom_el = useRef([]);
  const hearts = useRef([]);
  const aliens = useRef([]);

  const [setting, setSetting] = useState(false);
  const [home, setHome] = useState(true);
  const [username, setUsername] = useState("");
  const [nameReminder, setNameReminder] = useState(false);
  const [opening, setOpening] = useState(false);
  const [intro, setIntro] = useState(false);
  const [directions, SetDirections] = useState(false);
  const [readyStart, setReadyStart] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(25);
  const [bgTopColor, setBgTopColor] = useState("#000000");
  const [bgBottomColor, setBgBottomColor] = useState("#282369");
  const [gameover, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [pause, setPause] = useState(false);


  useEffect(() => {
    if (readyStart) {
      const intervalId = setInterval(() => {
        setCountdown((countdown) => {
          return (countdown === 0) ? 0 : countdown - 1;
        });
      }, 1000);

      setTimeout(() => {
        setStart(true);
      }, 3000)

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [readyStart]);


  useEffect(() => {
    if (start) {
      const intervalId = setInterval(() => {
        setScore((score) => {
          return score + 1;
        });
      }, 1000);

      const intervalId2 = setInterval(() => {
        const row = Math.floor(Math.random() * 4);
        const number = Math.floor(Math.random() * 3)

      }, 3000);

      return () => {
        clearInterval(intervalId);
        clearInterval(intervalId2);
      };
    }
  }, [start]);

  function showIntro() {
    console.log(username_value.current.value.length);
    if (username_value.current.value.length === 0) {
      setNameReminder(true);
      return;
    }
    setOpening(false);
    setTimeout(() => {
      setSetting(false);
      setIntro(true);
      setHome(false);
    }, 1000);

    go_top_el.current[0].style.animation = "ufo-fly-out-top 0.5s ease-out forwards";
    go_top_el.current[1].style.animation = "title-fly-out-top 1s ease-out forwards";
    go_bottom_el.current[0].style.animation = "play-fly-out-bottom 0.5s ease-out forwards";
    go_bottom_el.current[1].style.animation = "play-fly-out-bottom 1s ease-out forwards";
  };

  function showDirections() {
    intros.current[0].style.animation = "fade-out 0.5s ease-out forwards";
    SetDirections(true);

    setTimeout(() => {
      intros.current[0].style.animation = "fade-in 1s ease-in forwards";
    }, 100);
  };


  function readyStartGame() {
    intros.current[0].style.animation = "fade-out 1s ease-out forwards";
    SetDirections(true);

    setTimeout(() => {
      intros.current[1].style.animation = "fade-in-out 2s ease-in-out forwards";
      intros.current[0].style.height = "0";
    }, 1000);

    setTimeout(() => {
      setIntro(false);
      SetDirections(false);
      setReadyStart(true);
    }, 3000);
  };



  return (
    <div className="bg-dark vh-100 w-100 d-flex justify-content-center align-items-center p-10">
      <div className="gameContainer">
        <div className='setting-icon position-absolute'>
          <a onClick={() => {
            setSetting(!setting);
            setOpening(false);
          }} >
            <img src="setting.svg" className='w-100' />
          </a>
        </div>
        <div className='vh-100 w-100 d-flex flex-column justify-content-center align-items-center position-relative'
          style={{ background: `radial-gradient(ellipse at top,  ${bgTopColor}, transparent), radial-gradient(ellipse at bottom, ${bgBottomColor}, transparent)` }}
        >
          <div className='bg-stars'>
            <div className='stars' style={{ animation: `translateY ${speed}s linear infinite` }}></div>
          </div>

          {home && (
            <>
              <img src="ufo1.svg" className='ufo-01 ufo' />
              <img src="ufo.svg" className='ufo-02 ufo' ref={(el) => (go_top_el.current[0] = el)} />
              <div className='title d-flex justify-content-center p-3' ref={(el) => (go_top_el.current[1] = el)}>
                <div className='words word1'>S</div>
                <div className='words word2'>P</div>
                <div className='words word3'>A</div>
                <div className='words word4'>C</div>
                <div className='words word5'>E</div>
                <div className='words word6'>W</div>
                <div className='words word7'>A</div>
                <div className='words word8'>R</div>
              </div>
              <div className='mt-5 start_game_btn' ref={(el) => (go_bottom_el.current[0] = el)}>
                <button className='px-4 py-2 btn text-light w-100 h-100' onClick={() => setOpening(true)}>Play</button>
              </div>
              <img src="earth.svg" className="earth-svg" ref={(el) => (go_bottom_el.current[1] = el)} />
            </>
          )}

          {opening && (
            <div className='name-input-box text-center d-flex p-4 flex-column align-items-center'>
              <h2 className='text-light mt-2 mb-4 box-title'>
                <label>Your Name</label>
              </h2>
              <input type="text" ref={username_value} onChange={(e) => {
                setNameReminder(false);
                setUsername(e.target.value);
              }
              } />
              {nameReminder && (
                <>
                  <span className='name-reminder mt-2'>Sorry, Name is required</span>
                </>
              )}
              <button className="btn btn-danger mt-4" onClick={showIntro}>Start</button>
            </div>
          )}

          {intro && (
            <div className='black_block d-flex align-items-center justify-content-center text-center flex-column p-5'>
              {!directions && (
                <div ref={(el) => (intros.current[0] = el)}>
                  <p className="text-light">{username} It's your first solo mission. Be careful and stay focused.</p>
                  <p className="text-light">Do you need me to repeat the mission instructions?</p>
                  <div>
                    <button className='btn btn-success' onClick={showDirections}>Yes</button>
                    <button className='btn btn-danger ms-5' onClick={readyStartGame}>No</button>
                  </div>
                </div>
              )}

              {directions && (
                <>
                  <div ref={(el) => (intros.current[0] = el)} style={{ opacity: '0' }}>
                    <p className="text-light">
                      You have a total of 3 hearts.
                      <br />
                      Every time you get hit, you will lose one heart.
                    </p>
                    <p className="text-light">
                      If you lose all 3 hearts, the mission will be over!
                    </p>
                    <p className="text-light">
                      Your mission is protect our planet while keeping yourself safe.
                    </p>
                    <p className="text-light">
                      Are you ready to begin your mission?
                    </p>
                    <button className='btn btn-success' onClick={readyStartGame}>
                      I'm Ready
                    </button>
                  </div>

                  <div ref={(el) => (intros.current[1] = el)} style={{ opacity: '0' }}>
                    <p className="text-light">
                      Good luck, {username}!
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {readyStart && (
            <>
              <div className='hearts d-flex'>
                <span ref={(el) => hearts.current[0] = el}>
                  <img src='heart.svg' />
                </span>
                <span ref={(el) => hearts.current[1] = el}>
                  <img src='heart.svg' />
                </span>
                <span ref={(el) => hearts.current[2] = el}>
                  <img src='heart.svg' />
                </span>
              </div>

              {!start && (
                <>
                  <div className="text-light">
                    {countdown}
                  </div>
                </>
              )}

              <div className='score text-light'>
                <span>{score}s</span>
              </div>
            </>
          )}

          {start && (
            <div className='ufo-container text-light row'>
              <div className='ufo-left ufo-row col-3' ref={(el) => aliens.current[0] = el}></div>
              <div className='ufo-center ufo-row col-3' ref={(el) => aliens.current[1] = el}></div>
              <div className='ufo-right ufo-row col-3' ref={(el) => aliens.current[2] = el}></div>
              <div className='ufo-right ufo-row col-3' ref={(el) => aliens.current[3] = el}></div>
            </div>
          )}

          {setting && (
            <div className='setting-box text-center d-flex p-4 flex-column align-items-center'>
              <h2 className='text-light my-2 box-title'>Setting</h2>
              <div className='setting-menu text-start d-flex p-2'>
              </div>
            </div>
          )}

          <img src="spaceship1.svg" className="space-ship" />
        </div>
      </div>
    </div >
  )
}