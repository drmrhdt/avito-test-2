import React from "react";
import PropTypes from "prop-types";
import ListItem from "../ListItem";
import styles from "./List.module.scss";

const List = props => {
  return (
    <ul className={styles.list}>
      {props.images.map(image => (
        <ListItem key={image.url} image={image} />
      ))}
    </ul>
  );
};

List.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

List.defaultProps = {
  images: []
};

export default List;
