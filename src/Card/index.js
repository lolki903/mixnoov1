import { View, Text, Animated } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'
import Choice from '../Choice'
import { useCallback } from 'react'
import { ACTION_OFFSET } from '../utils/constants'
export default function Card({name,source,email,isFirst,swipe,tiltSign, ...rest}) {

    
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET,0,ACTION_OFFSET],
        outputRange: ['8deg','0deg','-8deg'],

    })
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10,ACTION_OFFSET],
        outputRange: [0,1],
        extrapolate: 'clamp',
    })
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-ACTION_OFFSET, -10],
        outputRange: [1,0],
        extrapolate: 'clamp',
    })
    const animatedCarStyle = {
        transform: [...swipe.getTranslateTransform(rotate)]
    }
    const renderChoice = useCallback(
        () => {
          return(
              <>
              
              <Animated.View style={[styles.choiceContainer, styles.likeContainer, {opacity: likeOpacity}]}>
                  <Choice type="like" />
              </Animated.View>
               <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity:nopeOpacity}]}>
               <Choice type="nope" />
           </Animated.View>
           
           </>
          )
        },
        [],
      )
  return (
    <Animated.View style={[styles.container,isFirst && animatedCarStyle]} {...rest}>
       
        <Image style={styles.image} source={source} />
         <Text style={styles.name}>{name}</Text>
        {
            isFirst && renderChoice()
        }
    </Animated.View>
  )
}