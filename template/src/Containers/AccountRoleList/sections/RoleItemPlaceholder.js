import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const RoleItemPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'70%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        marginTop={15}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'70%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        marginTop={15}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'70%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        marginTop={15}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'70%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

RoleItemPlaceholder.propTypes = {}

RoleItemPlaceholder.defaultProps = {}

export default RoleItemPlaceholder
