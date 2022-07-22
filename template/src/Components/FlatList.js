import React from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import PropTypes from 'prop-types'

const MyFlatList = props => (
  <FlatList
    {...props}
    refreshControl={
      props.refreshing && props.onRefresh ? (
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      ) : undefined
    }
  />
)

MyFlatList.propTypes = {
  refreshing: PropTypes.bool,
}

MyFlatList.defaultProps = {
  refreshing: false,
}

export default MyFlatList
