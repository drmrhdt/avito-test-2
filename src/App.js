import React, { useState, useEffect } from "react";
import { getImages } from "./utilities/fetch";
import List from "./components/List";
import Header from "./components/Header";
import styles from "./App.module.scss";

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getImages();
      setImages(response);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <List images={images} />
    </div>
  );
};

export default App;
