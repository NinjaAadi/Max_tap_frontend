import { React, useEffect, useState } from "react";
import deleteCategory from "../../../actions/delete_category";
const DeleteCategoryModal = (props) => {
  const [buttonClass, setButtonClass] = useState("button is-danger");
  const [notification, setNotification] = useState();
  const onSubmit = async () => {
    setButtonClass("button is-danger is-loading");
    const res = await deleteCategory(props.categoryObj._id);
    setButtonClass("button is-danger");
    if (res.success == false) {
      setNotification();
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
    }, 1500);
    props.closeFunc(null);
  };
  return (
    <div class={props.classValue}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete the category</p>
          <button
            class="delete"
            aria-label="close"
            onClick={() => {
              props.closeFunc(null);
            }}
          ></button>
        </header>
        <section class="modal-card-body">
          <p>
            Are you sure you want to delete the category?{" "}
            <b>
              Deleting it would delete all the ads and advertiser associated
              with it!
            </b>
          </p>
          {notification}
        </section>
        <footer class="modal-card-foot">
          <button
            class={buttonClass}
            onClick={(e) => {
              onSubmit();
            }}
          >
            Delete category
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

export default DeleteCategoryModal;
