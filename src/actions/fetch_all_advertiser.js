import axios from "axios";

const getAllAdvertiser = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      "https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/advertiser/getAllAdvertiser",
      config
    );
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getAllAdvertiser;
