import Toast from 'react-native-toast-message'

/**
 * Call this function when you want to show a error notification toast.
 */
function showErrorToast(title, msg) {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: title,
    text2: msg,
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  })
}

/**
 * Call this function when you want to show a success notification toast.
 */
function showSucessToast(title, msg) {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: title,
    text2: msg,
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  })
}

function showInfoToast(title, msg) {
  Toast.show({
    type: 'info',
    position: 'top',
    text1: title,
    text2: msg,
    visibilityTime: 5000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  })
}

export { showErrorToast, showSucessToast, showInfoToast }
