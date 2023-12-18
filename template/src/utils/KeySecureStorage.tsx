import { Platform } from 'react-native'
import * as Keychain from 'react-native-keychain'

const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password']
const ACCESS_CONTROL_OPTIONS_ANDROID = ['None']
const ACCESS_CONTROL_MAP = [
  null,
  Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
  Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
  Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
]
const ACCESS_CONTROL_MAP_ANDROID = [
  null,
  Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
]
const SECURITY_LEVEL_OPTIONS = ['Any', 'Software', 'Hardware']
const SECURITY_LEVEL_MAP = [
  Keychain.SECURITY_LEVEL.ANY,
  Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
  Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
]

const SECURITY_STORAGE_OPTIONS = ['Best', 'FB', 'AES', 'RSA']
const SECURITY_STORAGE_MAP = [
  null,
  Keychain.STORAGE_TYPE.FB,
  Keychain.STORAGE_TYPE.AES,
  Keychain.STORAGE_TYPE.RSA,
]

const VALUES =
  Platform.OS === 'ios'
    ? ACCESS_CONTROL_OPTIONS
    : ACCESS_CONTROL_OPTIONS_ANDROID
const AC_MAP =
  Platform.OS === 'ios' ? ACCESS_CONTROL_MAP : ACCESS_CONTROL_MAP_ANDROID
const SL_MAP = Platform.OS === 'ios' ? [] : SECURITY_LEVEL_MAP
const ST_MAP = Platform.OS === 'ios' ? [] : SECURITY_STORAGE_MAP

export async function saveDataInStore({ userIdentifiant, userPassword }) {
  if (!userIdentifiant && !userPassword) throw Error("Missing param's")
  await Keychain.setGenericPassword(userIdentifiant, userPassword, {
    accessControl: ACCESS_CONTROL_MAP,
    securityLevel: SL_MAP[0],
  })
}

export async function resetDataInStore() {
  await Keychain.resetGenericPassword()
}

export async function getDataInStore() {
  try {
    const credentials = await Keychain.getGenericPassword()
    if (credentials) {
      return credentials
    } else {
      return 'No credentials stored'
    }
  } catch (error) {
    return "Keychain couldn't be accessed!" + error
  }
}
export async function loadDataSave() {
  try {
    const options = {
      authenticationPrompt: {
        title: 'Authentication needed',
        subtitle: 'Subtitle',
        description: 'Some descriptive text',
        cancel: 'Cancel',
      },
    }
    const credentials = await Keychain.getGenericPassword(options)
    if (credentials) {
      return { ...credentials, status: 'Credentials loaded!' }
    } else {
      return { status: 'No credentials stored.' }
    }
  } catch (err) {
    return { status: 'Could not load credentials. ' + err }
  }
}
