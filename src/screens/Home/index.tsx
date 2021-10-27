import React, { useState, useCallback } from "react";
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CategorySelect } from '../../components/CategorySelect'
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListHeader } from "../../components/ListHeader";
import { Appointement, AppointmentProps } from "../../components/Appointments";
import { Load } from "../../components/Load";
import { Background } from '../../components/Background';
import { ListDiveder } from "../../components/ListDiveder";
import { styles } from './styles'
import { COLLECTION_APPOINTMENTS } from "../../configs/database";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation();


    function handlecCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(guildSelectd: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelectd })
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
        
        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        }else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

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
            
            {
                loading ? <Load /> :
                <>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`Total${appointments.length} partidas`}
                    />
           
                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointement 
                            data={item}
                            onPress={() => handleAppointmentDetails(item)}
                            />   
                        )}
                        ItemSeparatorComponent={() => <ListDiveder />}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 69}}
                    />
                </>
            }
        </Background>
    )
}