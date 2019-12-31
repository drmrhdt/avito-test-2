import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import { getImage, addComment } from "../../utilities/fetch";
import styles from "./Modal.module.scss";

const Modal = props => {
  let history = useHistory();
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getImage(id);
      setUrl(response.url);
      setComments(response.comments);
    };

    fetchData();
  }, [id]);

  const back = e => {
    if (e.target.dataset.modal) {
      e.stopPropagation();
      history.goBack();
    }
  };

  const addNewComment = async () => {
    await addComment(id, { name: name, comment: comment });

    setName("");
    setComment("");
  };

  const setNameInput = e => {
    setName(e.target.value);
  };

  const setCommentInput = e => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.bg} data-modal={true} onClick={back}>
      <div
        className={classNames(
          styles.modal,
          comments.length ? styles.modal__width_70 : styles.modal__width_50
        )}
      >
        <button
          className={styles.modal__close_btn}
          data-modal={true}
          onClick={back}
        ></button>
        <div className={comments.length ? null : styles.modal__image_form}>
          <img className={styles.modal__image} src={url} alt="modal item" />
          <div className={styles.modal__form}>
            <input
              value={name}
              className={styles.modal__input}
              placeholder="Ваше имя"
              onChange={setNameInput}
            />
            <input
              value={comment}
              className={styles.modal__input}
              placeholder="Ваш комментарий"
              onChange={setCommentInput}
            />
            <button className={styles.modal__button} onClick={addNewComment}>
              Оставить комментарий
            </button>
          </div>
        </div>
        {comments.length ? (
          <>
            <div className={styles.modal__comments}>
              {comments.map(comment => (
                <div key={comment.id} className={styles.comments}>
                  <div className={styles.comments__date}></div>
                  <div className={styles.comments__text}>{comment.text}</div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
