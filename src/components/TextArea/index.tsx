import React from "react";
import { TextInputProps, TextInput } from 'react-native';

import { styles } from './styles'

export function TextArea({...rest}: TextInputProps) {
    return (
        <TextInput
            style={styles.container}
            {...rest}
        />
    )
}