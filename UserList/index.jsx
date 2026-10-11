import React from "react";
import classNames from "classnames";
import styles from "./UserList.module.sass";
import PropTypes from "prop-types";

export default function UserList({ user }) {
  const {
    email,
    login: { username },
    name: { title, first, last },
    picture: { large },
    gender,
    nat,
  } = user;

  const stylesArt = classNames(styles.articleUser, {
    [styles.borderPink]: gender === "female",
    [styles.borderBlue]: gender === "male",
  });

  UserList.propTypes = {
    user: PropTypes.shape({
      login: PropTypes.shape({ username: PropTypes.string }),
      email: PropTypes.string,
      name: PropTypes.shape({
        title: PropTypes.string,
        first: PropTypes.string,
        last: PropTypes.string,
      }),
      picture: PropTypes.shape({ large: PropTypes.string }),
      gender: PropTypes.string,
      nat: PropTypes.string,
    }),
  };
  return (
    <>
      <article className={stylesArt}>
        <div className={styles.fotoUser}>
          <img src={large} alt="fotoUser" />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userName}>
            {title} {first} {last} {nat}
          </p>
          <p className={styles.userNat}>nationality: {nat}</p>

          <p className={styles.userLogin}>login: {username}</p>
          <p className={styles.userEmail}>email: {email}</p>
        </div>
      </article>
    </>
  );
}
