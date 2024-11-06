"use client"

import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY  > 300) { 
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button onClick={backToTop} className="fixed bottom-14 right-4 py-2 px-4 font-bold rounded-full opacity-90 transition-colors duration-300 text-white bg-sky-700 hover:bg-sky-500 z-10" >
          トップへ戻る
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
