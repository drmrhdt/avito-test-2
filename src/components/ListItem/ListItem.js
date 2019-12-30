import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ListItem.module.scss";

const ListItem = props => {
  const { id, url } = props.image;

  return (
    <Link to={`/image/${id}`} className={styles.list_item}>
      <img className={styles.list_item__image} src={url} alt="gallery item" />
    </Link>
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
