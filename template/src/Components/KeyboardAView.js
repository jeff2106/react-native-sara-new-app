import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const KeyboardAView = ({ style, children }) => {
  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll={true}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      style={[style]}
    >
      {children}
    </KeyboardAwareScrollView>
  )
}

KeyboardAView.propTypes = {}

KeyboardAView.defaultProps = {}

export default KeyboardAView
