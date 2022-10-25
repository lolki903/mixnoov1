import { View, Text, Animated } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'
import Choice from '../Choice'
import { useCallback } from 'react'
import { ACTION_OFFSET } from '../utils/constants'
export default function Card({name,source,email,isFirst,swipe, ...rest}) {
    const renderChoice = useCallback(
      () => {
        return(
            <>
            
            <View style={[styles.choiceContainer, styles.likeContainer]}>
                <Choice type="like" />
            </View>
             <View style={[styles.choiceContainer, styles.nopeContainer]}>
             <Choice type="nope" />
         </View>
         
         </>
        )
      },
      [],
    )
    const animatedCarStyle = {
        transform: [...swipe.getTranslateTransform()]
    }
    
    const rotate = swipe.x.interpolate({
        inputRange: [-ACTION_OFFSET,0,ACTION_OFFSET],
        outputRange: ['8deg','0deg','-8deg'],
        extrapolate: 'clamp'
    })
  return (
    <Animated.View style={[styles.container,isFirst && animatedCarStyle]} {...rest}>
       
        <Image style={styles.image} source={source} />
         <Text style={styles.name}>{name}</Text>
        <Text >{email}</Text>
        {
            isFirst && renderChoice()
        }
    </Animated.View>
  )
}