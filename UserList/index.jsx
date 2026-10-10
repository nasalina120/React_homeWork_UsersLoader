import React from "react";

export default function UserList({ user }) {
  const {
    email,
    login: { username },
    name: { title, first, last },
    picture: { medium },
  } = user;
  return (
    <>
      <article>
        <div>
          <img src={medium} alt="fotoUser" />
        </div>
        <p className="userName">
          Name: {title}
          {first}
          {last}
        </p>
        <p className="userLogin">Login: {username}</p>
        <p className="userEmail">Email: {email}</p>
      </article>
    </>
  );
}
