import { React, useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
const Advertiser = () => {
  const [whichActive, setWhichActive] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (whichActive === "1") navigate("/advertiser/viewalladvertiser");
    else if (whichActive === "2") navigate("/advertiser/createadvertiser");
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
            <Link to="/advertiser/viewalladvertiser" name="1">
              All Advertiser
            </Link>
          </li>
          <li
            onClick={(e) => onClick(e)}
            name="2"
            class={whichActive === "2" ? "is-active" : ""}
          >
            <Link to="/advertiser/createadvertiser" name="2">
              Add an Advertiser
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Advertiser;
