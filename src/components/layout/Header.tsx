"use client";

import useAuth from "@/hooks/useAuth";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { classNames } from "@/utils/utils";
import { useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { user } = useAuth();
  const [isTop, setIsTop] = useState(true);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const outsideRef = useRef(null);
  const path = usePathname();

  useOutsideClick({
    ref: outsideRef,
    handler: () => setOpenUserMenu(false),
  });

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
        "fixed top-0 left-0 right-0 z-40 bg-white shadow-md transition-all duration-300 ease-in-out h-16",
        hidden ? "transform -translate-y-16" : "transform translate-y-0"
      )}
    >
      <div className="flex items-center justify-between h-full max-w-screen-lg mx-auto px-6">
        <Link href="/" className="text-xl font-bold">
          지금여기!
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex items-center"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.profileImage || "/images/default-profile.png"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <span className="ml-2 text-lg font-semibold">{user.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 330 330"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                  />
                </svg>
              </button>
              {openUserMenu && (
                <div
                  className="absolute top-9 right-0 w-48 bg-white shadow-md z-50 border rounded"
                  ref={outsideRef}
                >
                  <ul>
                    <li>
                      <Link href="/logout" className="block p-2">
                        로그아웃
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={
                process.env.NEXT_PUBLIC_API_URL + "/auth/kakao?redirect=" + path
              }
              className="text-lg font-bold"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
