import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
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
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BankAccountItem from '@/Containers/PaymentMethod/sections/BankAccountItem'
import CreditCardItem from '@/Containers/PaymentMethod/sections/CreditCardItem'
import MobileMoneyItem from '@/Containers/PaymentMethod/sections/MobileMoneyItem'
import DocumentSelect from '@/Components/DocumentSelect'

const ServiceFactureForm = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params

  const { Images } = useTheme()

  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState(data.service.form)
  const [formFiles, setFormFiles] = useState(data.service.files)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState()

  const bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['90%'], [])
  const showPaymentMethodModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

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
    navigate('PaymentResume', {
      data: {
        ...data,
        facture: {},
        form: formInputs,
        files: formFiles,
        paymentMethod: selectedPaymentMethod,
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
              <Text
                style={[
                  tailwind('font-bold text-gray-900 text-base mb-2 mt-5'),
                  { fontFamily: 'Gilroy-Bold' },
                ]}
              >
                Moyen de paiement
              </Text>
              {!selectedPaymentMethod && (
                <TouchableOpacity
                  onPress={showPaymentMethodModal}
                  style={tailwind(
                    'flex-1 flex-row p-2 rounded-md bg-gray-100 items-center justify-between mb-5',
                  )}
                >
                  <View style={tailwind('flex-1 flex-row items-center')}>
                    <Text
                      style={[
                        tailwind(
                          'flex-1 font-bold text-gray-400 text-sm ml-2 pt-2 pb-2',
                        ),
                        { fontFamily: 'Gilroy-Bold' },
                      ]}
                    >
                      Sélectionnez un moyen de paiement
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
                        name="chevron-right"
                        style={{ margin: 2 }}
                        size={16}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {selectedPaymentMethod &&
                selectedPaymentMethod.type === 'bank_account' && (
                  <BankAccountItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...selectedPaymentMethod}
                    onPress={showPaymentMethodModal}
                  />
                )}
              {selectedPaymentMethod &&
                selectedPaymentMethod.type === 'credit_card' && (
                  <CreditCardItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...selectedPaymentMethod}
                    onPress={showPaymentMethodModal}
                  />
                )}
              {selectedPaymentMethod &&
                selectedPaymentMethod.type === 'mobile_money' && (
                  <MobileMoneyItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...selectedPaymentMethod}
                    onPress={showPaymentMethodModal}
                  />
                )}
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
                <Button
                  disabled={!selectedPaymentMethod}
                  onPress={goToResumeScreen}
                  loading={loading}
                >
                  Payer
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={tailwind('flex flex-1 p-4')}>
          <Text
            style={[
              tailwind('font-bold text-gray-900 text-base mb-2'),
              { fontFamily: 'Gilroy-Bold' },
            ]}
          >
            Sélectionnez un moyen de paiement
          </Text>
          <View style={tailwind('mt-5')}>
            <BankAccountItem
              style={tailwind('bg-gray-100 ml-0')}
              provider_logo="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAREBUQEBIQEBAQEBAPDxAPEBUVDxAPFxUWFhUWFRYYHSggGBolHRUVITEhJSorMS4uGB8zODMsNygtLi0BCgoKDg0OGhAQGy0lHyUtLS0tLS0tLS0tLS0tNS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcCAf/EAEcQAAICAQEEBAcNBgQHAQAAAAECAAMRBAUSITEGE0FRByIyUmFxcxQXIzRykZKhorLB0dIzQlOBscIkYoKTFRZDVLPw8eH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAOhEAAgADAwkGBAUEAwAAAAAAAAECAxEEITEFEkFRYXGBkaETFbHB0fAiMjThI1KCsvEGM3KiFEJi/9oADAMBAAIRAxEAPwDuMREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREArxtAbu9un9i12PQp5SwlT/wAGHLrrsYK4ymNwnJXyeUtpjK7S/P2auJtOUtUzNuvhia30027ZoqksrWti77hFmcAbpPDBHdNQ98rVfwqPnb85deFf4tV7Y/cM5fLNup81lC1zpU9wwRUVFq9DdvfK1X8Kj7X5x75eq/haf7f5zSYirOLvG0/n6L0N3HhL1X8Gj7X6p998rVfwaPtfqmjiexJVSHlG0/n6L0N3HhH1P8Gj7X5z2vhE1J/6VH2v1TSFmekTShCyjam/n6L0N3Tp9qT/ANKj7X6plXpzqD/06ftfnNOrkpIOyC2T3jF4ehtQ6aan+HT9v85lXphqP4dX2vzmrpJCQdENom/mZso6WX+ZV9r85kHSm7zK/tfnNdSZkk0NVOmfmL8dJbvMr+1+cyDpHd5lf2vzlEomZBJoaqbHrLsbet82v7X5zKNtW+an1/nKZBM6CKGimRay2G17PNT6/wA5L0GsaxiGCjAzwz3ymQSy2R5Z+T+IkNGsETbxLeIiVNxERAEREAREQCnO0mc7ldbB2J3GfyDWDhrOHYD2czkS4lSuyWByt9q4BVcBOCk5xy9UtphJ7S/P8vL3hqNp3Z3ZlOvn7x1mj+Ff4tV7Y/cM5dOoeFf4tV7Y/cM5fLvE+Syr9S9yEREg80CexPAnsSyIZ7WSaZHWZ6ZqiIMSXXJSSNXJKSD0pZmSSEmBJnrknVCZ0mZJhSZ0km0JmWZq5iWZaoNkSEmdJhSZkg0hM6yy2T5Z+T+Ilcsn7NcKxLEAbvMnA5w8DeDFFxEgPtWgHAsDN5tfjt8y5n0ax28iq312YRfrO99Uw7aCtE67r/Cp2djMpVqm+7xoTokUC08+rT5OXPznH9JlrUjmxb14llFXR78SrVNJliIlioiIgFabNXnhXTjPD4VuX0ZZSubaiCzc8fG/1Zs3fghZ5pbv7PXLGZS2r6RV5eSRrNTVKw05+rNH8K/xar2x+4Zy6dR8K/xar2x+4Zy6S8T5PKv1L3IRESDzQJ7E8CexLIhntZIqkdZnqmpEOJMrkhJFR5NoqY8gT80h/Cqu49GR8bzYb3qV7MqTOk+VaR+0Y/mJITT95+YflOaK22eDGNcL/Cp7EnJtrjwlvj8P7qHpJlSOrA7J6B/94zFZRgjulQRRbldz0Hd3RMl3zo4IN7v8ujMqGZFtA7frmHHaTw7zw/rMNmv06eVYo9A8Y/MJp2lqi/6Qw73V9KBwWGUvimRRblmr/byJw1Q7FJmZLLTyVV9LSkbpRp14Iruezxd0f1zMte1dZZ+y0oUdjWvw+vdkqXMfzTXuhSXk31MO8LIrpUtN/qj6L4UXaUWHyrCPQgx9csdm7MqLEuu/gZzYSRnPzTXV0mus8vUrSO6lAW+c/nLLZvRmixj17X3nGfhbWC8/NGJb/jy2r4a/5PO8c702GsFutDdIFm8oF/pfzVdpeX7V0dPim2lOzdUrn+SrxMLtoP8AsadRd6RXuIf9VhUGSNFsyij9jVXX6UQAn1nmZOm19KF6Rt1bXva/Qr1fUt+5XSO9nNjY+SAB9ZkmlGHlNvn0KFA9Q/8A2Z4klkqe/QREQSIiIBSh19xsG8rD1kdvXbxGPXvGXMhHZ1Js63cBfOc8cb3Yccs+mTpjKgihx1JcFX1wNpscMXy62+Lpd0xNH8K/xar2x+4Zy6db8ImhN1FahguLeJIz+400mno9WPKZn/lgf1MxnWqVKipE79VH/HU8W05HtdrnZ8qH4aK9tJXdehrU+qCeWf5Tcatk0LyT52MmIgHBQB8nAnHHlOFfLC+aXqbSv6UnP+5MS3JxeOaadXsy9uSH15x9cm1bBtPlbq/MT/WbJY2OLcvTwkG7a1C/v5PcAf8A5MlbrRM/tw8k343HbHkDJtlvtEx/qihh6XPkyLTsBF8p971DH5SXVsqhf3N75ROZBv6QgeQmf82fwkG7bNzHg26O7dH/ANmil22Z80dFvp+0wdsyFZrpctRv/HO6zPG/YbPuKo5Ko/kJit19Q4Fh6uM1CyxmPFjn14npNO7dh9Z4f1locmQN1jibfLxqzGZ/VU2mbZ5ShW116JQpdTYbNtVjlg+nmPqka3bw/d8b5gP6SBVs0nymA9QzJtOz6hzBb5R/ATtgscqDCBcb/GpwR5UyjPxjotl37aV41MB21YfJVQfWTPaNrX5bwHfhVH4S1oRV8lVX1ACSFM6c1vFmEMiJ3xRvhd/JTp0fdjm2wD1ZJ+cyy02wdOvMM5/zOQPmGJMQzKpllAkby7LJhvza77/EzaWlE8hFT5KgH55LVpEQzOpljsWFCUhlpsU+Ofk/iJTK0ttgnxz8j8RDNpb+JF7ERKHWIiIAiIgCIiAUZY1WhKCbN47z0HiKwTxYP+58k8+yXkwabSpWMIoUElj3ljzJPaZnmUqBwJ15LBbvdNSRrNmKNqnPS9/uuts13pi6ipN44HWc847DNJv2vSvAvx7lBmw+FX4tV7Y/cM5hmck+xQTZmfE2ebasvT7I+wlQw66urx2VXiy/v6Q+YmfST+Eg37Xubk24O7AH/wCyu3p83peCySYMIVxv8TxJ+WLdP+eY0tS+H9tOtTJY5PEnPpBzPGZ4gToPNpfU9z2ongT2pmkKRVkmmS6zIFRkusy7OiTETUMzIZEQyQpkHfDESUMkIZERpmRpJ0QslKZlUyMpmVWkmsLJKmZUaRlMyq0GiZLVpb9Hj8I3yPxEoVaXXRs/Ct8j8RDN5Xzo2SIiUO0REQBERAEREArf+Fcc9fqu/wDbcP6SykbSLYFxYyu2TxVd0Y7BjJkmZy4IUqpUr71s0mTIonSJ1p71I0bwr/FqvbH7hnL51Hwr/FqvbH7hnLoeJ8plX6l7kIieurbmFbHoU4kHmnmJ76pvNb6Jjqm81vomCaHwT0s+bjeaw/0mfFMtCyjMymSa2kVJnrRvNP0TNSYHRkxGkhDIaZHMEesETOjSDvlxkpTM6NIyGZVB7j8xg6YYiWjTIrSKp/8ATMy57j8xkmyZJVpkVpGBPpHrEyBpJomSA0vOix+Fb2f9wmvBpfdEz8M3s/7hDN5LrGja4iJQ9EREQBERAEREAqTr7Ml9xeoVyhbJ6zAOC4HLdB+oZltKLrrOpNXUWklWTPi7uTnjzziXs55ETirWuh3qlG61WCuXHedE+BQ0pTTg9F1G78TRvCv8Wq9sfuGcvnUfCv8AFqvbH7hnLpo8T5DKv1L3ITqfgsvdtK6sxZUtC1gnIRSqnA7hknhOWTp/gm+L2+2X7ghYjJLatN2pmzbV29ptKVXUWCsuCVBVjkDGfJB7xIX/ADts3/uB/t2fplB4S9mX32UGmqy0KtgYoMgElcZ+aaX/AMt67/trvoGS4nU9G0260y5rhggqlpo3oWp0Os6TpRobmFaXoWY4VWDLvHuG8Bk+iQ+lPRanU1syoqXqCyOoxvEDyXxzB5Z7JzrZ/RPXWWKvUWVjeXLuN1UGc5493onY9dqkpqe2w4StSzE9wEmG/E2s8yK0y4lPgoveu9U1nBa3KkEEqysCCOBVhyI7jO77KsLUVsxyzVVsxPMkqCTODWPvEnllicd2Tmd32L8Wp9jV9wSUzgyI3nTEtS8zWun+xbbQuorLOKlIennhTxLqO/vHaAO6aBW869sXa9epVtzg9TsllZ8pWBIB9IOMgzU+mXRfc3tVpl4cWuqUcu9lHd3j+csja22XP/HlX615rzXLbq1NzKQykqynKspwQe8TsgbxM9u7nPpxOJB+H8p2wfs/9H4SC+So65/DzOT9czks5LM3FmY5JPpnRuitzPpK2Ylj44y3E4DsB9QE5jW3ATpPQz4lV67f/I0CwRtx8PQoul1ze6SpJKqi7o7BkccSnDSx6YN/i2+RX/SVCvLIrOi/Ei3koNL/AKHn4Z/Z/wBwmshpsXQs/Dv7P+4Qy8h1mI3OIiVPVEREAREQBERAEREA0fwr/FqvbH7hnLp1Dwr/ABar2x+4Zy+ZvE+Yyr9S9yE6f4Jvi9vth9wTmE6f4Jvi9vtl+4IWJGSvqVuZedIek9GiZFuFhNgZl3ApAAIBzlh3yr98jReZqP8AbX9UrfCfo7bLKOrrezCW53EZgOKc8DhNJ/4Pqv8At7v9t/ykuJ1O61W20y50UMCuWzYdM0vhB0LsFJsrycbzp4o9ZUnA9Mn9KNgrrqQosZGUb1ZDHqi3ZvLyI9PMTlGm6Payxt1NPbk8PGQqo9JLYAE7Zs3TGqmuoneNdaIT3kADMlOuJvY5sy0wxQz4btzVTgmoqZHZGGHRijDuZTgj5xO77E+LU+xq+4JxfpRcr63UMvkm58Ecjg4J+cGdn2H8Wp9jV90SITnyTCoZs2FaPVnIF2lZp9Y91Rwy2uCD5LrvnKsO0GdY2BturV1CyvgRgOhPjI3cfR3HtnGdpn4e32r/AHzM2xtq26W0W1HBHBlPkuvarej+ksjistudnmxQxfK2+G1ehuPTPov1e9qNOvwZ421qPI72X/L3js9XLfR+z/0f2yHsPa9Wrq6yv5NlbeUjdqsPx7ZYW+Sfkn+kk9+RJlwROZLwipu03rfU4vW3AeqdO6E/EavXb/5GnKqn4TqfQU/4Cr12/wDleSeXkqKsz9L8Uaz0zb/Ft8lP6SmDy26cN/jG+RX90yjDQRPipNi3skh5svQdvh39n/cJqgabN0CP+If2X9wg0s0X4sJvkREg9oREQBERAEREA1r3V4pTq789TZV+zfG+W4ce70zZJ4qsDAMpyDyMyTGTLzFjXDQbzpufRUpSvU0fwr/FqvbH7hnLp1Hwr/FqvbH7hnLpZ4nyOVfqXuQm9dCukWj0dDLZZYz2P1jBajup4oXGc8eXP0zRYkHJZ7RFIjz4Uq7Trnvh6Dzrf9ox74eg863/AGjORxJzmd3e8/UuvqdbPhD0HfafQK/zM1/pB4QWtQ16VGrDAhrGI6zd/wAozhT6cmaJEZzM5mVLRGqVS3Y9an2sAkBjugkAtjO6O047fVOqaLpzs+qtKt+1urREz1RGd0AZ+qcqiE6GFmtcdnrmJX6ybtRqzc7VMXrZ2dWZd0+Mc4I9GcSKDPE+iEc0bzm2XvRTavubUrYbGrr5WgKTvp5u6Dz7j2Tf36e6Agjet4gj9kZyUGegZdHVZ8oTbPBmQUptr6omXFFYhGLoD4rFd0sPSOyb90f6UaLTaZKDZY5r3iWFRAyWJOPVnE5uDPStLmdntcUiJxQpdblzNp6UbRp1F/XUs7BlCsr1lSpXkQTzz+EqQ8grZMq2RQu7R2kTieL97SaHm1eD1v8AEWey/uE0wWTbfBy2dRZ7IffEqdtijrOhW3yZ0WIiD6IREQBERAEREApNBXqTWpWyoKc7oNZJAyeBO9xl3MAuQN1e8gbGQmRnHqmeZSoFAqJ141w8DSbMcbq1ThTHlU0bwr/FqvbH7hnL53LpDsGrWIqWs6hH3x1ZAJOCOOQe+UXvbaPz7/pL+mWadTwLdYJ06dnwUpRaTlUTqvvb6Pz7/pL+mPe20fn3/SX9MijOTum0bOf2OVROq+9to/Pv+kv6Z897bR+ff9Jf0xRjum0bOf2OVxOq+9vo/Pv+kv6Y97bR+ff9Jf0xRjum0bOf2OVROq+9to/Pv+kv6Y97bR+ff9Jf0xRjum0bOf2OVROq+9to/Pv+kv6Z897bR+ff9Jf0xmsd02jZz+xywGfZ1L3ttH59/wBJf0z772+j8+/6S/pk0ZHdFo2c/scuBnoGdQ97jSeff9Jf0x73Gk8+/wCkv6Za8r3RaNnP7HMAZ7DTpnvdaTz7/pL+mffe60nn3/SX9MtVjue07Of2OaCybn4MGzqLPYj74lx73Wk8+/6S/plnsLovTo7GsqaxiybhDlSMZB7AO6KnVZMnWiVOhjipRbdjL+IiQe+IiIAiIgCR9ZduIWxnGOHZxIGT6BnJ9AkiJDVVcSsbyi9zIdO12B1vjX9Z++HBJAz3DG7jul4JVHZp3iOsIoL9Yat0eVnJG95pPHEtpjJharVUwW9qtXx236zadGoqUdcXuV1Fw2XaiDtTadOmUPcxVWYIpCM2XPIYUE9kwaDbumus6quwmzdLhGrdGKjgSA6jPPskDppRY9VXVrY27qa3bqVzYqDOWXPDI9Mq6OvGqTULXrbkqouDe7FUOGOCi1BQPGYgA5HKbnDFMiUdNF2h8cH5G00bUpe59Mr5uqCtYm6fFU4IOcYPMco0+1KbLn06Pm6nBsTBBUHkeIweY5d802nZWto6nWkLZatj2XpWrdfalxG+jZ4HcGMDs3ZMbYb3anVX17+n1C202aS8qQGHVKGRvOQkEEQVU2Zd8OnpRvdXRqfE2I7c0wrstNgVKbGqsZwVAsXgVGRxPqzPGz9vaa9ildhNgXf6t0dHKecFYAkeqarp9BqmoS59OTZVtF9VbpfPQjBKb3BiCcjjMtuvs1Ov0ospegV23NTbYjq9gNRBrxxweOTxwQIqR20V1dNND0unDj5m1V7YobTnVK+aAGYvut5KkhjjGeGD2SPqOkekRgjuwZq1sCrVax6tuTeKpxNa0zX17ObQHTag3lbq1KqDU2+7YbfzgDjMms0tterDY1gVdHTUbNGgYmxSSVJYEY7eEBTo3Crr7q3PF46Ubbs/aVVyGyssVUlTvVuhyACfFYA9vdMOk23praG1Ndm/SgYu4VsrujLZXGeXHlPmy9Rv0nxL1NY6snUJu22EKPHIHPOeffmadp9hainQLbp0ZbrNO9Os0rAjrVO8u+F7LBnn2iC8UyJJNKtzbu3e6cjdtTtaiuj3U77tG6r75VvJbG6cYz2jsmDWbe01So9jsFsTrEYVWMCnA5O6p3eY54lFqNFqLhpdOtYFdFKW29ej9TZYFCohxzxksR3gTJsei+rSajR2IxNKWLQ6K25ZWykqqk8ypJGPVFSHMjrSmjGmnnho4FnX0p0bKXFjbg3PGNVoB323UxleOSRymbaG39LQ/V2WYs3d4oiO7KvewUHdHrlLtHR2nZVFQrc2L7j3kCnfXcdC2R6ADMmnazR6rUs9Ftqamxba7qV6xsboHVuM5XGOHZxghTJlaOmi+j0127tNxbXdINKlSXm5eptcV1uASpc54HA4cjzxjElajX1pZXUzYe7fFQwTvboy3EDAwOPGaadj2NWgtoIXUbTF76YDeFVDKynfxwBPM+uZqtlamjXaVDv3aTT+6GqtOWepWrI3LD24IG6e44gdrMuu/Loel39L1q0m027UpW9NMz4vsUuiYPjKM5OcY/dPzT3/AMQr673PvfC9X1u5un9nvbu9nGOfDnNL1Wy9batutUIlxtF1KOre6ESolUrHZhlzkdpaWL6x11y6o6fUlH0K1lUqJZLDYWKsDjkB/SKkqa9K06tHXfxLzae2aNOUW5ipt3urC1u5bdxvYCg8sie9m7WpvLCpmYoAW3qnTgc48pRnkeU1jb9ll92kuSnWVrS+qFhrqxem9UoUqGyMEnHH0y92Bqiymsrq8px6zWIqs2SeAK8Dj1DsipMEyJxtaNFzvuT163qLqIiDcREQBERAEREAr/dTdQbQFyAzgccboJ+vAlhKRqbsHThR1bEgXbw4Uk5K7vPexkfXLuYyYm8a3JK9NX31pXFYXq56GbTYYVhTFu7VdTzuxK/a21atMqvbv4dxWoRC7FznAAXj2TBotu0W2dUOtW3dLiu2myt2UcyocDe/lIvS6i1kpNVb2mvVVWsqbu9uLknyiBMBr1Gq1lFrad9PVpetcta1ZexmXdCqEY4HbkzY4oo4lFRbND434e9pY1beoZaXBfGqdq6soQd8ZyGB8nyW590y6TbNFt1mnRvhqDixGGD61z5Q5cR3iV+3NCxt0fVVkpTqd993GK69xhk8e8iVw6P2WW6m4Z0+oXVm3SX4HjJ1aKQwHNCQQQfXFSHFMTpSvndf1Lr/AJh0+4tmXCPedMGKHAuDbuGPYM5GTw4STdtKtb0053ja6NYoVSQEXgSx/dGcDjzlBsfY9tuzrNPqUNNt1l74yDuWM5dGXBPI4PPskjono9R4+p1ildTYEqCHB3Kq1wMYP7zEsfXBMEyNuFUxvw8duFOOokU9KtO676JqnTjhk0lrKcc8ELjskjW7fprfqsWvYFDutNT2GtTyL7gO7mav0d02o01aB9NtBnrNjbiX1+5zktgbhfHI93OTNtaJzqGsGn1iF0QC7R6hFNhC8nRmGCpOAYKQzY3Am8bq3O64ubukmnWtbcXPW6M+/XRYyqqnDb+B4v8APuM8jpNp+qe4i5aq1Vy70WKGVjgFMjxv5TBRptSdmNXeC+pam5d3Klzne3FYjxS2CATyzMO19Dc+yeoWtjd1NKdXw3t4FcjnjsPbBZxx0r/5rSmnViWWv27TUy1nrXsZN/cpqex1TzmCA7o9c+N0i0wpW/eco79Uiip+tezJBQV43iwwcjHYZT7c0Lm9bBp9XwqrQX6PUKlhIySjozDgOGD6TMTbP1LaOtdTTbe63vYpS9E1VNfHcbeBCu/HB49sVDjjq6eDLzT9IKHWxvhUNFfWXJbS6WKmCc7rAZ5Hl3GeNP0kpfd3E1RDld1/ctorIYjB3yuN3jzzKbRaPVmrVrjUmh9M1dNersR72uKsPFKngvEDBM9dH0uoFYbT68sqJU/WX1vp1PihmVesOAMcMDgICmR1VfDbx0GwaPbVFt9mmRj11H7RSMcO8d44jl3iYqukemZb2VmK6X9swQ4HPl53knlNd1Ow9U1199INN51WKrDj4TTPWiOef7pGR6V9M+17Dsqq2jTVSwS2uuvTDh8LikoSOPPeznOOeZFSvaTdWvXqdOqv4ay/0/SGqwqFr1XjlQrNpbVr8bkS5XAHpzJGh2xRdbZTW2baG3bEIII7MjPMekSj2ELajWG0+vzuJUxtuR6U8nLBd8kAY7BymGrYFrNfegNGpTWW26a0gfCVFVyjAHijEHgeXOSWUcd12/l4/wAaS2bpRpwnWYvav4TLpQ7KvVsVfeKg7uCDz7pL2XtevUZ6tbQAquGsqdFZW5FSwG9y7PRKTZWh1A2TbU9TLqHTV4q4Z3nZyoHHGPGHbNg2MjLp6lYYZaalZTzDBACD/MReTLijipXVXD7k6IiDcREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAP/2Q=="
              libelle="Mon compte BNI"
              iban="DZkk-BBBS-SSSS-CCCC-CCCC-CCKK"
              onPress={() => {
                bottomSheetModalRef.current.dismiss()
                setSelectedPaymentMethod({
                  type: 'bank_account',
                  provider_logo:
                    'data:image/jpeg;base64,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',
                  libelle: 'Mon compte BNI',
                  iban: 'DZkk-BBBS-SSSS-CCCC-CCCC-CCKK',
                })
              }}
            />
            <CreditCardItem
              style={tailwind('bg-gray-100 ml-0')}
              provider_logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr69fDggJ1mn90jn-Md5esjZ3nbVuDgYwPQ5yEqFvM04IhvXMsgH1TvdRTB_DB3i5tfVM&usqp=CAU"
              libelle="Ma carte UBA"
              code="4146134032435692"
              onPress={() => {
                bottomSheetModalRef.current.dismiss()
                setSelectedPaymentMethod({
                  type: 'credit_card',
                  provider_logo:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr69fDggJ1mn90jn-Md5esjZ3nbVuDgYwPQ5yEqFvM04IhvXMsgH1TvdRTB_DB3i5tfVM&usqp=CAU',
                  libelle: 'Ma carte UBA',
                  code: '4146134032435692',
                })
              }}
            />
            <MobileMoneyItem
              style={tailwind('bg-gray-100 ml-0')}
              provider_logo="https://ci.macarrierepro.com/wp-content/uploads/2020/07/orange-money.jpg"
              libelle="Mon orange money"
              numero="0789866407"
              onPress={() => {
                bottomSheetModalRef.current.dismiss()
                setSelectedPaymentMethod({
                  type: 'mobile_money',
                  provider_logo:
                    'https://ci.macarrierepro.com/wp-content/uploads/2020/07/orange-money.jpg',
                  libelle: 'Mon orange money',
                  numero: '0789866407',
                })
              }}
            />
            <MobileMoneyItem
              style={tailwind('bg-gray-100 ml-0')}
              provider_logo="data:image/png;base64,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"
              libelle="Mon momo pay"
              numero="0501020304"
              onPress={() => {
                bottomSheetModalRef.current.dismiss()
                setSelectedPaymentMethod({
                  type: 'mobile_money',
                  provider_logo:
                    'data:image/png;base64,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',
                  libelle: 'Mon momo pay',
                  numero: '0501020304',
                })
              }}
            />

            <ButtonText
              onPress={() => bottomSheetModalRef.current?.dismiss()}
              style={tailwind('mt-16')}
            >
              Annuler
            </ButtonText>
          </View>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
  )
}

export default ServiceFactureForm
