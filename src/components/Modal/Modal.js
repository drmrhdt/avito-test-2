import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import Form from "../Form";
import Comments from "../Comments";
import { getImage, addComment } from "../../utilities/fetch";
import loading from "../../img/loading.png";
import styles from "./Modal.module.scss";

const Modal = props => {
  let history = useHistory();
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getImage(id);
      setIsLoading(false);
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
    setComments(
      comments.concat({ id: Math.floor(Math.random()), text: comment })
    );

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
          comments.length
            ? styles.modal__with_comments
            : styles.modal__without_comments
        )}
      >
        <button
          className={styles.modal__close_btn}
          data-modal={true}
          onClick={back}
        />
        <div className={styles.modal__image_comments}>
          <div className={styles.modal_image__container}>
            <img className={styles.modal__image} src={url} alt="modal item" />
          </div>
          {comments.length ? (
            <Comments className={styles.modal__comments} comments={comments} />
          ) : null}
        </div>
        <Form
          className={styles.modal__form}
          name={name}
          comment={comment}
          setCommentInput={setCommentInput}
          setNameInput={setNameInput}
          addNewComment={addNewComment}
        />
      </div>
    </div>
  );
};

export default Modal;
