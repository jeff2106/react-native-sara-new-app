import * as React from 'react'
import PropTypes, { func } from 'prop-types'
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  ScrollView
} from 'react-native'
import { tailwind } from '@/tailwind'
import { Colors } from '@/Theme/Variables'
import AntDesign from 'react-native-vector-icons/AntDesign'

const TextInputPayment = ({
                            children,
                            style,
                            onPress,
                            Refer,
                            func,
                            data,
                            displayImage,
                            ReferLoading1,
                            ReferLoading2,
                          }) => {
  const { height, width } = Dimensions.get('window')
  const [modalVisible, setModalVisible] = React.useState(false)
  const createThreeButtonAlert = () =>
    Alert.alert('Messages ', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('OK Pressed')
          setModalVisible(!modalVisible)
        },
      },
    ])

  const circle_color_item = name => {
    switch (name) {
      case 'Impôts':
        return '#F3945A'
        break
      case 'Doûanes':
        return '#1C6DD0'
        break
      case 'Services Publics':
        return '#FF5959'
        break
      case 'Gros facturiers':
        return '#FFBD35'
        break
      case 'Education':
        return '#34BE82'
        break
      case 'Tourisme':
        return '#009DAE'
        break
      case 'Transport':
        return '#344CB7'
        break
      default:
        return '#0E1A34'
    }
  }

  return (
    <TouchableOpacity
      onPress={() => setModalVisible(!modalVisible)}
      style={[
        style,
        tailwind('h-10  max-h-14 justify-center items-center mt-2 mb-2'),
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        },
      ]}
    >
      <View
        style={[
          tailwind(
            'h-12 w-full flex-row justify-between items-center rounded-md pl-2 pr-2 ',
          ),
          {
            backgroundColor: '#F4F6FB',
          },
        ]}
      >
        {children}
        {modalVisible ? (
          <AntDesign color={Colors.gray} name="up" size={20} />
        ) : (
          <AntDesign color={Colors.gray} name="down" size={20} />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          createThreeButtonAlert()
          setModalVisible(!modalVisible)
        }}
      >
        <View style={[tailwind('flex-1')]}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={[
              {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: height / 1.5,
                top: 0,
              },
            ]}
          />
          <View
            style={[
              tailwind('rounded-t-lg'),
              styles.modalView,
              {
                height: height / 1.2,
                position: 'absolute',
                bottom: -30,
                left: -20,
                right: -20,
                borderTopLeftRadius: 40,
                borderTopEndRadius: 40,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={tailwind('w-16 bg-gray-400 h-1 mb-5 mt-5 self-center')}
            />
            <ScrollView>
              {data.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={tailwind('flex-row ml-5 mr-5 mb-2 h-10  items-center')}
                  onPress={() => {
                    func(
                      Refer == 'filtertype_2'
                        ? {
                          filtertype_2: item?.r_nom,
                          id_filtertype_2: item?.id,
                        }
                        : {
                          filtertype_1: item?.r_libelle,
                          id_filtertype_1: item?.id,
                        },
                    )
                    setModalVisible(!modalVisible)
                  }}
                >
                  {displayImage && (
                    <View
                      style={[
                        tailwind(
                          'rounded-full h-9 w-9 justify-center items-center',
                        ),
                        {
                          backgroundColor:
                            Refer == 'filtertype_1'
                              ? circle_color_item(item?.r_libelle)
                              : null,
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: item.r_image_url }}
                        style={{
                          height: '100%',
                          resizeMode: 'contain',
                          width: '100%',
                        }}
                      />
                    </View>
                  )}

                  <Text style={tailwind('ml-2')}>
                    {item?.r_libelle ?? item?.r_nom}
                  </Text>
                </TouchableOpacity>
              ))}
              <Text/>
            </ScrollView>

          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

TextInputPayment.propTypes = {
  disabled: PropTypes.bool,
  func: PropTypes.func.isRequired,
}

TextInputPayment.defaultProps = {
  disabled: false,
  displayImage: false,
  data: {},
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default TextInputPayment
