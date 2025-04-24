import React from "react";
import pads from "./pads";

const Drum = ({ darkmode }) => {
  const [activePad, setActivePad] = React.useState(null);

  const handleStick = (id, sound) => {
    const audio = new Audio(sound);
    audio.play();
    setActivePad(id);
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

      handleStick(pad.id, pad.sound);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`p-8 grid grid-cols-4 gap-6 ${
        darkmode ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {pads.map((pad) => (
        <button
          key={pad.id}
          onClick={() => handleStick(pad.id, pad.sound)}
          style={{ backgroundColor: pad.color }}
          className={`w-full flex items-center justify-center aspect-square rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transform transition-all duration-100 
          ${activePad === pad.id ? "ring-3 ring-white" : ""}`}
        >
          <img className="w-14" src={pad.image} alt="drum kits" />
        </button>
      ))}
    </div>
  );
};

export default Drum;
