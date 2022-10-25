import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CARD } from '../utils/constants'


export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        marginTop:30,
        marginLeft:-187
    },
    image: {
        width:CARD.width,
        height:CARD.height,
        borderRadius: CARD.borderRadius,
        },
    name: {
        position: 'absolute',
        bottom:22   ,
        left: 20,
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        borderRadius: CARD.borderRadius,
    },
    choiceContainer: {
        position: 'absolute',
        top: 100,
    },
    likeContainer: {
        left: 45,
        transform: [{ rotate: '-30deg'}],
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: '30deg'}],
    },


})