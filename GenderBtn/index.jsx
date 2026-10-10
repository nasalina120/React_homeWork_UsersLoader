import React from "react";
import styles from "./GenderBtn.module.sass";

export default function GenderBtn({ handleGenderChange }) {
  return (
    <div className={styles.genderContainer}>
      <button
        value={""}
        className={styles.genderOption}
        onClick={handleGenderChange}
      >
        Усі
      </button>
      <button
        value={"female"}
        className={styles.genderOption}
        onClick={handleGenderChange}
      >
        Жінки
      </button>
      <button
        value={"male"}
        className={styles.genderOption}
        onClick={handleGenderChange}
      >
        Чоловіки
      </button>
    </div>
  );
}
