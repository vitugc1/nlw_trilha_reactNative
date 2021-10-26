import React from "react";
import { FlatList, View } from 'react-native'

import { ListDiveder } from "../../components/ListDiveder";
import { Guild, GuildProps } from "../../components/Guild";
import { styles } from './styles'

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '2',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        },
        {
            id: '3',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        }
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleGuildSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDiveder isCentered />}
                ListHeaderComponent={() => <ListDiveder isCentered />}
                style={styles.guilds}
                contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
            />
        </View>
    )
}