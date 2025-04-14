import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./OpenFormButton.module.css";

library.add(faPlus);

const OpenFormButton = ({ onClick }) => {
  return (
    <button className={styles.openFormModalButton} onClick={onClick}>
      <FontAwesomeIcon icon="fa-solid fa-plus" />
    </button>
  );
};

export default OpenFormButton;
