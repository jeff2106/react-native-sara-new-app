import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { tailwind } from '@/tailwind'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import DocumentPicker from 'react-native-document-picker'

const DocumentSelect = ({
  label,
  selectedFile,
  onFileSelect,
  placeholder,
  disabled,
}) => {
  const [file, setFile] = useState(selectedFile)

  const deleteFile = () => {
    setFile(undefined)
    onFileSelect(undefined)
  }

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        mode: 'open',
      })
      setFile(res)
      onFileSelect(res)
      console.debug('res', res)
      // console.debug('uri ', res.uri)
      // console.debug('type ', res.type)
      // console.debug('name ', res.name)
      // console.debug('size ', res.size)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.debug(err)
      }
    }
  }

  return (
    <View>
      <Text
        style={[
          tailwind('text-gray-600 text-base mb-1'),
          { fontFamily: 'Gilroy-Regular' },
        ]}
      >
        {label}
      </Text>
      {!file && (
        <TouchableOpacity
          onPress={disabled ? null : selectFile}
          style={[
            tailwind(
              'flex-row h-14 flex-1 p-2 mb-5 rounded-sm bg-blueGray items-center',
            ),
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0.7,
              },
              shadowOpacity: 0.2,
              shadowRadius: 0.7,

              elevation: 0.7,
            },
          ]}
        >
          <View
            style={[
              tailwind('bg-grayLight border-2 border-gray-300 rounded-full'),
            ]}
          >
            <Icon
              style={tailwind('m-1')}
              color={Colors.primary}
              name="file-upload"
              size={22}
            />
          </View>
          <Text
            style={[
              tailwind('text-gray-400 ml-2'),
              { fontFamily: 'Gilroy-Regular' },
            ]}
          >
            {placeholder || 'Sélectionnez un fichier'}
          </Text>
        </TouchableOpacity>
      )}
      {file && (
        <View
          style={[
            tailwind(
              'h-14 flex-1 flex-row justify-between p-2 mb-5 rounded-sm bg-blueGray items-center',
            ),
            {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0.7,
              },
              shadowOpacity: 0.2,
              shadowRadius: 0.7,

              elevation: 0.7,
            },
          ]}
        >
          <View
            style={[
              tailwind('bg-grayLight border-2 border-gray-300 rounded-full'),
            ]}
          >
            <Icon
              color={Colors.primary}
              name="file"
              style={tailwind('m-1')}
              size={22}
            />
          </View>
          <View style={tailwind('flex-1 ml-2')}>
            <Text
              numberOfLines={1}
              style={[
                tailwind('flex-1 text-gray-500 text-sm'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              {file.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                tailwind('text-gray-500 text-sm'),
                { fontFamily: 'Gilroy-Regular' },
              ]}
            >
              {(file.size / 1048576).toFixed(2)} mb
            </Text>
          </View>
          <TouchableOpacity
            onPress={disabled ? null : deleteFile}
            style={[
              tailwind('rounded-full bg-blueDark bg-opacity-10'),
              { marginStart: 10 },
            ]}
          >
            <Icon
              color={Colors.gray_500}
              name="close"
              style={{ margin: 5 }}
              size={16}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

DocumentSelect.propTypes = {}

DocumentSelect.defaultProps = {}

export default DocumentSelect
