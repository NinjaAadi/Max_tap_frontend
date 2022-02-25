import { React, useEffect, useState } from "react";
import updateCategory from "../../../actions/update_category";
const CategoryModal = (props) => {
  const [category, setCategory] = useState(props.categoryObj.name);
  const [buttonClass, setButtonClass] = useState("button is-success");
  const [notification, setNotification] = useState();
  useEffect(() => {
    setCategory(props.categoryObj.name);
  }, [props.categoryObj]);
  const onChange = (e) => {
    setCategory(e.target.value);
  };
  const onSubmit = async () => {
    setButtonClass("button is-success is-loading");
    const res = await updateCategory(props.categoryObj._id, category);
    setButtonClass("button is-success");
    if (res.success == false) {
      setNotification(
        <div
          class="notification is-danger is-light mt-3	"
          style={{ width: "90%" }}
        >
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
        <div
          class="notification is-success is-light mt-3	"
          style={{ width: "90%" }}
        >
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
    <div class={props.classValue}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update the category</p>
          <button
            class="delete"
            aria-label="close"
            onClick={() => {
              props.closeFunc(null);
            }}
          ></button>
        </header>
        <section class="modal-card-body">
          <label class="label" style={{ color: "grey" }}>
            Category :
          </label>
          <input
            class="input"
            type="text"
            placeholder="Enter the category name"
            value={category}
            onChange={(e) => onChange(e)}
          ></input>
          {notification}
        </section>
        <footer class="modal-card-foot">
          <button
            class={buttonClass}
            onClick={(e) => {
              onSubmit();
            }}
          >
            Save changes
          </button>
          <button
            class="button"
            onClick={() => {
              props.closeFunc(null);
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CategoryModal;
