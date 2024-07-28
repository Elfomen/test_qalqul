export const userData = {
  getUsername: () => {
    return localStorage.getItem("qalqultest_editor_username");
  },
  setUsername: (username: string) => {
    localStorage.setItem("qalqultest_editor_username", username);
  },
};
