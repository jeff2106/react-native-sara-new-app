import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'

const Brand = ({ height, width, mode, style }) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={[{ height, width }, style]}>
      <Image style={Layout.fullSize} source={Images.logo_inline} resizeMode={mode} />
    </View>
  )
}

Brand.propTypes = {
  height: PropTypes.any,
  mode: PropTypes.oneOf(['contain', 'cover', 'stretch', 'repeat', 'center']),
  width: PropTypes.any,
}

Brand.defaultProps = {
  height: 200,
  mode: 'contain',
  width: 200,
}

export default Brand
