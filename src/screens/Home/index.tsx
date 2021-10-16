import React, { useState } from "react";
import { View, FlatList, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import { CategorySelect } from '../../components/CategorySelect'
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListHeader } from "../../components/ListHeader";
import { Appointement } from "../../components/Appointments";

import { Background } from '../../components/Background';
import { ListDiveder } from "../../components/ListDiveder";
import { styles } from './styles'

export function Home() {
    const [category, setCategory] = useState('');

    const navigation = useNavigation();

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

    function handleAppointmentDetails() {
        navigation.navigate('AppointmentDetails')
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
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
                    <Appointement 
                        data={item}
                        onPress={handleAppointmentDetails}
                     />
                    
                )}
                ItemSeparatorComponent={() => <ListDiveder />}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                />
            </View>
        </Background>
    )
}