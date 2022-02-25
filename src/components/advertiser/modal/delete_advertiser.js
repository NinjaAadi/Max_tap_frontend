import { React, useEffect, useState } from "react";
import deleteAdvertiser from "../../../actions/delete_advertiser";
const DeleteAdvertiserModal = (props) => {
  const [buttonClass, setButtonClass] = useState("button is-danger");
  const [notification, setNotification] = useState();
  const onSubmit = async () => {
    setButtonClass("button is-danger is-loading");
    const res = await deleteAdvertiser(props.advertiser._id);
    setButtonClass("button is-danger");
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
    props.closeFunc(null);
  };
  return (
    <div class={props.classValue}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete the advertiser</p>
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
            Are you sure you want to delete the advertiser{" "}
            <b>
              Deleting it would delete all the ads associated with the
              advertiser!
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

export default DeleteAdvertiserModal;
