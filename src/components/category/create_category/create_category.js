import { React, useState } from "react";
import getResponse from "../../../actions/create_category";

const CreateCategory = () => {
  const [category, setcategory] = useState("");
  const [isGood, setisGood] = useState(false);
  const [resObj, setresObj] = useState(null);
  const [buttonClass, setButtonClass] = useState("button is-success my-4");
  const [notification, setNotification] = useState();
  const onChange = (e) => {
    setcategory(e.target.value);
    if (e.target.value.length < 2) {
      setisGood(false);
    } else {
      setisGood(true);
    }
  };
  const onSubmit = async () => {
    setButtonClass("button is-success my-4 is-loading");
    const res = await getResponse(category);
    setButtonClass("button is-success my-4");
    setresObj(res);
    if (res.success === true) {
      setNotification(
        <div class="notification is-success is-light" style={{ width: "90%" }}>
          <button
            class="delete"
            onClick={() => {
              setNotification();
            }}
          ></button>
          {res.messege}
        </div>
      );
    } else {
      setNotification(
        <div class="notification is-danger is-light" style={{ width: "90%" }}>
          <button
            class="delete"
            onClick={() => {
              setNotification();
            }}
          ></button>
          {res.messege}
        </div>
      );
    }
    setTimeout(function () {
      setNotification();
    }, 2500);
  };
  return (
    <div class="field ml-6 py-2">
      <label class="label" style={{ color: "grey" }}>
        Category
      </label>
      <div class="control ">
        <input
          class="input is-normal"
          type="text"
          placeholder="Enter the name of the category"
          style={{ width: "90%" }}
          onChange={(e) => onChange(e)}
          value={category}
        />
      </div>

      <button class={buttonClass} onClick={(e) => onSubmit()}>
        Submit
      </button>
      {notification}
    </div>
  );
};

export default CreateCategory;
