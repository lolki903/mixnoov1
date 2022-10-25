import React from "react";
import RoundButton from "../RoundButton";
import { COLORS } from "../utils/constants";
import { View } from "react-native";
import { styles } from "./styles";

export default function Footer() {
    return (
        <View style={styles.container}>
            <RoundButton name="times" size={30} color= {COLORS.nope} />
            <RoundButton name="heart" size={30} color= {COLORS.like} />
        </View>
    );
    }