"use client";

import { classNames } from "@/utils/utils";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isTop, setIsTop] = useState(true);

  function update() {
    if (scrollY?.get() < 100) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }

    if (scrollY?.get() < (scrollY?.getPrevious() || 0)) {
      setHidden(false);
    } else if (
      scrollY?.get() > 100 &&
      scrollY?.get() > (scrollY?.getPrevious() || 0)
    ) {
      setHidden(true);
    }
  }

  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  return (
    <header
      className={classNames(
        "fixed top-0 left-0 right-0 z-10 bg-white shadow-md transition-all duration-300 ease-in-out h-16",
        hidden ? "transform -translate-y-16" : "transform translate-y-0",
        isTop ? "shadow-none" : "bg-white shadow-md"
      )}
    >
      <div className="flex items-center justify-between h-full max-w-screen-lg mx-auto px-6">
        <span className="text-xl font-bold">지금여기!</span>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-sm text-gray-600">
            About
          </a>
          <a
            href="/auth"
            className="text-sm bg-black text-white px-4 py-1 rounded-2xl"
          >
            로그인
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
