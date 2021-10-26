import React from 'react';
import { View } from 'react-native';

import { styles } from './styles'

type Props = {
    isCentered?: boolean;
}

export function ListDiveder({isCentered}: Props) {
    return (
        <View 
            style={[styles.container,
            isCentered ? {marginVertical: 12,} : {marginBottom: 31, marginTop: 2}]} 
        />
    )
}
