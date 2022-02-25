import { React, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Audio } from "react-loader-spinner";
import "react-datepicker/dist/react-datepicker.css";
import getAllCategoryFromAPI from "../../../actions/fetch_all_category";
import updateAdvertiser from "../../../actions/update_advertiser";
const EditAdvertiser = (props) => {
  const [buttonClass, setButtonClass] = useState("button is-success ml-1");
  const [category, setCategory] = useState(null);
  const [notification, setNotification] = useState();
  const [data, setData] = useState({
    name: props.advertiser.name,
    category: props.advertiser.category,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (
      props.advertiser != null &&
      props.advertiser !== undefined &&
      Object.keys(props.advertiser).length !== 0
    ) {
      setData({
        ...data,
        name: props.advertiser.name,
        category: props.advertiser.category._id,
      });

      setStartDate(Date.parse(props.advertiser.startDate));
      setEndDate(Date.parse(props.advertiser.endDate));
    }

    async function fetchData() {
      const allCategories = await getAllCategoryFromAPI();
      setCategory(allCategories);
    }
    fetchData();
  }, [props.advertiser]);
  const onSubmit = async () => {
    setButtonClass("button is-success is-loading");
    const res = await updateAdvertiser(props.advertiser._id, {
      name: data.name,
      category: data.category,
      startDate: startDate,
      endDate: endDate,
    });
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
  if (category == null || category === undefined || props.advertiser == null) {
    return (
      <div class={props.classValue}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit the advertiser</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => {
                props.closeFunc(null);
              }}
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="container mt-6">
              <Audio
                height="50"
                width="100%"
                color="grey"
                ariaLabel="loading"
              />
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class={buttonClass} onClick={(e) => onSubmit(e)}>
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
  } else {
    return (
      <div class={props.classValue}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit the advertiser</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => {
                props.closeFunc(null);
              }}
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="field ml-1 py-2">
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
              </div>
              {notification}
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class={buttonClass} onClick={(e) => onSubmit(e)}>
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
  }
};

export default EditAdvertiser;
