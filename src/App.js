import React, { useState, useEffect } from "react";
import { getImages } from "./utilities/fetch";
import styles from "./App.module.scss";

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getImages();
      setImages(response);
    }

    fetchData();
  }, []);

  return <div className={styles.App}></div>;
};

export default App;
