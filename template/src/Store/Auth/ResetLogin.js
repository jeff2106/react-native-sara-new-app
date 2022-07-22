import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('auth/resetLogin'),
  reducers(state, {}) {
    state.login.loading = false
    state.login.error = ''
  },
}
