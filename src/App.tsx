import { auto, right } from '@popperjs/core';
import * as React from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { sounds } from './data';

import './style.css';

export default function App() {
  const [volume, setVolume] = useState(0.77);
  const [muted, setMuted] = useState(false);
  const refs = useRef<HTMLInputElement>(null);

  const [sound, setSound] = useState(sounds[0]);

  const [currSound, setCurrSound] = useState('Sound Machine');

  const [activeKey, setActiveKey] = useState('');

  function playAudio(id: string) {
    console.log(volume, 'play');
    const target = document.getElementById(id) as HTMLMediaElement;
    target.volume = volume;

    //console.log(sound.arr.findIndex((x) => x.key == id));

    const index = sound.arr.findIndex((x) => x.key == id);
    //console.log(sound.arr[index].name);

    setCurrSound(sound.arr[index].name);
    setActiveKey(id);

    setTimeout(() => {
      setActiveKey('');
    }, 200);
    if (target !== null) {
      target.load();
      target.play();
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    //  console.log(event.key.toUpperCase());

    const key = event.key.toUpperCase();
    const keyExists = sound.arr.some((x) => x.key === key);

    if (keyExists) {
      playAudio(key);
    }
  };

  const changeVolume = (volume: number) => {
    setVolume(volume);
  };

  const changeSound = useCallback(() => {
    setSound(sound === sounds[0] ? sounds[1] : sounds[0]);
  }, [sound]);

  useEffect(() => {
    setVolume(volume);
    document.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [volume]);

  return (
    <div id="drum-machine">
     
        <div className="row drum-pad">
          <div className="col">
            <div className="row">
              {sound.arr.map((sound, index) => {
                console.log(activeKey);
                return (
                  <div
                    key={index}
                    className={`col col-4 ${
                      activeKey === sound.key ? 'activeKey' : ''
                    }`}
                    //onClick={() => setActiveKey(index.toString())}
                    // onMouseUp={()=>setActiveKey("")}
                    onClick={() => playAudio(sound.key)}
                  >
                    {sound.key}

                    <audio id={sound.key}>
                      <source src={sound.src}></source>
                    </audio>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col soundControl">
            <div className="slidecontainer">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  console.log(e.target.valueAsNumber);
                  changeVolume(e.target.valueAsNumber);
                }}
                className="slider"
                id="myRange"
              />
              <p id="volume">
                Volume :: <span>{Math.floor(volume * 10)}</span>
              </p>
            </div>

            <div id="display">{currSound}</div>

            <div id="soundSwitch">
              {sound.name}
              <div id="switchControl" onClick={changeSound}>
                <div
                  id="innerSwitch"
                  style={{ float: sound === sounds[0] ? 'left' : 'right' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
}

/**
 * 
 * User Story #1: I should be able to see an outer container with a corresponding id="drum-machine" that contains all other elements.

User Story #2: Within #drum-machine I can see an element with a corresponding id="display".

User Story #3: Within #drum-machine I can see 9 clickable drum pad elements, each with a class name of drum-pad, a unique id that describes the audio clip the drum pad will be set up to trigger, and an inner text that corresponds to one of the following keys on the keyboard: Q, W, E, A, S, D, Z, X, C. The drum pads MUST be in this order.

User Story #4: Within each .drum-pad, there should be an HTML5 audio element which has a src attribute pointing to an audio clip, a class name of clip, and an id corresponding to the inner text of its parent .drum-pad (e.g. id="Q", id="W", id="E" etc.).

User Story #5: When I click on a .drum-pad element, the audio clip contained in its child audio element should be triggered.

User Story #6: When I press the trigger key associated with each .drum-pad, the audio clip contained in its child audio element should be triggered (e.g. pressing the Q key should trigger the drum pad which contains the string Q, pressing the W key should trigger the drum pad which contains the string W, etc.).

User Story #7: When a .drum-pad is triggered, a string describing the associated audio clip is displayed as the inner text of the #display element (each string must be unique).

Here are some audio samples you can use for your drum machine:

Heater 1
Heater 2
Heater 3
Heater 4
Clap
Open-HH
Kick-n'-Hat
Kick
Closed-HH
You can build your project by using this CodePen template and clicking Save to create your own pen. Or you can use this CDN link to run the tests in any environment you like: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js
 */
