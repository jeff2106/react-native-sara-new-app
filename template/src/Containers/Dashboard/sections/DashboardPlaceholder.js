import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { tailwind } from '@/tailwind'

const DashboardPlaceholder = () => {
  return (
    <View style={tailwind('mt-4 mb-4')}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          width={200}
          flexDirection="row"
          marginBottom={20}
          marginLeft={20}
        >
          <SkeletonPlaceholder.Item width={160} height={15} borderRadius={4} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          alignItems="center"
          justifyContent="space-between"
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
          <SkeletonPlaceholder.Item
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <SkeletonPlaceholder.Item
              width={100}
              height={15}
              borderRadius={4}
            />
            <SkeletonPlaceholder.Item
              width={200}
              height={10}
              borderRadius={4}
              marginTop={5}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          marginTop={15}
          justifyContent="space-between"
        >
          <SkeletonPlaceholder.Item width={155} height={65} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={155}
            height={65}
            borderRadius={4}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
          justifyContent="space-between"
        >
          <SkeletonPlaceholder.Item width={155} height={65} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={155}
            height={65}
            borderRadius={4}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  )
}

DashboardPlaceholder.propTypes = {}

DashboardPlaceholder.defaultProps = {}

export default DashboardPlaceholder
