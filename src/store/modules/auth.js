import api from "../../api/orqestra";

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const actions = {
  login() {
    api.login();
  },
};

export default {
  getters,
  actions,
};
