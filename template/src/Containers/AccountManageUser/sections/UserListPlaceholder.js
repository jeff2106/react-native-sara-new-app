import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const UserListPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="95%"
        marginBottom={15}
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'60%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={100}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item width={16} height={16} borderRadius={50} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="95%"
        marginBottom={15}
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'60%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={100}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item width={16} height={16} borderRadius={50} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="95%"
        marginBottom={15}
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'60%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={100}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item width={16} height={16} borderRadius={50} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="95%"
        marginBottom={15}
      >
        <SkeletonPlaceholder.Item width={'60%'} marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            height={20}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={'60%'}
            height={20}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item
            width={50}
            height={50}
            borderRadius={100}
            marginRight={10}
          />
          <SkeletonPlaceholder.Item width={16} height={16} borderRadius={50} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

UserListPlaceholder.propTypes = {}

UserListPlaceholder.defaultProps = {}

export default UserListPlaceholder
