import React from "react";
import pads from "./pads";

const Drum = ({ darkmode }) => {
  const [activePad, setActivePad] = React.useState(null);
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState([]);

  const handleStick = (id, sound) => {
    const audio = new Audio(sound);
    audio.volume = volume;
    audio.play();
    setActivePad(id);
    setRecording(prev => [...prev, { id, sound }]);
    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  React.useEffect(() => {
    const keyMap = {
      q: 1,
      w: 2,
      e: 3,
      r: 4,
      a: 5,
      s: 6,
      d: 7,
      f: 8,
    };
    const handleKeyDown = (e) => {
      const key = e.key;
      const id = keyMap[key];
      const pad = pads.find((pad) => pad.id === id);
      

      if (pad) handleStick(pad.id, pad.sound);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const playRecording = () => {
    recording.forEach((clip, index) => {
      setTimeout(() => {
        const audio = new Audio(clip.sound);
        audio.play();
        setActivePad(clip.id);
        setTimeout(() => setActivePad(null), 150);
      }, index * 300); 
    });
  };

  return (
    <div className="p-4 bg-zinc-900">
      <section
        className={`p-8 grid grid-cols-4 gap-6 ${
          darkmode ? "bg-zinc-900" : "bg-white"
        }`}
      >
        {pads.map((pad) => (
          <button
            key={pad.id}
            onClick={() => handleStick(pad.id, pad.sound)}
            style={{ backgroundColor: pad.color }}
            className={`w-full flex flex-col items-center justify-center aspect-square rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transform transition-all duration-100 
          ${activePad === pad.id ? "ring-3 ring-white" : ""}`}
          >
            <img className="w-14" src={pad.image} alt="drum kits" />
            <div className="text-xs mt-1 opacity-70">{pad.key}</div>
          </button>
        ))}
      </section>
      <section className="flex gap-2 pl-10 items-center">
        <h3 className="text-white">V = {Math.round(volume * 10)}</h3>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="mt-4 "
        />
      </section>
      <section>
        <button
          onClick={playRecording}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Play Recording
        </button>
      </section>
    </div>
  );
};

export default Drum;
