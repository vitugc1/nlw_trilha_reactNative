import React from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';
import { ListDiveder } from '../../components/ListDiveder';
import { ButtonIcon } from '../../components/ButtonIcon';

import { styles} from './styles'
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Victor',
            avatar_url: 'https://github.com/vitugc1.png',
            status: 'online'
        },
        {
            id: '2',
            username: 'Victor',
            avatar_url: 'https://github.com/vitugc1.png',
            status: 'offline'
        }
    ]

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground 
                source={BannerImg} 
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>
                    <Text style={styles.subTitle}>
                        É hoje que vamos chegar ao challenger sem perder uma pardida da md10
                    </Text>
                </View>
            </ImageBackground>
            <ListHeader
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList 
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Member data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDiveder/>}
                style={styles.members}
            />

            <View style={styles.footer}>
                <ButtonIcon
                    title="Entrar na partida"
                />
            </View>
        </Background>
    )
}