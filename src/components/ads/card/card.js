import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div
        class="card mt-5 mx-2"
        style={{ minWidth: "300px", maxWidth: "25%" }}
      >
        <div class="card-image">
          <figure class="image is-4by3">
            <img src={props.ad.imageUrl} alt="" />
          </figure>
        </div>
        <div class="card-content">
          <p>
            <b>Creator</b>: {props.ad.creator.name}
          </p>
          <p datetime="2016-1-1">
            <b>Time Stamp</b>: {props.ad.startTime} - {props.ad.endTime}
          </p>
          <p>
            <b>Category: </b>
            <p class="tag is-success is-light">{props.ad.category.name}</p>
          </p>
          <button
            class="button is-small mt-2 is-danger is-light"
            onClick={(e) => {
              navigate(`/deletead/${props.ad._id}`);
            }}
          >
            Delete
          </button>
          <button
            class="button is-small ml-2 mt-2 is-warning is-light"
            onClick={(e) => navigate(`/editad/${props.ad._id}`)}
          >
            Edit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
