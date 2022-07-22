import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { tailwind } from '@/tailwind'
import {
  TextInputPayment,
  DateChoose,
  ButtonPaiement,
  SearchTextInput,
} from '@/Containers/Paiements/PaymentPending/Components'
import { Colors } from '@/Theme/Variables'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FetchCategoryList from '@/Store/Category/FetchCategoryList'
import FetchSubCategoryList from '@/Store/Category/FetchSubCategoryList'

const FilterPaymentPending = ({ navigation, onChange, onChangeText }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.item)
  const { r_acteur } = user._description || {}
  const user_session = user?._session

  const [filter_obj, setfilter_obj] = React.useState({
    filtertype_2: 'Fournisseur de services',
    id_filtertype_2: 0,
    filtertype_1: 'Catégorie de fournisseurs',
    id_filtertype_1: 0,
  })
  const [loading, setLoading] = useState(false)
  const [loadingNumber, setLoadingNumber] = useState(0)
  const [Date_obj, setDate_obj] = React.useState({
    datetype_2: '',
    datetype_1: '',
    datetype_default: '',
  })
  const [textInputValue, setTextInputValue] = React.useState()

  const _GetFilterData = data => {
    setfilter_obj({ ...filter_obj, ...data })
  }
  const _GetDateChoose = data => {
    setDate_obj({ ...Date_obj, ...data })
  }

  if (loading == true) {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  const _SubmitFilter = () => {
    setLoading(true)
    setLoadingNumber(prev => prev + 1)
  }
  const _SearchValue = data => {
    setTextInputValue(data)
  }

  //Redux Call Function
  const fetchCategoryListLoading = useSelector(
    state => state.category.fetchCategoryList.loading,
  )
  const GETCategoryListItems = useSelector(
    state => state.category.ItemCategoryList,
  )
  const fetchSubCategoryListLoading = useSelector(
    state => state.category.fetchSubCategoryList.loading,
  )

  const GETSubCategoryListItems = useSelector(
    state => state.category.ItemSubCategoryList,
  )
  const GETCategoryList = async () => {
    dispatch(
      FetchCategoryList.action({
        p_session: user_session,
      }),
    )
  }
  const GETSubCategoryList = async data => {
    dispatch(
      FetchSubCategoryList.action({
        p_session: user_session,
        p_categorie_fournisseur: data,
      }),
    )
  }
  //End

  useEffect(() => {
    if (Date_obj?.datetype_1 !== '' && Date_obj.datetype_2 !== '') {
      if (Date_obj?.datetype_1 > Date_obj?.datetype_2) {
        alert('Les champs ont des dates incorrectes')
      } else {
        onChange({
          DateObj: Date_obj,
          FilterObj: filter_obj,
        })
      }
    } else if (Date_obj?.datetype_1 !== '' && Date_obj?.datetype_2 === '') {
      // eslint-disable-next-line no-alert
      alert('Choisissez une date de fin')
    } else {
      onChange({
        DateObj: Date_obj,
        FilterObj: filter_obj,
      })
    }
  }, [loadingNumber])

  useEffect(() => {
    onChangeText(textInputValue)
  }, [textInputValue])

  useEffect(() => {
    if (GETSubCategoryListItems.length === 0) {
      setfilter_obj({ ...filter_obj, filtertype_2: 'Fournisseur de services' })
    }
    GETCategoryList()
    GETSubCategoryList(filter_obj?.id_filtertype_1)
  }, [filter_obj?.id_filtertype_1, GETSubCategoryListItems.length])

  return (
    <View style={[tailwind('flex-1')]}>
      <View style={[tailwind('flex-1 ')]}>
        <TextInputPayment
          data={GETCategoryListItems}
          displayImage={true}
          ReferLoading1={fetchCategoryListLoading}
          ReferLoading2={fetchSubCategoryListLoading}
          func={_GetFilterData}
          Refer="filtertype_1"
        >
          <Text style={{ fontFamily: 'Gilroy-Regular' }}>
            {filter_obj?.filtertype_1}
          </Text>
        </TextInputPayment>
        <TextInputPayment
          data={GETSubCategoryListItems}
          func={_GetFilterData}
          displayImage={true}
          Refer="filtertype_2"
        >
          <Text style={{ fontFamily: 'Gilroy-Regular' }}>
            {filter_obj?.filtertype_2}
          </Text>
        </TextInputPayment>

        <View style={tailwind('flex-row items-center')}>
          <DateChoose
            title="Date de début :"
            func={_GetDateChoose}
            Refer="datetype_1"
          />
          <DateChoose
            title="Date de fin :"
            func={_GetDateChoose}
            Refer="datetype_2"
            minimumDate={
              Date_obj?.datetype_default !== '' && Date_obj?.datetype_default
            }
          />
          <ButtonPaiement
            disabled={
              Date_obj?.datetype_default === '' &&
              filter_obj?.filtertype_1 == 'Catégorie de fournisseurs' &&
              filter_obj?.filtertype_2 == 'Fournisseur de services' &&
              true
            }
            onPress={() => _SubmitFilter()}
            style={[tailwind('w-12  mt-5  ')]}
            height={45}
            loading={loading}
          >
            <AntDesign color={Colors.white} name="check" size={20} />
          </ButtonPaiement>
        </View>
      </View>
    </View>
  )
}
export default FilterPaymentPending
