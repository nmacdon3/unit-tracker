"use client";

import classnames from "classnames";
import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ value }: { value: number }) => {
  const [show, setShow] = useState<boolean>(false);

  //sets show to true after 200ms
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  });

  return (
    <div className="w-full h-10 p-2 border rounded-full border-stone-50">
      <div
        //calculate width based on value prop
        style={{ width: show ? `${(value / 14) * 100}%` : "0%" }}
        className={classnames(
          "h-full rounded-full",
          value > 14 ? "bg-red-500" : "bg-orange-200",
          "transition-width duration-1000 ease-in-out"
        )}
      ></div>
    </div>
  );
};

export default ProgressBar;
