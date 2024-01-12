import React from "react";
import styles from "./Section.module.css";
function Section({ children, className = "" }) {
  const sectionClasses = `${styles.sectionContainer} ${className}`;
  return <section className={sectionClasses}>{children}</section>;
}

export default Section;
