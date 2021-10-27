import React, { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { ImageBackground, Text, View, FlatList, Alert, Share , Platform } from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { api } from '../../services/api';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member, MemberProps } from '../../components/Member';
import { ListDiveder } from '../../components/ListDiveder';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';

import { styles} from './styles'
import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png'
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointments';

type Params = {
    guildSelectd: AppointmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const [loading, setLoading] = useState(true);
    const [widget, setWidget] =  useState<GuildWidget>({} as GuildWidget)
    const route = useRoute();
    const { guildSelectd } = route.params as Params;

    async function fetchGuildInfo() {
        try {
            const response = await api.get(`/guilds/${guildSelectd.guild.id}/widget.json`);
            setWidget(response.data);
            

        } catch {
            Alert.alert('Verefique as configurações do servidor, Será que o widget está habilitado?');
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios' ? 
        `junte-se a ${guildSelectd.guild.name}` 
        : widget.instant_invite;

        Share.share({
            message,
            url:  widget.instant_invite,
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite);
    }

    useEffect(() => {
        fetchGuildInfo()
    }, [])

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    guildSelectd.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
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
                        {guildSelectd.guild.name}
                    </Text>
                    <Text style={styles.subTitle}>
                        {guildSelectd.description}
                    </Text>
                </View>
            </ImageBackground>
        {
            loading ? <Load /> :
            <>
            <ListHeader
                title="Jogadores"
                subtitle={`Total ${widget.members.length}`}
            />
        
            <FlatList 
                data={widget.members}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Member data={item}/>
                )}
                ItemSeparatorComponent={() => <ListDiveder isCentered />}
                style={styles.members}
            />
            </>
        }
        {
            guildSelectd.guild.owner &&
            <View style={styles.footer}>
                <ButtonIcon
                    onPress={handleOpenGuild}
                    title="Entrar na partida"
                />
            </View>
        }
        </Background>
    )
}