import { createAction } from '@reduxjs/toolkit'
import { navigateAndSimpleReset } from '@/Navigators/Root'

export default {
  initialState: {},
  action: createAction('auth/clearUser'),
  reducers(state, {}) {
    state.item = {}
  },
}
