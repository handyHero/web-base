import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import AppStore from './modules/AppStore.js'
import User from './modules/user.js'

const store = new Vuex.Store({
    modules: {
        app: AppStore,
        user: User
    }
})

export default store
