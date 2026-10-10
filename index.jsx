import { Component } from "react";
import getUsers from "./api/index";
class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
    };
  }

  loadUsers = () => {
    const { currentPage } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: 5,
      seed: "pe2022",
      inc: ["name", "gender", "email", "login", "picture"],
    })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    if (currentPage !== prevState.currentPage) {
      this.loadUsers();
    }
  }

  prevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  nextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  };

  render() {
    const { users, isFetching, error, currentPage } = this.state;

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <>
            <button onClick={this.prevPage}>{"<"}</button>
            <p>{currentPage}</p>
            <button onClick={this.nextPage}>{">"}</button>

            <div className="users-container">
              {users.map(
                ({
                  picture: { medium },
                  name: { first, last },
                  login: { username, uuid },
                  email,
                }) => (
                  <article key={uuid}>
                    <div>
                      <img src={medium} alt="fotoUser" />
                    </div>
                    <p className="userName">
                      Name: {first} {last}
                    </p>
                    <p className="userLogin">Login: {username}</p>
                    <p className="userEmail">Email: {email}</p>
                  </article>
                ),
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default UsersLoader;
