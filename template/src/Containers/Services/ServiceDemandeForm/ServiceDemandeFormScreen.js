import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigate } from '@/Navigators/Root'
import { useTheme } from '@/Theme'
import { default as Image } from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { Button, ButtonText } from '@/Components'
import TextInput from '@/Components/TextInput'
import KeyboardAView from '@/Components/KeyboardAView'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import DocumentSelect from '@/Components/DocumentSelect'

const ServiceDemandeForm = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params

  const { Images } = useTheme()

  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState(data.service.form)
  const [formFiles, setFormFiles] = useState(data.service.files)

  const onTextChange = (item, value) => {
    let updatedForm = [...formInputs]
    let index = formInputs.findIndex(obj => obj.value_key === item.value_key)
    updatedForm[index].value = value
    setFormInputs(updatedForm)
  }

  const onFileSelect = (item, fileData) => {
    let updatedFiles = [...formFiles]
    let index = formFiles.findIndex(obj => obj.id === item.id)
    updatedFiles[index].data = fileData
    setFormFiles(updatedFiles)
  }

  const goToResumeScreen = () => {
    navigate('ServiceDemandResume', {
      data: {
        ...data,
        form: formInputs,
        files: formFiles,
      },
    })
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar
        hasBack={true}
        title="Formulaire de service"
        navigation={navigation}
      />
      <BottomSheetModalProvider>
        <KeyboardAView>
          <View style={tailwind('flex-1 p-4')}>
            <View
              style={[
                tailwind('w-full p-4 rounded-md bg-white'),
                { elevation: 1 },
              ]}
            >
              <Text
                style={[
                  tailwind('font-bold text-gray-900 text-base mb-2'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Service sélectionné
              </Text>
              <View
                style={tailwind(
                  'flex-1 flex-row p-2 rounded-md bg-gray-100 items-center justify-between mb-5',
                )}
              >
                <View style={tailwind('flex-1 flex-row items-center')}>
                  <View
                    style={tailwind(
                      'h-12 w-12 rounded-md border-2 border-gray-300 items-center justify-center',
                    )}
                  >
                    <Image
                      source={{ uri: data.company.logo }}
                      style={tailwind('h-10 w-10')}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={[
                      tailwind('flex-1 font-bold text-gray-700 text-sm ml-2'),
                      { fontFamily: 'Gilroy-Bold' },
                    ]}
                  >
                    {data.service.libelle}
                  </Text>
                </View>
                <View style={tailwind('flex-row items-center')}>
                  <View
                    style={[
                      tailwind('rounded-full bg-gray-500 bg-opacity-25'),
                      { marginStart: 10 },
                    ]}
                  >
                    <Icon
                      color={Colors.gray_500}
                      name="check"
                      style={{ margin: 2 }}
                      size={16}
                    />
                  </View>
                </View>
              </View>
              <Text
                style={[
                  tailwind('font-bold text-gray-900 text-base mb-5'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Formulaire de service
              </Text>
              <View style={tailwind('flex')}>
                {formInputs.map((item, index) => (
                  <TextInput
                    key={index}
                    label={item.label}
                    onChangeText={value => onTextChange(item, value)}
                    placeholder={item.placeholder}
                    value={item.value}
                    disabled={item.disabled}
                  />
                ))}
              </View>
              {data.service.files && (
                <>
                  <Text
                    style={[
                      tailwind('font-bold text-gray-900 text-base mt-5 mb-5'),
                      { fontFamily: 'Gilroy-Bold' },
                    ]}
                  >
                    Documents à fournir
                  </Text>
                  <View style={tailwind('flex flex-1')}>
                    {formFiles.map(file => (
                      <DocumentSelect
                        key={file.id}
                        label={file.label}
                        selectedFile={file.value}
                        onFileSelect={selectedFile =>
                          onFileSelect(file, selectedFile)
                        }
                      />
                    ))}
                  </View>
                </>
              )}
              <View style={tailwind('mt-5 mb-5 flex-row')}>
                <ButtonText
                  onPress={() => navigation.goBack()}
                  iconLeft="chevron-left"
                >
                  Retour
                </ButtonText>
                <View style={tailwind('m-2')} />
                <Button onPress={goToResumeScreen} loading={loading}>
                  Suivant
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAView>
      </BottomSheetModalProvider>
    </SafeAreaView>
  )
}

export default ServiceDemandeForm
