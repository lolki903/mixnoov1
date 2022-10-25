import { View, Text, Animated, PanResponder } from 'react-native'
import React, { useRef } from 'react'
import { useState } from 'react'
import { people } from './data'
import Card from '../Card'
import { styles } from './styles'
import Footer from '../Footer'

export default function Main (){
    
    const [peoples, setPeoples] = useState(people)
    const expanded = true;
    const swipe = useRef(new Animated.ValueXY()).current
    const panResponder = PanResponder.create ({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx,dY}) => {
            swipe.setValue({x:dx,y:dY})
        },
        onPanResponderRelease: (_, gesture) => {
            Animated.spring(swipe, {
                toValue: {
                    x:0,
                    y:0
                },
                useNativeDriver: true,
                friction: 4,

        })
        .start()
    }
    })
  return (
    <View style={styles.container}>
      {peoples.map(({name,source,email},index) => {
        const isFirst  = index === 0;

        const dragHandlers = isFirst ? panResponder.panHandlers : {}

        return <Card key={name} name={name} source={source} email={email} isFirst={isFirst} {...dragHandlers} swipe={swipe}/>
        }).reverse()}
        <Footer />
    </View>
    )
}
 