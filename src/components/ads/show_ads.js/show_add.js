import { React, useState, useEffect, Fragment } from "react";
import Card from "../card/card";
import classes from "./show_ad.module.css";
import getAllAds from "../../../actions/get_all_ad";
import { Audio } from "react-loader-spinner";

const ShowAllAds = () => {
  const [allAds, setAllAds] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await getAllAds();
      setAllAds(res);
    }
    fetchData();
  }, []);

  if (allAds == null) {
    return (
      <div class="container mt-6">
        <Audio height="50" width="100%" color="grey" ariaLabel="loading" />
      </div>
    );
  } else if (allAds.length === 0) {
    return (
      <div class="container">
        <div class="notification is-primary is-light">
          <p>Oops! There are no ads present.</p>
        </div>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div
          className={`${classes.grid} is-flex is-flex-wrap-wrap`}
          style={{
            width: "100%",
            justifyContent: "center",
          }}
        >
          {allAds.map((item) => {
            return <Card ad={item} />;
          })}
        </div>
      </Fragment>
    );
  }
};

export default ShowAllAds;
