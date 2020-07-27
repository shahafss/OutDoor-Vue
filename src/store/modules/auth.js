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
  }
};

const actions = {
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
        dispatch("storeUser", authData);
      })
      .catch(err => console.log(err));
  },
  login: ({ commit }, authData) => {
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
        console.log(res);
        commit("AUTH_USER", {
          token: res.data.idToken,
          userId: res.data.localId
        });
        router.push("/rooms");
      })
      .catch(err => console.log(err));
  },
  logout({ commit }) {
    commit("CLEAR_AUTH");
    router.push("/");
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
        console.log(res);
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        commit("STORE_USER", users[0]);
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
