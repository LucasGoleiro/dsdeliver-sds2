import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, ScrollView, Image, Alert, View, Linking } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { confirmDelivery } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

type Props = {
    route: {
        params: {
            order: Order;
        }
    }
}

export default function OrderDetails({ route }: Props) {
    const { order } = route.params;
    const navigation = useNavigation();

    const handleOnCancel = () => {
        navigation.navigate('Orders')
    }

    const handleConfirmDelivery = () => {
        confirmDelivery(order.id)
            .then(() => {
                Alert.alert(`Pedido ${order.id} confirmado com sucesso !!!!!`)
                navigation.navigate('Orders')
            })
            .catch(() => {
                Alert.alert(`Erro ao confirmar pedido ${order.id}`)
            })
    }

    const handleStartNavigation = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`)
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <OrderCard order={order}/>
                <RectButton style={styles.button} onPress={handleStartNavigation}> 
                    <Text style={styles.buttonText}>Iniciar navegação</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleConfirmDelivery}> 
                    <Text style={styles.buttonText}>Confirmar entrega</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleOnCancel}> 
                    <Text style={styles.buttonText}>Cancelar</Text>
                </RectButton>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
      },
      button: {
        backgroundColor: '#DA5C5C',
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonText: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 50,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFF',
        letterSpacing: -0.24,
        fontFamily: 'OpenSans_700Bold'
      }
});
