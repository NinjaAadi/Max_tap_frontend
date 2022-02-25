import axios from "axios";

const getAllCategoryFromAPI = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      "https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/category/getAllCategory",
      config
    );
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getAllCategoryFromAPI;
