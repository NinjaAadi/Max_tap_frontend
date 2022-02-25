import axios from "axios";

const getResponse = async (category) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      name: category,
    };
    const res = await axios.post(
      "https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/category/addCategory",
      data,
      config
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getResponse;
