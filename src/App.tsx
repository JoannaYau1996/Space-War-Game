import './App.css'
import { useState, useRef, useEffect } from 'react';
import { lang } from './lang.jsx';



export default function App() {
  console.log(lang);
  const [name, setName] = useState("");
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(25);
  const [bgTopColor, setBgTopColor] = useState("#000000");
  const [bgBottomColor, setBgBottomColor] = useState("#282369");
  const [gameover, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [setting, setSetting] = useState(false);
  const [score, setScore] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [pause, setPause] = useState(false);




  return (
    < body className="bg-dark vh-100 w-100 d-flex justify-content-center align-items-center p-10">
      <div className="gameContainer">
        <div className='setting-icon position-absolute'>
          <a onClick={() => setSetting(!setting)}>
            <img src="setting.svg" className='w-100' />
          </a>
        </div>

        {!start && !gameover && !win &&
          <div className='vh-100 w-100 d-flex flex-column justify-content-center align-items-center position-relative' style={{ background: `radial-gradient(ellipse at top,  ${bgTopColor}, transparent), radial-gradient(ellipse at bottom, ${bgBottomColor}, transparent)` }}>
            <div className='bg-stars'>
              <div className='stars' style={{ animation: `translateY ${speed}s linear infinite` }}></div>
            </div>
            <img src="ufo1.svg" className='ufo-01 ufo' />
            <img src="ufo.svg" className='ufo-02 ufo' />
            <div className='title d-flex justify-content-center p-3'>
              <div className='words word1'>S</div>
              <div className='words word2'>P</div>
              <div className='words word3'>A</div>
              <div className='words word4'>C</div>
              <div className='words word5'>E</div>
              <div className='words word6'>W</div>
              <div className='words word7'>A</div>
              <div className='words word8'>R</div>
            </div>
            <div className='mt-5 start_game_btn'>
              <button className='px-4 py-2 btn text-light w-100 h-100'>Play</button>
            </div>
            <img src="earth.svg" className="earth-svg" />
            <img src="spaceship1.svg" className="space-ship" />
            {setting &&
              <div className='setting-box text-center d-flex p-4 flex-column align-items-center justify-content-between'>
                <h2 className='text-light my-2'>Setting</h2>
                <div className='setting-menu'>

                </div>
                <button className='setting-back-btn btn btn-danger py-2'>Back</button>
              </div>
            }
          </div>
        }

      </div>
    </body >
  )
}