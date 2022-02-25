import { React, useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import getAllCategoryFromAPI from "../../../actions/fetch_all_category";
import CategoryModal from "../modal/edit_modal";
import DeleteCategoryModal from "../modal/delete_modal";
const ViewAllCategory = () => {
  const [categories, setcategories] = useState(null);
  const [display, setDisplay] = useState(<p></p>);
  const [modalClass, setModalClass] = useState("modal");
  const [deleteModalClass, setDeleteModalClass] = useState("modal");
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [categoryToDelete, setCategoryToDelete] = useState({});
  function toggleModal(category) {
    if (category == null) {
      setModalClass("modal");
    } else {
      setCategoryToEdit(category);
      setModalClass("modal is-active");
    }
  }
  function toggleDeleteModal(category) {
    if (category == null) {
      setDeleteModalClass("modal");
    } else {
      setCategoryToDelete(category);
      setDeleteModalClass("modal is-active");
    }
  }
  useEffect(() => {
    async function getData() {
      setcategories(await getAllCategoryFromAPI());

      const dataDisplay = categories.map((element) => {
        return (
          <div class="container">
            <div
              class="box mt-2	"
              style={{ width: "100%", fontFamily: "monospace" }}
            >
              <b style={{ color: "#007FFF", fontFamily: "monospace" }}>Name:</b>{" "}
              {element.name}
              <button
                class="button is-small ml-6 is-danger"
                style={{ position: "absolute", right: "20px" }}
                onClick={(e) => toggleDeleteModal(element)}
              >
                Delete
              </button>
              <button
                class="button is-small ml-6 is-warning"
                style={{ position: "absolute", right: "100px" }}
                onClick={(e) => toggleModal(element)}
              >
                Edit
              </button>
            </div>
          </div>
        );
      });
      setDisplay(dataDisplay);
    }
    getData();
  }, [categories, modalClass, deleteModalClass]);
  return (
    <div>
      <div class="container">
        <div class="notification is-warning">List of categories available!</div>
      </div>
      {categories == null ? (
        <div class="container mt-6">
          <Audio height="50" width="100%" color="grey" ariaLabel="loading" />
        </div>
      ) : (
        display
      )}
      {categories != null && categories.length == 0 ? (
        <div class="container mt-5">
          <div class="notification is-primary is-light">
            <p>Oops! There are no categories present.</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <CategoryModal
        classValue={modalClass}
        closeFunc={toggleModal}
        categoryObj={categoryToEdit}
      />
      <DeleteCategoryModal
        classValue={deleteModalClass}
        closeFunc={toggleDeleteModal}
        categoryObj={categoryToDelete}
      />
    </div>
  );
};

export default ViewAllCategory;
