function getUsers(options) {
  const { page, results, seed, inc } = options;

  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&seed=${seed}&inc=${inc}`
  ).then(response => response.json());
}

export default getUsers;
