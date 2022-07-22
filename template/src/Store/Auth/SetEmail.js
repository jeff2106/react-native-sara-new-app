import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('auth/setEmail'),
  reducers(state, { payload }) {
    state.email = payload.email
  },
}
