import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(toggleClass = ".toogleMenu") {
  const [show, setShow] = useState(false);
  const showRef = useRef(null);
  useEffect(() => {
    const handleDropDown = function (e) {
      // console.log(
      //   showRef.current.contains(e.target),
      //   e.target.matches(toggleClass)
      // );
      if (
        showRef.current &&
        !showRef.current.contains(e.target) &&
        !e.target.matches(toggleClass)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleDropDown);
    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);
  return {
    show,
    setShow,
    showRef,
  };
}
