import axios from "axios";

const updateAd = async (id, data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/ad/updateAd?adId=${id}`,
      data,
      config
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default updateAd;
