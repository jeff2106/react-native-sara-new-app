import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'

import startup from './Startup'
import theme from './Theme'
import auth from './Auth'
import role from './Role'
import category from './Category'
import paymentMethod from './PaymentMethod'
import thirdUser from './ThirdUser'
import fournisseur from './Fournisseur'
import service from './Service'
import form from './Form'
import impot from './Impot'
import TransacPayment from './Payment'
import Statement from './Statement'
import Dashboard from './dashboard'

const reducers = combineReducers({
  startup,
  theme,
  auth,
  role,
  category,
  paymentMethod,
  thirdUser,
  fournisseur,
  service,
  form,
  impot,
  TransacPayment,
  Statement,
  Dashboard,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'auth'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      /*serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },*/
      serializableCheck: false,
    })

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

export { store, persistor }
