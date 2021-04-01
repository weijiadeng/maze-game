import React from "react";
import IconDescription from "./IconDescription";
import OperationDescription from "./OperationDescription";
import styles from "./helperPage.module.css";

const HelperPage = () => {
  return (
    <div className={styles.helperPage}>
      <OperationDescription />
      <IconDescription />
    </div>
  );
};

export default HelperPage;
