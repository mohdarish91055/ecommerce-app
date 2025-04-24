import { useState, useEffect } from "react";
import API from "../api/api.js";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get categroy
  const getCategories = async () => {
    try {
      const { data } = await API.get(`/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
