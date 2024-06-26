// src/components/Banner.js
import React, { useState } from "react";
import { version } from "../version";
import "./Banner.css"; // Import CSS for styling
import styles from "../Banner/Banner.module.css";

const Banner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <span className="banner-text">Current Version: {version}</span>
      <button className="banner-close" onClick={() => setVisible(false)}>
        X
      </button>
    </div>
  );
};

export default Banner;
