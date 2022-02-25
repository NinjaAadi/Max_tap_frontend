import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import createAdvertiser from "../../../actions/create_advertiser";
import { Audio } from "react-loader-spinner";
import getAllCategoryFromAPI from "../../../actions/fetch_all_category";
const CreateAdvertiser = () => {
  const [category, setCategory] = useState(null);
  const [notification, setNotification] = useState();
  const [buttonClass, setButtonClass] = useState("button is-success my-4");
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    const submitObj = {
      name: data.name,
      category: data.category,
      startDate: startDate,
      endDate: endDate,
    };
    setButtonClass("button is-success my-4 is-loading");
    const res = await createAdvertiser(submitObj);
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
      const allCategories = await getAllCategoryFromAPI();
      setCategory(allCategories);
    }
    fetchData();
  }, []);
  if (category === null) {
    return (
      <div class="container mt-6">
        <Audio height="50" width="100%" color="grey" ariaLabel="loading" />
      </div>
    );
  } else {
    return (
      <div class="field ml-6 py-2">
        <label class="label" style={{ color: "grey" }}>
          Name
        </label>
        <div class="control ">
          <input
            name="name"
            class="input is-normal"
            onChange={(e) => onChange(e)}
            type="text"
            placeholder="Enter the name of the advertiser"
            style={{ width: "90%" }}
            value={data.name}
          />
          <label class="label mt-3	" style={{ color: "grey" }}>
            Select a start day
          </label>
          <style>
            {`.date-picker input {
              padding:10px;
              border:1px solid #D0D0D0;
              color:grey	
            }`}
          </style>
          <DatePicker
            wrapperClassName="date-picker"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <label class="label mt-3	" style={{ color: "grey" }}>
            Select a end day
          </label>
          <DatePicker
            wrapperClassName="date-picker"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
          <div class="select mt-5">
            <select
              name="category"
              onChange={(e) => onChange(e)}
              value={data.category}
            >
              <option value="">Select Category</option>
              {category.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>
          <div
            class="notification is-warning is-light mt-3"
            style={{ width: "40%" }}
          >
            To create an advertiser we need to have a category. If there are no
            categories present in the list then please add some and come back
            again.
          </div>
        </div>
        <button class={buttonClass} onClick={(e) => onSubmit(e)}>
          Submit
        </button>
        {notification}
      </div>
    );
  }
};

export default CreateAdvertiser;
