import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '../../hooks/auth';

import  IllustrationImg  from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { styles } from './styles'
import { theme } from '../../global/styles/theme';

export function Signin() {
    const { loading ,user, signin } = useAuth();
    
 
    async function handlerSignin(){
        try {
            await  signin();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao realizar o login');
        }
    }

    return (
        <Background>
            <View style={styles.container}>
            
                <Image 
                source={ IllustrationImg } 
                style={styles.image} 
                resizeMode="stretch"
                />

                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se{'\n'}
                        e organize suas{'\n'}
                        jogatinas
                    </Text>
                    <Text style={styles.subTitle}>
                        Crie grupos para jogar seus games{'\n'}
                        favoritos com seus amigos
                    </Text>

                    {
                        loading ? <ActivityIndicator color={theme.colors.primary} /> :
                        <ButtonIcon 
                        title="Entrar com Discord"
                        onPress={handlerSignin}
                        />
                     }

                </View>
            </View>
        </Background>
  )
}



