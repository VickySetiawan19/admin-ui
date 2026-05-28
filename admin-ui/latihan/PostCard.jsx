import React, { useState } from "react";

function PostCard(props) {
  const { id, userId, title, body } = props;
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-4 hover:scale-105 hover:border hover:border-gray-03 hover:bg-pink-100 transition-all">
            <div className="text-xl text-center font-semibold text-gray-800 mb-2">{title}</div>
            <p className="text-center text-gray-600 flex-1">{body}</p>
            <button
            className={`${
                clicked
                    ? "bg-special-red2 hover:brightness-125"
                    : "bg-gray-01 hover:brightness-125"
                } text-white py-2 px-4 rounded-md text-sm transition-all`}
                onClick={() => setClicked(true)}
            >
            {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
            </button>
        </div>
    </>
  );
}

export default PostCard;