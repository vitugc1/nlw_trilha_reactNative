import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";
import DiscordPng from '../../assets/discord.png'

export function GuildIcon(){

    return (
        <Image 
        source={DiscordPng}
        style={styles.image}
        resizeMode="cover"
        />
    )
}