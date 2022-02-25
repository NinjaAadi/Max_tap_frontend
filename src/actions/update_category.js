import axios from "axios";

const updateCategory = async (id, name) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      name: name,
    };
    const res = await axios.put(
      `https://ad-api-maxtap.herokuapp.com/ad_dashboard/api/category/updateCategory?categoryId=${id}`,
      data,
      config
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export default updateCategory;
