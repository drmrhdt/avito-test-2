import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Comments.module.scss";

function Comments(props) {
  const { comments, className } = props;

  return (
    <div className={classNames(className)}>
      {comments.map(comment => (
        <div key={comment.id} className={styles.comment}>
          <div>{comment.text}</div>
        </div>
      ))}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  className: PropTypes.string
};

Comments.defaultProps = {
  comments: [],
  className: ""
};

export default Comments;
