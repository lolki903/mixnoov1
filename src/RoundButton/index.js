import React, { useCallback, useRef } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import {FontAwesome} from "@expo/vector-icons"
import { View } from "react-native"
import { styles } from "./styles"
export default function RoundButton({name, size , color}) {

    const scale = useRef(new Animated.Value(1)).current;
    const animateScale = useCallback((newValue) => {
        Animated.spring(scale, {
            toValue: newValue,
            friction: 3,
            useNativeDriver: true,
            
            }).start()},
            [scale],);
    
    return <TouchableWithoutFeedback onPressIn={()=> animateScale(0.8)} onPressOut={()=> animateScale(1)} delayPressIn={0} delayPressOut={110}>
        <Animated.View style={[styles.container, {transform: [{scale}]}]}>
            <FontAwesome name={name} size={size} color={color} />
        </Animated.View>
    </TouchableWithoutFeedback>
    }