import React from "react";
import initpads from "./pads";

const Drum = ({ darkmode }) => {
  const [pads, setPads] = React.useState(initpads);

  const handleToggle = (id) => {
    const updatedPads = pads.map((pad) =>
      pad.id === id ? { ...pad, on: !pad.on } : pad
    );
    setPads(updatedPads);
  };

  return (
    <div className={`grid grid-cols-4 gap-4 p-4 items-center ${darkmode ? "bg-black" : "bg-white"}`}>
      {pads.map((pad) => (
        <button
          key={pad.id}
          onClick={() => handleToggle(pad.id)} 
          style={{ backgroundColor: pad.color }}
          className={`aspect-square rounded-lg transition-all duration-300 ${pad.on ? "" : "opacity-20"}`}
        >
          {pad.id}
        </button>
      ))}
    </div>
  );
};

export default Drum;
