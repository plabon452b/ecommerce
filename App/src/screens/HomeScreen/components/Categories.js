import { API_URL } from "../../../utils/Config";
import { useState, useEffect } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(`${API_URL}/api/category`);
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);
  return {
    categories: categories,
  };
}

export default Categories;
