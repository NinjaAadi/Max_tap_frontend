import axios from "axios";

const deleteAdvertiser = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.delete(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/advertiser/deleteAdvertiser?advertiserId=${id}`,
      config
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default deleteAdvertiser;
