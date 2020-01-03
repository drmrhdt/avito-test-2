import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";

function Form(props) {
  const { className, addNewComment } = props;

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState({ name: true, comment: true });

  const setNameInput = e => {
    setName(e.target.value);
    setError({ name: true, comment: error.comment });
  };

  const setCommentInput = e => {
    setComment(e.target.value);
    setError({ name: error.name, comment: true });
  };

  const isValid = () => {
    if (!name || !comment) {
      setError({
        name: !!name,
        comment: !!comment
      });
      return false;
    } else {
      setError({ name: true, comment: true });
      return true;
    }
  };

  const addNewCommentOnClick = () => {
    if (isValid()) {
      addNewComment(name, comment);
      setName("");
      setComment("");
    }
  };

  return (
    <div className={classNames(styles.form, className)}>
      <input
        value={name}
        className={classNames(
          styles.form__input,
          error.name ? null : styles.form__error
        )}
        placeholder="Ваше имя"
        onChange={setNameInput}
      />
      <textarea
        rows="1"
        value={comment}
        className={classNames(
          styles.form__textarea,
          error.comment ? null : styles.form__error
        )}
        placeholder="Ваш комментарий"
        onChange={setCommentInput}
      />
      <button className={styles.form__button} onClick={addNewCommentOnClick}>
        Оставить комментарий
      </button>
    </div>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  addNewComment: PropTypes.func.isRequired
};

Form.defaultProps = {
  className: ""
};

export default Form;
