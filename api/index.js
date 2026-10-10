function getUsers(options) {
  const { page, results, inc, gender } = options;

  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&inc=${inc}&gender=${gender || ""}`,
  ).then((response) => response.json());
}

export default getUsers;
