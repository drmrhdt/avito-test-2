import React from "react";
import PropTypes from "prop-types";
import styles from "./ListItem.module.scss";

const ListItem = props => {
  return (
    <img
      className={styles.list_item}
      src={props.image.url}
      alt="gallery item"
    />
  );
};

ListItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
  })
};

ListItem.defaulProps = {
  image: null
};

export default ListItem;
