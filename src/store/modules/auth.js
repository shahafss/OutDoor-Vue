import axios from "../../axios-auth";
import globalAxios from "axios";
import router from "../../router";

const state = {
  idToken: null,
  userId: null,
  user: null,
  allUsers: null,
};

const mutations = {
  AUTH_USER(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  STORE_USER(state, user) {
    state.user = user;
  },
  STORE_ALL_USERS(state, users) {
    state.allUsers = users;
  },
  CLEAR_AUTH(state) {
    state.idToken = null;
    state.userId = null;
    state.user = null;
  },
};

const actions = {
  setLogoutTimer: ({ dispatch }, expirationTime) => {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },
  signup: ({ commit, dispatch }, authData) => {
    axios
      .post(`accounts:signUp?key=${process.env.VUE_APP_FIREBASE}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId,
        });

        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("username", res.data.email);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch("storeUser", authData);
        dispatch("setLogoutTimer", res.data.expiresIn);
        router.push("/rooms");
      })
      .catch((err) => console.log(err));
  },
  login: ({ commit, dispatch }, authData) => {
    axios
      .post(`accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then((res) => {
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("username", res.data.email);
        localStorage.setItem("expirationDate", expirationDate);

        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId,
        });

        dispatch("setLogoutTimer", res.data.expiresIn);
        router.push("/rooms");
      })
      .catch((err) => console.log(err));
  },
  tryAutoLogin({ commit, dispatch }) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const expirationDateString = localStorage.getItem("expirationDate");
    const expirationDate = new Date(expirationDateString);
    const nowDate = new Date();
    if (nowDate >= expirationDate) {
      dispatch("logout");
      return;
    }

    const userId = localStorage.getItem("userId");
    commit("AUTH_USER", {
      token: token,
      userId: userId,
    });
  },
  logout({ commit }) {
    console.log("logged out");
    commit("CLEAR_AUTH");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    router.push("/login");
  },
  storeUser({ commit, state }, userData) {
    if (!state.idToken) return;

    globalAxios
      .post(
        "https://outdoor-vue.firebaseio.com/users.json?auth=" + state.idToken,
        userData
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  },
  fetchUsers({ commit, state }) {
    if (!state.idToken) return;
    globalAxios
      .get(
        "https://outdoor-vue.firebaseio.com/users.json?auth=" + state.idToken
      )
      .then((res) => {
        const data = res.data;
        const users = [];

        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        commit("STORE_ALL_USERS", data);

        const loggedInUsername = localStorage.getItem("username");
        commit(
          "STORE_USER",
          users.find((user) => user.email == loggedInUsername)
        );
      })
      .catch((error) => console.log(error));
  },
};
const getters = {
  getUser(state) {
    return state.user;
  },
  getUserById: (state) => (id) => {
    return state.allUsers[id];
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },
};

export default { state, mutations, actions, getters };
