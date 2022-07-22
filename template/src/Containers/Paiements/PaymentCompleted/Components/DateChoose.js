import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
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
import DatePicker from 'react-native-date-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import moment from 'moment'

const DateChoose = ({
  navigation,
  title,
  func,
  Refer,
  minimumDate,
  Disabled,
}) => {
  const [date, setDate] = React.useState()
  const [active, setActive] = React.useState(false)
  const OldMonth = new Date().getMonth()
  const OldMonths = OldMonth > 9 ? OldMonth : '0'+OldMonth
  return (
    <View style={[tailwind('flex-1 mr-2 ')]}>
      <Text style={[{ fontFamily: 'Gilroy-Regular' }, tailwind('mb-2')]}>
        {title}
      </Text>

      <TouchableOpacity
        style={[
          tailwind(
            'h-12 w-full flex-row justify-between items-center rounded-md pl-2 pr-2',
          ),
          {
            backgroundColor: '#F4F6FB',
          },
        ]}
        onPress={() => {
          setActive(!active)
        }}
      >
        {date && (
          <Text style={[{ fontFamily: 'Gilroy-semibold' }]}>
            {moment(date ?? new Date()).format('DD/MM/YYYY')}
          </Text>
        )}
        {!date && (
          <Text
            style={[
              tailwind('text-gray-500 text-sm'),
              { fontFamily: 'Gilroy-semibold' },
            ]}
          >
            {Refer == 'datetype_2' &&
              moment(date ?? new Date()).format('DD-MM-YYYY')}
            {Refer == 'datetype_1' && moment(date ?? new Date()).format('DD/')}
            {Refer == 'datetype_1' && (date ?? '01')}
            {Refer == 'datetype_1' &&
              moment(date ?? new Date()).format('/YYYY')}
          </Text>
        )}
        <MaterialCommunityIcons color={Colors.gray} name="calendar" size={20} />
      </TouchableOpacity>

      {active && (
        <DatePicker
          modal
          mode="date"
          title={'Date de debut'}
          open={active}
          date={new Date()}
          locale="fr-FR"
          onConfirm={date => {
            setActive(!active)
            setDate(date)
            func(
              Refer == 'datetype_1'
                ? {
                    datetype_1: moment(date).format('YYYY-MM-DD'),
                    datetype_default: date,
                  }
                : { datetype_2: moment(date).format('YYYY-MM-DD') },
            )
          }}
          onCancel={() => {
            setActive(!active)
          }}
        />
      )}
    </View>
  )
}

DateChoose.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

DateChoose.defaultProps = {
  loading: false,
  minimumDate: new Date(),
}

export default DateChoose
