import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SelectionImpotPlaceholder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={10}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          width={'60%'}
          marginLeft={20}
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={200}
            height={50}
            borderRadius={4}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={10}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          width={'60%'}
          marginLeft={20}
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={200}
            height={50}
            borderRadius={4}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={10}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          width={'60%'}
          marginLeft={20}
        >
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={200}
            height={50}
            borderRadius={4}
            marginLeft={15}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={24} height={24} borderRadius={50} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

SelectionImpotPlaceholder.propTypes = {}

SelectionImpotPlaceholder.defaultProps = {}

export default SelectionImpotPlaceholder
