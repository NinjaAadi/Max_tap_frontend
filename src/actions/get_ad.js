import axios from "axios";

const getAd = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/ad/getad?adId=${id}`,
      config
    );

    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getAd;
