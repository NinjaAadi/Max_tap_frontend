import axios from "axios";

const createAd = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/ad/createAd`,
      data,
      config
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default createAd;
