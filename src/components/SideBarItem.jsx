import React from "react";

function SideBarItem({ text, onClick }) {
  return (
    <button
      className="text-gray-700 font-medium text-left w-full pt-1 pb-1 pl-8 rounded-full shadow-sm my-1"
      onClick={onClick}
      style={{ fontSize: 14 }}
    >
      {text}
    </button>
  );
}

export default SideBarItem;
