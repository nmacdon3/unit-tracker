"use client";

import { useEffect } from "react";
import { useState } from "react";
import classnames from "classnames";

const WelcomeBack = () => {
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  });
  return show ? (
    <div
      className={classnames(
        "transition-all ease-in-out duration-500 text-2xl text-stone-400",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
    >
      Welcome back, Nathan!
    </div>
  ) : (
    <></>
  );
};

export default WelcomeBack;
