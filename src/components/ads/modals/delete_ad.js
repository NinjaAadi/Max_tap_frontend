import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import deleteAd from "../../../actions/delete_ad";
const DeledeAdModal = (props) => {
  const [buttonClass, setButtonClass] = useState("button is-danger");
  const [notification, setNotification] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const backToAdPage = () => {
    navigate("/showallads");
  };
  const onSubmit = async () => {
    setButtonClass("button is-danger is-loading");
    const res = await deleteAd(id);
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
    backToAdPage();
  };
  return (
    <div class={props.classValue}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete ad</p>
          <button
            class="delete"
            aria-label="close"
            onClick={() => {
              backToAdPage();
            }}
          ></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to delete the ad? </p>
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
              backToAdPage();
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DeledeAdModal;
