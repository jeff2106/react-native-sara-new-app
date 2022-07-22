import { createAction } from '@reduxjs/toolkit'
import { navigateAndSimpleReset } from '@/Navigators/Root'

export default {
  initialState: {},
  action: createAction('auth/logout'),
  reducers(state, {}) {
    navigateAndSimpleReset('Auth')
    state.item = {}
  },
}
