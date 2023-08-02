import * as React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { sounds1 } from './data';

import './style.css';

export default function App() {
  const [volume, setVolume] = useState(0);
  const [muted, setMuted] = useState(false);
  const refs = useRef<HTMLInputElement>(null);

  function playAudio(id: string) {
    const target = document.getElementById(id) as HTMLMediaElement;

    if (target !== null) {
      target.play();
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.key.toUpperCase());

    const key = event.key.toUpperCase();
    const keyExists = sounds1.some((x) => x.key === key);

    if (keyExists) {
      playAudio(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">
        <div className="row drum-pad">
          <div className="col">
            <div className="row">
              {sounds1.map((sound, index) => {
                return (
                  <div
                    key={index}
                    className="col col-4"
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

          <div className="col">
            <div className="slidecontainer">
              <input
                type="range"
                min={0}
                max={10}
                step={2}
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.valueAsNumber);
                }}
                className="slider"
                id="myRange"
              />
              <p>
                Value: <span id="demo">{volume}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
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
