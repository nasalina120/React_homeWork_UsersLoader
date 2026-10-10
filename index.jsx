import { Component } from "react";
import getUsers from "./api/index";
import UserList from "./UserList";
import styles from "./UsersLoader.module.sass";
import { string } from "prop-types";

class UsersLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      error: null,
      currentPage: 1,
      resultsPerPage: 5,
    };
  }

  loadUsers = () => {
    const { currentPage, resultsPerPage } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: resultsPerPage,
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

  handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    console.log(value);
    if (isNaN(value) || value < 1) {
      this.setState({ resultsPerPage: 1 });
    } else {
      this.setState({ resultsPerPage: value });
    }
  };

  render() {
    const { users, isFetching, error, currentPage } = this.state;

    return (
      <>
        {error && <div>!!!ERROR!!! {JSON.stringify(error)}</div>}
        {isFetching && <div>Loading. Please waite...</div>}
        {!error && !isFetching && (
          <>
            <div className={styles.paginationContainer}>
              <button className={styles.btPage} onClick={this.prevPage}>
                {"<"}
              </button>
              <p className={styles.currentPage}>{currentPage}</p>
              <button className={styles.btPage} onClick={this.nextPage}>
                {">"}
              </button>
            </div>

            <div className={styles.searchContainer}>
              <label className={styles.searchLabel} htmlFor="resultsPerPage">
                Оберіть кількість:
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="resultsPerPage"
                  className={styles.searchInput}
                  type="number"
                  min="1"
                  name="resultsPerPage"
                  value={this.state.resultsPerPage}
                  onChange={this.handleInputChange}
                />
                <button
                  className={styles.searchButton}
                  onClick={this.loadUsers}
                >
                  Шукати
                </button>
              </div>
            </div>

            <div className={styles.usersContainer}>
              {users.map((u) => (
                <UserList key={u.login.uuid} user={u}></UserList>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default UsersLoader;
