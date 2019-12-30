import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getImage } from "../../utilities/fetch";
import styles from "./Modal.module.scss";

const Modal = props => {
  let history = useHistory();
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getImage(id);
      setUrl(response.url);
      setComments(response.comments);
    };

    fetchData();
  }, [id]);

  let back = e => {
    if (e.target.dataset.modal) {
      e.stopPropagation();
      history.goBack();
    }
  };

  console.log(comments);

  return (
    <div className={styles.bg} data-modal={true} onClick={back}>
      <div className={styles.modal}>
        <button
          className={styles.modal__close_btn}
          data-modal={true}
          onClick={back}
        ></button>
        <div className={styles.modal__image_form}>
          <img src={url} alt="modal item" />
          <div className={styles.modal__form}>
            <input className={styles.modal__input} placeholder="Ваше имя" />
            <input
              className={styles.modal__input}
              placeholder="Ваш комментарий"
            />
            <button className={styles.modal__button}>
              Оставить комментарий
            </button>
          </div>
        </div>
        {comments.length ? (
          <div className={styles.modal__comments}>
            {comments.map(comment => (
              <div key={comment.id} className={styles.comments}>
                <div className={styles.comments__date}></div>
                <div className={styles.comments__text}>{comment.text}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
