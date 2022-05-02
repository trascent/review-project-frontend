class authenticationChecker {
    authentication: boolean = false;
    token: string;
}

// initial state
const state = new authenticationChecker();

// getters
const getters = {}

// action
const actions = {

}

// mutations
const mutations = {
    reset(state: authenticationChecker){
        state.authentication = null;
        state.token = "";
    },
    setAuthenticationState(state: authenticationChecker, authenticated: boolean) {
        state.authentication = authenticated
    },
    setToken(state: authenticationChecker, token: string) {
        state.token = token
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}