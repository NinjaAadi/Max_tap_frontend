import axios from "axios";

const createAdvertiser = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/advertiser/createAdvertiser`,
      data,
      config
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default createAdvertiser;
