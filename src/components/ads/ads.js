import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Ads = () => {
  const [whichActive, setWhichActive] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (whichActive === "1") navigate("/showallads");
    else if (whichActive === "2") navigate("/createad");
  }, []);
  //function for onClick
  const onClick = (e) => {
    setWhichActive(e.target.name);
  };

  return (
    <div>
      <div class="tabs is-centered mt-3	">
        <ul>
          <li
            onClick={(e) => onClick(e)}
            class={whichActive === "1" ? "is-active" : ""}
          >
            <Link to="/showallads" name="1">
              All Ads
            </Link>
          </li>
          <li
            onClick={(e) => onClick(e)}
            name="2"
            class={whichActive === "2" ? "is-active" : ""}
          >
            <Link to="/createad" name="2">
              Create an Ad
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Ads;
