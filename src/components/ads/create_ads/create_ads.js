import { React, useEffect, useState } from "react";
import getAllCategoryFromAPI from "../../../actions/fetch_all_category";
import getAllAdvertiser from "../../../actions/fetch_all_advertiser";
import createAd from "../../../actions/create_ad";
import { Audio } from "react-loader-spinner";
const CreateAd = () => {
  const [allCategory, setAllCategory] = useState(null);
  const [allAdvertiser, setAllAdvertiser] = useState(null);
  const [buttonClass, setButtonClass] = useState("button is-success mt-4");
  const [notification, setNotification] = useState();
  const [data, setData] = useState({
    imageUrl: "",
    startTime: "",
    endTime: "",
    creator: "",
    category: "",
  });
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    setButtonClass("button is-success mt-4 is-loading");
    const res = await createAd(data);
    setButtonClass("button is-success my-4");
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
  useEffect(() => {
    async function fetchData() {
      const allcategory = await getAllCategoryFromAPI();
      const alladvertiser = await getAllAdvertiser();
      setAllCategory(allcategory);
      setAllAdvertiser(alladvertiser);
    }
    fetchData();
  });
  if (allCategory == null || allAdvertiser == null) {
    return (
      <div class="container mt-6">
        <Audio height="50" width="100%" color="grey" ariaLabel="loading" />
      </div>
    );
  }
  return (
    <div class="field ml-6 py-2">
      <label class="label" style={{ color: "grey" }}>
        Image URL
      </label>
      <div class="control ">
        <input
          name="imageUrl"
          value={data.imageUrl}
          onChange={(e) => {
            onChange(e);
          }}
          class="input is-normal"
          type="text"
          placeholder="Enter the image URL.Ex. https://google.com"
          style={{ width: "90%" }}
        />
      </div>
      <label class="label mt-2" style={{ color: "grey" }}>
        Start Time
      </label>
      <div class="control ">
        <input
          name="startTime"
          value={data.startTime}
          onChange={(e) => {
            onChange(e);
          }}
          class="input is-normal"
          type="text"
          placeholder="HH:MM Ex.09:10"
          style={{ width: "90%" }}
        />
      </div>
      <label class="label mt-2" style={{ color: "grey" }}>
        End Time
      </label>
      <div class="control ">
        <input
          name="endTime"
          value={data.endTime}
          onChange={(e) => {
            onChange(e);
          }}
          class="input is-normal"
          type="text"
          placeholder="HH:MM Ex.09:10"
          style={{ width: "90%" }}
        />
      </div>
      <label class="label mt-2" style={{ color: "grey" }}>
        Category
      </label>
      <div class="select">
        <select
          name="category"
          onChange={(e) => onChange(e)}
          value={data.category}
        >
          <option>Select Category</option>
          {allCategory.map((item) => {
            return <option value={item._id}>{item.name}</option>;
          })}
        </select>
      </div>
      <div
        class="notification is-warning is-light mt-3"
        style={{ width: "40%" }}
      >
        To create an ad we need to have a category. If there are no categories
        present in the list then please add some and come back again.
      </div>
      <label class="label mt-2" style={{ color: "grey" }}>
        Advertiser
      </label>
      <div class="select">
        <select
          name="creator"
          onChange={(e) => onChange(e)}
          value={data.creator}
        >
          <option>Select Advertiser</option>
          {allAdvertiser.map((item) => {
            return <option value={item._id}>{item.name}</option>;
          })}
        </select>
      </div>
      <div
        class="notification is-warning is-light mt-3"
        style={{ width: "40%" }}
      >
        To create an ad we need to have a category. If there are no categories
        present in the list then please add some and come back again.
      </div>
      <br />
      <button
        class={buttonClass}
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        Submit
      </button>
      {notification}
    </div>
  );
};

export default CreateAd;
