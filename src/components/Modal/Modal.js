import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";
import Form from "../Form";
import Comments from "../Comments";
import { getImage, addComment } from "../../utilities/fetch";
import styles from "./Modal.module.scss";

const Modal = props => {
  let history = useHistory();
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(true);

  const image = props.images.filter(
    image => parseInt(id) === parseInt(image.id)
  );
  let urlTempImage;
  if (image && image[0]) {
    urlTempImage = image[0].url;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getImage(id);
      setIsLoading(false);
      setUrl(response.url);
      setComments(response.comments);
    };

    fetchData();

    return () => {
      setModalStatus(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalStatus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalStatus]);

  const back = e => {
    if (e.target.dataset.modal) {
      e.stopPropagation();
      history.goBack();
      setModalStatus(false);
    }
  };

  const addNewComment = async (name, comment) => {
    await addComment(id, { name: name, comment: comment });
    // new comments are seen
    setComments(
      comments.concat({
        id: Math.floor(Math.random() * 10000),
        text: comment
      })
    );
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
        <div
          className={
            comments.length
              ? styles.modal__image_form_container_with_comments
              : styles.modal__image_form_container_without_comments
          }
        >
          <button
            className={styles.modal__close_btn}
            data-modal={true}
            onClick={back}
          />
          <div>
            <div
              className={classNames(
                isLoading ? styles.modal__image_blur : null
              )}
              style={{
                backgroundImage: `url(${
                  isLoading && urlTempImage ? urlTempImage : url
                })`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                paddingBottom: "70%"
              }}
            ></div>
            {comments.length ? (
              <Comments
                className={classNames(
                  styles.modal__comments,
                  styles.modal__comments_column
                )}
                comments={comments}
              />
            ) : null}
          </div>
          <Form className={styles.modal__form} addNewComment={addNewComment} />
        </div>
        {comments.length ? (
          <Comments
            className={classNames(
              styles.modal__comments,
              styles.modal__comments_row
            )}
            comments={comments}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
