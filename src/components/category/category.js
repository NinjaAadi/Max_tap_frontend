import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
const Category = () => {
  const [whichActive, setWhichActive] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (whichActive === "1") navigate("/category/viewallcategory");
    else if (whichActive === "2") navigate("/category/createcategory");
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
            <Link to="/category/viewallcategory" name="1">
              All Categories
            </Link>
          </li>
          <li
            onClick={(e) => onClick(e)}
            name="2"
            class={whichActive === "2" ? "is-active" : ""}
          >
            <Link to="/category/createcategory" name="2">
              Create a category
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Category;
