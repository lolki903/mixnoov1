import { View, Text, Animated, PanResponder,TouchableOpacity } from 'react-native'
import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,useRef
  } from 'react';
// import React, { useCallback, useEffect, useRef } from 'react'

import { people  } from './data'
import Card from '../Card'
import { styles } from './styles'
import Footer from '../Footer'
import { ACTION_OFFSET, CARD } from '../utils/constants'
import { signOut } from 'firebase/auth';
import { auth, database } from '../../config';

export default function Main ({navigation}){
    
    const [peoples, setPeoples] = useState(people)
    const swipe = React.useRef(new Animated.ValueXY()).current
    const tiltSign = React.useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (!peoples.length) {
            setPeoples(people)
        }
    }, [peoples.length])


    const panResponder = PanResponder.create ({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy , y0}) => {
            swipe.setValue({x:dx,y:dy})
            tiltSign.setValue(y0 > CARD.height / 2 ? 1 : -1)
        },
        onPanResponderRelease: (_, {dx,dy}) => {

            const direction = Math.sign(dx)
            const velocity = Math.abs(dx) > ACTION_OFFSET
            if (velocity) {
                Animated.timing(swipe, {
                    duration:200,
                    toValue: {x: direction * CARD.out_of_screen, y: dy},
                    useNativeDriver: true,

                }).start(removeTopCard)
            }else{
                Animated.spring(swipe, {
                    toValue: {x:0,y:0},
                    useNativeDriver: true,
                    friction: 5,
                }).start()
            }
    }
    })
    const removeTopCard = useCallback( () => {
        setPeoples((prevState) => prevState.slice(1))
        swipe.setValue({x:0,y:0})
    },[swipe])

    const handleChoice =useCallback((direction) => {
        Animated.timing(swipe.x, {
            duration:400,
            toValue: {
                x: direction * CARD.out_of_screen, 
                y: 0
            },
            useNativeDriver: true,

        }.start(removeTopCard))
    },[removeTopCard,swipe.x])
    
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
      };
    
      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10
              }}
              onPress={onSignOut}
            >
              <Text>Logout</Text>
            </TouchableOpacity>
          )
        });
      }, [navigation])
  return (
    <View style={styles.container}>
      {peoples.map(({name,source,email},index) => {
        const isFirst  = index === 0;

        const dragHandlers = isFirst ? panResponder.panHandlers : {}

        return <Card key={name} name={name} source={source} email={email} isFirst={isFirst} {...dragHandlers} swipe={swipe} tiltSign={tiltSign}/>
        }).reverse()}
        <Footer  handleChoice={handleChoice} />
    </View>
    )
}
 //cree un formulaire pour conaitre les informations de l'utilisateur
