import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { tailwind } from '@/tailwind'
import { useSelector } from 'react-redux'

const SuiviOperationPlaceholder = () => {

  return (
    <View style={tailwind('mt-4 mb-4')}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={200}
          flexDirection="row"
          marginBottom={20}
          marginLeft={10}
        >
          <SkeletonPlaceholder.Item width={160} height={15} borderRadius={4} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          alignItems="center"
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={15} flexDirection="column">
            <SkeletonPlaceholder.Item
              width={100}
              height={10}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={130}
              height={10}
              borderRadius={4}
              marginTop={5}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={20}
            height={25}
            borderRadius={50}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          alignItems="center"
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={15} flexDirection="column">
            <SkeletonPlaceholder.Item
              width={100}
              height={10}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={130}
              height={10}
              borderRadius={4}
              marginTop={5}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={20}
            height={25}
            borderRadius={50}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          alignItems="center"
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={15} flexDirection="column">
            <SkeletonPlaceholder.Item
              width={100}
              height={10}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={130}
              height={10}
              borderRadius={4}
              marginTop={5}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={20}
            height={25}
            borderRadius={50}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  )
}

SuiviOperationPlaceholder.propTypes = {}

SuiviOperationPlaceholder.defaultProps = {}

export default SuiviOperationPlaceholder
