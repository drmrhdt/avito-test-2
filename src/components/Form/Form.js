import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Form.module.scss";

function Form(props) {
  const {
    name,
    comment,
    className,
    setNameInput,
    setCommentInput,
    addNewComment
  } = props;
  return (
    <div className={classNames(styles.form, className)}>
      <input
        value={name}
        className={styles.form__input}
        placeholder="Ваше имя"
        onChange={setNameInput}
      />
      <textarea
        rows="1"
        value={comment}
        className={styles.form__textarea}
        placeholder="Ваш комментарий"
        onChange={setCommentInput}
      />
      <button className={styles.form__button} onClick={addNewComment}>
        Оставить комментарий
      </button>
    </div>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  className: PropTypes.string,
  setNameInput: PropTypes.func.isRequired,
  setCommentInput: PropTypes.func.isRequired,
  addNewComment: PropTypes.func.isRequired
};

Form.defaultProps = {
  name: "",
  comment: "",
  className: ""
};

export default Form;
