import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'
import { tailwind } from '@/tailwind'
import NavBar from '@/Components/Navbar'
import { navigateAndSimpleReset } from '@/Navigators/Root'
import { default as Image } from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { Button, ButtonText } from '@/Components'
import KeyboardAView from '@/Components/KeyboardAView'
import BankAccountItem from '@/Containers/PaymentMethod/sections/BankAccountItem'
import CreditCardItem from '@/Containers/PaymentMethod/sections/CreditCardItem'
import MobileMoneyItem from '@/Containers/PaymentMethod/sections/MobileMoneyItem'
import DocumentItem from '@/Components/DocumentItem'

const PaymentResume = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const { data } = route.params

  const [loading, setLoading] = useState(false)

  const onBuyPress = () => {
    setLoading(true)
    setTimeout(() => {
      navigateAndSimpleReset('PaymentDone')
    }, 2000)
  }

  const getServiceFees = () => {
    return 500
  }

  const getTotalToPay = () => {
    console.debug('category', data.category)
    console.debug('company', data.company)
    console.debug('service', data.service)
    console.debug('form', data.form)
    console.debug('facture', data.facture)
    console.debug('paymentMethod', data.paymentMethod)
    if (data.service.type === 'facture') {
      return getServiceFees() + data.facture.amount
    }
    if (data.service.type === 'recharge') {
      const amountInput = data.form.filter(item => item.value_key === 'amount')
      return getServiceFees() + parseInt(amountInput[0].value)
    }
  }

  return (
    <SafeAreaView style={tailwind('h-full')}>
      <NavBar hasBack={true} title="Récapitulatif" navigation={navigation} />
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
                tailwind('font-bold text-gray-900 text-base mb-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Récapitulatif
            </Text>
            <View style={tailwind('bg-gray-100 p-2 rounded-md')}>
              {data.form.map((input, index) => (
                <View style={tailwind('flex-1')} key={index}>
                  <Text
                    style={[
                      tailwind('font-bold text-gray-600 text-sm'),
                      { fontFamily: 'Gilroy-Medium' },
                    ]}
                  >
                    {input.label} :
                  </Text>
                  <View
                    style={tailwind(
                      'flex-1 flex-row rounded-md bg-gray-100 items-center justify-between mb-1',
                    )}
                  >
                    <View style={tailwind('flex-1 flex-row items-center')}>
                      <Text
                        style={[
                          tailwind(
                            'flex-1 font-bold text-gray-500 text-sm ml-2',
                          ),
                          { fontFamily: 'Gilroy-Bold' },
                        ]}
                      >
                        {input.value}
                        {''}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
              {data.service.type === 'facture' && (
                <View style={tailwind('flex mt-2')}>
                  <Text
                    style={[
                      tailwind('font-bold text-gray-600 text-sm'),
                      { fontFamily: 'Gilroy-Medium' },
                    ]}
                  >
                    Factures à payer :
                  </Text>
                  <View
                    style={tailwind(
                      'flex-1 flex-row p-2 pb-4 rounded-md items-center justify-between',
                    )}
                  >
                    <View style={tailwind('flex-1 flex-row items-center')}>
                      <View style={tailwind('flex-1')}>
                        <Text
                          style={[
                            tailwind('flex-1 font-bold text-gray-500 text-sm'),
                            { fontFamily: 'Gilroy-Bold' },
                          ]}
                        >
                          {data.facture.libelle}
                        </Text>
                        <Text
                          style={[
                            tailwind('flex-1 font-bold text-gray-500 text-sm'),
                            { fontFamily: 'Gilroy-Bold' },
                          ]}
                        >
                          {data.facture.amount} FCFA
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              <Text
                style={[
                  tailwind('font-bold text-gray-600 text-sm'),
                  { fontFamily: 'Gilroy-Medium' },
                ]}
              >
                Méthode de paiement
              </Text>
              {data.paymentMethod &&
                data.paymentMethod.type === 'bank_account' && (
                  <BankAccountItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...data.paymentMethod}
                  />
                )}
              {data.paymentMethod &&
                data.paymentMethod.type === 'credit_card' && (
                  <CreditCardItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...data.paymentMethod}
                  />
                )}
              {data.paymentMethod &&
                data.paymentMethod.type === 'mobile_money' && (
                  <MobileMoneyItem
                    style={tailwind('bg-gray-100 ml-0')}
                    {...data.paymentMethod}
                  />
                )}
            </View>
            <Text
              style={[
                tailwind('font-bold text-gray-900 text-base mb-2 mt-5'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Frais de services
            </Text>
            <View
              style={tailwind(
                'flex-1 flex-row p-2 pt-4 pb-4 rounded-md bg-gray-100 items-center justify-between mb-2',
              )}
            >
              <View style={tailwind('flex-1 flex-row items-center')}>
                <Text
                  style={[
                    tailwind('flex-1 font-bold text-gray-700 text-sm ml-2'),
                    { fontFamily: 'Gilroy-Bold' },
                  ]}
                >
                  {getServiceFees()} FCFA
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
                tailwind('font-bold text-gray-900 text-base mb-2 mt-1'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Total à payer
            </Text>
            <View
              style={tailwind(
                'flex-1 flex-row p-2 pt-4 pb-4 rounded-md bg-gray-100 items-center justify-between mb-2',
              )}
            >
              <View style={tailwind('flex-1 flex-row items-center')}>
                <Text
                  style={[
                    tailwind('flex-1 font-bold text-gray-700 text-sm ml-2'),
                    { fontFamily: 'Gilroy-Bold' },
                  ]}
                >
                  {getTotalToPay()} FCFA
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
                tailwind('font-bold text-gray-900 text-base mt-5 mb-2'),
                { fontFamily: 'Gilroy-Bold' },
              ]}
            >
              Documents sélectionnés
            </Text>
            <View style={tailwind('flex flex-1')}>
              {data.files &&
                data.files.map(file => (
                  <>
                    {file.data && (
                      <DocumentItem
                        key={file.id}
                        label={file.label}
                        uri={file.data.uri}
                        name={file.data.name}
                        size={file.data.size}
                      />
                    )}
                  </>
                ))}
            </View>
            <View style={tailwind('mt-5 mb-5 flex-row')}>
              <ButtonText
                onPress={() => navigation.goBack()}
                iconLeft="chevron-left"
              >
                Retour
              </ButtonText>
              <View style={tailwind('m-2')} />
              <Button loading={loading} onPress={onBuyPress}>
                Confirmer
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAView>
    </SafeAreaView>
  )
}

export default PaymentResume
