import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Signin } from '../screens/Signin';
import { AppRoutes } from './app.routes';
import { useAuth } from '../hooks/auth';

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <Signin />}
        </NavigationContainer>
    )
}
