import React from "react";
import styles from "./UserList.module.sass";

export default function UserList({ user }) {
  const {
    email,
    login: { username },
    name: { title, first, last },
    picture: { large },
  } = user;
  return (
    <>
      <article className={styles.articleUser}>
        <div className={styles.fotoUser}>
          <img src={large} alt="fotoUser" />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>
            {title} {first} {last}
          </p>
          <p className={styles.userLogin}>login: {username}</p>
          <p className={styles.userEmail}>email: {email}</p>
        </div>
      </article>
    </>
  );
}
