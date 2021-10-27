import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native'

import { ListDiveder } from "../../components/ListDiveder";
import { Guild, GuildProps } from "../../components/Guild";
import { Load } from "../../components/Load";
import { styles } from './styles'
import { api } from "../../services/api";

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users /@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    }, []);


    return (
        <View style={styles.container}>
            {
                loading ? <Load /> :
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
            }
        </View>
    )
}