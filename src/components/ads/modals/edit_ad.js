import { Fragment, React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAd from "../../../actions/get_ad";
import getAllCategoryFromAPI from "../../../actions/fetch_all_category";
import getAllAdvertiser from "../../../actions/fetch_all_advertiser";
import { Audio } from "react-loader-spinner";
import updateAd from "../../../actions/update_ad";
import { useParams } from "react-router-dom";
const EditAdModal = (props) => {
  const navigate = useNavigate();
  const [buttonClass, setButtonClass] = useState("button is-success");
  const [notification, setNotification] = useState();
  const [allCategory, setAllCategory] = useState(null);
  const [allAdvertiser, setAllAdvertiser] = useState(null);
  const [fetchedAd, setFetchedAd] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState({
    imageUrl: "",
    startTime: "",
    endTime: "",
    creator: "",
    category: "",
  });
  useEffect(() => {
    async function fetchData() {
      const allcategory = await getAllCategoryFromAPI();
      const alladvertiser = await getAllAdvertiser();
      const fetchedad = await getAd(id);
      setAllCategory(allcategory);
      setAllAdvertiser(alladvertiser);
      setFetchedAd(fetchedad);
    }
    fetchData();
  }, [props.ad]);
  useEffect(() => {
    if (fetchedAd != null) {
      setData({
        imageUrl: fetchedAd.imageUrl.toString(),
        startTime: fetchedAd.startTime,
        endTime: fetchedAd.endTime,
        creator: fetchedAd.creator._id,
        category: fetchedAd.category._id,
      });
    }
  }, [fetchedAd]);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const backToAdPage = () => {
    navigate("/showallads");
  };
  const onSubmit = async () => {
    setButtonClass("button is-success is-loading");
    const res = await updateAd(id, data);
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
    backToAdPage();
  };
  if (allCategory == null || allAdvertiser == null || fetchedAd == null) {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit ad</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => {
                backToAdPage();
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
            <button
              class={buttonClass}
              onClick={(e) => {
                onSubmit((e) => onSubmit(e));
              }}
            >
              Save ad
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
  } else {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit ad</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => {
                backToAdPage();
              }}
            ></button>
          </header>
          <section class="modal-card-body">
            <div class="field ml-2 py-2">
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
                  placeholder="Enter the name of the category"
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
                  placeholder="Enter the name of the category"
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
                  placeholder="Enter the name of the category"
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
              <br />
            </div>
            {notification}
          </section>
          <footer class="modal-card-foot">
            <button
              class={buttonClass}
              onClick={(e) => {
                onSubmit((e) => onSubmit(e));
              }}
            >
              Save ad
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
  }
};

export default EditAdModal;
