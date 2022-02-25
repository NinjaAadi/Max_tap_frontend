import { React, useState, useEffect } from "react";
import getAllAdvertiser from "../../../actions/fetch_all_advertiser";
import { Audio } from "react-loader-spinner";
import EditAdvertiser from "../modal/edit_advertiser";
import DeleteAdvertiserModal from "../modal/delete_advertiser";
const ViewAllAdvertiser = () => {
  const [allAdvertiser, setAllAdvertiser] = useState(null);
  const [modalClass, setModalClass] = useState("modal");
  const [deleteModalClass, setDeleteModalClass] = useState("modal");
  const [advertiserToEdit, setAdvertiserToEdit] = useState({});
  const [advertiserToDelete, setAdvertiserToDelete] = useState({});
  useEffect(() => {
    async function fetchItem() {
      const res = await getAllAdvertiser();
      setAllAdvertiser(res);
    }
    fetchItem();
  }, [modalClass, deleteModalClass]);

  function toggleModal(advertiser) {
    if (advertiser == null) {
      setModalClass("modal");
    } else {
      setAdvertiserToEdit(advertiser);
      setModalClass("modal is-active");
    }
  }
  function toggleDeleteModal(advertiser) {
    if (advertiser == null) {
      setDeleteModalClass("modal");
    } else {
      setAdvertiserToDelete(advertiser);
      setDeleteModalClass("modal is-active");
    }
  }
  if (allAdvertiser === null || allAdvertiser === undefined) {
    return (
      <div class="container mt-6">
        <Audio height="50" width="100%" color="grey" ariaLabel="loading" />
      </div>
    );
  } else {
    return (
      <div>
        {allAdvertiser != null && allAdvertiser.length == 0 ? (
          <div class="container">
            <div class="notification is-primary is-light">
              <p>Oops! There are no advertiser present</p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {allAdvertiser.map((item) => {
          return (
            <div class="container ">
              <div
                class="box mt-2"
                style={{
                  width: "100%",
                  color: "grey",
                  fontFamily: "monospace",
                }}
              >
                <b style={{ color: "#007FFF" }}>Name:</b> {item.name}
                <br />
                <b style={{ color: "#007FFF" }}>Start Date:</b>{" "}
                {`${new Date(item.startDate).getDate()}/${
                  new Date(item.startDate).getMonth() + 1
                }/${new Date(item.startDate).getFullYear()}`}
                <br />
                <b style={{ color: "#007FFF" }}>End Date:</b>{" "}
                {`${new Date(item.endDate).getDate()}/${
                  new Date(item.endDate).getMonth() + 1
                }/${new Date(item.endDate).getFullYear()}`}
                <br />
                <b style={{ color: "#007FFF" }}>Category:</b>{" "}
                {item.category.name}
                <button
                  class="button is-small ml-6 is-danger"
                  style={{ position: "absolute", right: "20px", top: "20px" }}
                  onClick={(e) => toggleDeleteModal(item)}
                >
                  Delete
                </button>
                <button
                  class="button is-small ml-6 is-warning"
                  style={{ position: "absolute", right: "100px", top: "20px" }}
                  onClick={(e) => toggleModal(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
        <EditAdvertiser
          closeFunc={toggleModal}
          classValue={modalClass}
          advertiser={advertiserToEdit}
        />
        <DeleteAdvertiserModal
          classValue={deleteModalClass}
          closeFunc={toggleDeleteModal}
          advertiser={advertiserToDelete}
        />
      </div>
    );
  }
};

export default ViewAllAdvertiser;
