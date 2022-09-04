import React, { useEffect, useRef, useState } from 'react'

import { Animated, Button, Text, View } from 'react-native'

/*
Les props du composont sont :
messages ('le message que l alerte dois afficher'),
textColor ('la couleur du text'),
textSize ('la taille du texte'),
backgroundColor  ('le background'),
borderColor  ("les couleurs des bordures gauche et droite")

*/

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide()
    })
  }, [])

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.backgroundColor,
        borderLeftColor: props.borderColor,
        borderRightColor: props.borderColor,
        borderLeftWidth: 10,
        borderRightWidth: 10,
      }}
    >
      <Text style={{ color: props.color, fontSize: props.size }}>
        {props.message}
      </Text>
    </Animated.View>
  )
}

export default props => {
  const [messages, setMessages] = useState([props.messages])
  const [count, setCount] = useState(false)
  React.useEffect(() => {
    setMessages([props.messages])
    setCount(true)
    const TimeOut = setTimeout(() => {
      setCount(false)
    }, 1000)
    return clearTimeout(TimeOut)
  }, [props])
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 0,
          right: 0,
          zIndex: 100000,
        }}
      >
        {count &&
          messages.map(message => (
            <Message
              color={props.textColor}
              size={props.textSize}
              backgroundColor={props.backgroundColor}
              key={message}
              borderColor={props.borderColor}
              message={message}
              onHide={() => {
                setMessages(messages =>
                  messages.filter(currentMessage => currentMessage !== message),
                )
              }}
            />
          ))}
      </View>
    </>
  )
}
