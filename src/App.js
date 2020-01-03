import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { getImages } from "./utilities/fetch";
import List from "./components/List";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import styles from "./App.module.scss";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getImages();
      setIsLoading(false);
      setImages(response);
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Header />
        <Route
          path="/"
          render={() =>
            isLoading ? (
              <p className={styles.app__loading}>...Загрузка</p>
            ) : (
              <List images={images} />
            )
          }
        />
        <Route path="/image/:id" render={() => <Modal images={images} />} />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
