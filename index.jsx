import { Component } from "react";
import getUsers from "./api/index";
import UserList from "./UserList";
import styles from "./UsersLoader.module.sass";
import GenderBtn from "./GenderBtn";
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
      currentGender: "",
    };
  }

  loadUsers = () => {
    const { currentPage, resultsPerPage, currentGender } = this.state;

    this.setState({ isFetching: true });
    getUsers({
      page: currentPage,
      results: resultsPerPage,

      inc: ["name", "gender", "email", "login", "picture", "nat"],
      gender: currentGender,
    })
      .then((data) => this.setState({ users: data.results }))
      .catch((e) => this.setState({ error: e }))
      .finally(() => this.setState({ isFetching: false }));
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, currentGender } = this.state;

    if (
      currentPage !== prevState.currentPage ||
      currentGender !== prevState.currentGender
    ) {
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

  handleGenderChange = (e) => {
    this.setState({ currentGender: e.target.value, currentPage: 1 });
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
            <GenderBtn handleGenderChange={this.handleGenderChange}></GenderBtn>

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
