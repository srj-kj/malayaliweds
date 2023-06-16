import React from "react";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className="">
      <li className={own ? "flex justify-end" : "flex justify-start"}>
        <div
          className={
            own
              ? "relative max-w-xl px-4 py-2 bg-green-950 text-white rounded shadow"
              : "relative max-w-xl px-4 py-2 bg-stone-600 text-white rounded shadow"
          }
        >
          <span className="block">{message.text}</span>
        </div>
      </li>
      <div className={own ? "flex justify-end text-sm text-gray-500" : "flex justify-start text-sm text-gray-500"}>{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
