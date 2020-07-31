import axios from "../../axios-auth";
import globalAxios from "axios";

import router from "../../router";

const state = {
  idToken: null,
  userId: null,
  user: null
};

const mutations = {
  AUTH_USER(state, userData) {
    state.idToken = userData.token;
    state.userId = userData.userId;
  },
  STORE_USER(state, user) {
    state.user = user;
  },
  CLEAR_AUTH(state) {
    state.idToken = null;
    state.userId = null;
    state.user = null;
  }
};

const actions = {
  setLogoutTimer: ({ dispatch }, expirationTime) => {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },
  signup: ({ commit, dispatch }, authData) => {
    axios
      .post("accounts:signUp?key=AIzaSyCdTx55AnwVv8tw_jqoWEDyiVMX7pahn4Y", {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        console.log(res);
        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId
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
      })
      .catch(err => console.log(err));
  },
  login: ({ commit, dispatch }, authData) => {
    axios
      .post(
        "accounts:signInWithPassword?key=AIzaSyCdTx55AnwVv8tw_jqoWEDyiVMX7pahn4Y",
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      )
      .then(res => {
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
          userId: res.data.localId
        });

        dispatch("setLogoutTimer", res.data.expiresIn);
        router.push("/rooms");
      })
      .catch(err => console.log(err));
  },
  tryAutoLogin({ commit }) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const expirationDate = localStorage.getItem("expirationDate");
    const now = new Date();
    if (now >= expirationDate) return;

    const userId = localStorage.getItem("userId");
    commit("AUTH_USER", {
      token: token,
      userId: userId
    });
  },
  logout({ commit }) {
    commit("CLEAR_AUTH");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.replace("/");
  },
  storeUser({ commit, state }, userData) {
    if (!state.idToken) return;
    console.log("userData", userData);

    globalAxios
      .post(
        "https://outdoor-vue.firebaseio.com/users.json?auth=" + state.idToken,
        userData
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  fetchUser({ commit, state }) {
    if (!state.idToken) return;
    globalAxios
      .get(
        "https://outdoor-vue.firebaseio.com/users.json?auth=" + state.idToken
      )
      .then(res => {
        const data = res.data;
        const users = [];

        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }

        const loggedInUsername = localStorage.getItem("username");
        commit(
          "STORE_USER",
          users.find(user => user.email == loggedInUsername)
        );
      })
      .catch(error => console.log(error));
  }
};
const getters = {
  getUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  }
};

export default { state, mutations, actions, getters };
