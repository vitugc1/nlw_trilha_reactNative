import React, { useState } from "react";
import { View, FlatList, Text } from 'react-native'

import { CategorySelect } from '../../components/CategorySelect'
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListHeader } from "../../components/ListHeader";
import { Appointement } from "../../components/Appointments";
import { ListDiveder } from "../../components/ListDiveder";
import { styles } from './styles'

export function Home() {
    const [category, setCategory] = useState('');

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challender sem perder uma partida md10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: 'É hoje que vamos chegar ao challender sem perder uma partida md10'
        }
    ]

    function handlecCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    return (
        <View>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>

            
            <CategorySelect
            categorySelected={category}
            setCategory={handlecCategorySelect}
            />
            
            <View style={styles.content}>
                <ListHeader
                title="Partidas agendadas"
                subtitle="Total 6"
                />
                <FlatList 
                data={appointments}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Appointement data={item} />
                    
                )}
                ItemSeparatorComponent={() => <ListDiveder />}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}