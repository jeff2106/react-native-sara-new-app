import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import Toast from 'react-native-toast-message'
import { ApplicationNavigator } from '@/Navigators'
import './Translations'
import { Config } from '@/Config'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const newColorTheme = {
  primary: {
    50: '#ff9758',
    100: '#ff9758',
    200: '#ff9758',
    300: '#ff9758',
    400: '#ff9758',
    500: '#ff9758',
    600: '#ff9758',
    700: '#ff9758',
    800: '#ff9758',
    900: '#ff9758',
  },
}
const theme = extendTheme({ colors: newColorTheme })

const App = () => (
  <Provider store={store}>
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <NativeBaseProvider theme={theme}>
        <BottomSheetModalProvider>
          <ApplicationNavigator />
        </BottomSheetModalProvider>
        <Toast ref={ref => Toast.setRef(ref)} />
      </NativeBaseProvider>
    </PersistGate>
  </Provider>
)

export default App
