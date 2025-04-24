import React from "react";
import initpads from "./pads";

const Drum = ({ darkmode }) => {
  const [pads, setPads] = React.useState(initpads);
  const [activePad, setActivePad] = React.useState(null);

  const handleToggle = (id, sound) => {
    const audio = new Audio(sound);
    audio.play();
    setActivePad(id); 

    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  return (
    <div
      className={`p-8 grid grid-cols-4 gap-6 ${
        darkmode ? "bg-zinc-900" : "bg-white"
      }`}
    >
      {pads.map((pad) => (
        <button
          key={pad.id}
          onClick={() => handleToggle(pad.id, pad.sound)}
          style={{ backgroundColor: pad.color }}
          className={`w-full aspect-square rounded-2xl text-2xl font-bold shadow-lg hover:scale-105 transform transition-all duration-100 
          ${activePad === pad.id ? "ring-3 ring-white" : ""}`}
        >
          Pad {pad.id}
        </button>
      ))}
    </div>
  );
};

export default Drum;
