import axios from "axios";

const updateAdvertiser = async (id, data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/advertiser/updateAdvertiser?advertiserId=${id}`,
      data,
      config
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default updateAdvertiser;
