import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser
  }),
  ...mapState('common', {
    // select_store: (state) => state.select_store,
    // store_id: (state) => state.store_id
  }),
  ...mapGetters('auth', ['loggedIn'])
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])
export const commonMethods = mapActions('common', ['fetchProvince', 'updateSelectStore', 'updateStore'])
