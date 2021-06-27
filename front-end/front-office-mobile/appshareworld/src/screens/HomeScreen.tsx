import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NsOffer from '../models/NsOffer';
import ListOfferComponent from '../components/ListOfferComponent';
import { offerService } from '../services/offerService';
import { COLORS } from '../components/Styles';


interface Coordinate {

    latitude?: number,
    longitude?: number,

}

const HomeScreen: React.FC = () => {

    const [offersData, setOffersData] = useState<NsOffer.IOfferData[]>([]);


    const storeData = async (coord: Coordinate) => {
        try {
            const jsonValue = JSON.stringify(coord)
            await AsyncStorage.setItem('@coordinate', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }
    const [conditions, setConditions] = useState<NsOffer.IOfferConditionsParams>(
        {
            // days: 50,
            days: 100,
            page_size: 10,
            page_number: 1,
            distance: 20,
            sort_by: 'date'
        }
    );
        
    const [errorFound, setErrorFound] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const getData = async (): Promise<void> => {

            try {
                const jsonValue = await AsyncStorage.getItem('@coordinate');
                var coords: Coordinate = {};
                if (jsonValue != null) {
                    coords = JSON.parse(jsonValue);
                }

                if (coords.latitude !== undefined) {

                    setConditions({
                        ...conditions,
                        latitude: coords?.latitude,
                        longitude: coords?.longitude,
                    });
                } else {
                    // Request Permission
                    hasPermission();
                }

            } catch (error) {
                console.log(error)
            }

        }
        getData();


    }, []);

    useEffect(() => {

        const refresh = async (): Promise<void> => {

            try {

                const data = await offerService.getOffers(conditions);
                setOffersData(data?.results?.offers);

                if (!data.results) {
                    setErrorFound(true);
                }
                if (data?.results?.offers.length == 0) {
                    setTimeout(function () { setErrorFound(true); }, 3000);
                }

            } catch (error) {
                console.log('Error', error.message);
                setErrorFound(true);
            }
        };
        refresh();

    }, [conditions]);


    const hasPermission = async () => {

        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (errorMsg) {
            console.log(errorMsg);

        } else if (location) {
            //  setLocation(location);
            setConditions({
                ...conditions,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            const coord = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
            console.log('request location')
            //AsyncStorage
            storeData(coord);
        }
    }
   
    

    return (
        <View style={styles.container}>

            <View style={styles.titleContainerStyle}>
                <Text style={styles.titleStyle} >Donnez une seconde vie à vos objets</Text>
            </View>
            <View style={styles.subTitleContainerStyle}>
                <Text style={{ ...styles.titleStyle, fontWeight: '700', color: '#e9383f', fontSize: 15 }} >
                    Donner du bonheur ou s'en procurer,
                </Text>
                <Text style={{ ...styles.titleStyle, fontWeight: '700', color: '#e9383f', fontSize: 15 }} >
                    ShareWorld permet de les concilier.
                </Text>
            </View>
            <View style={styles.containerListOffers}>

                {(offersData && offersData.length > 0) ?
                    <ListOfferComponent {...offersData} />
                    :
                    <View style={{ justifyContent: 'center', flex: 0.5 }} >
                        {errorFound ?
                            <View >
                                <Text style={styles.errorMsgStyle}>
                                    Pardon!
                                </Text>
                                <Text style={styles.errorMsgStyle}>
                                    Pour le moment, nous ne pouvons pas partager le monde avec vous.
                                </Text>
                                <Text style={styles.errorMsgStyle}>
                                    Essayez plus tard !
                                </Text>
                            </View>
                            :
                            <ActivityIndicator size="large" color="#e9383f" />
                        }
                    </View>
                }

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    containerListOffers: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        padding: 10
    },
    titleContainerStyle: {
        backgroundColor: COLORS.lightGrey,
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subTitleContainerStyle: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    titleStyle: {
        color: COLORS.primary,
        textAlignVertical: 'center',
        fontSize: 17,
        fontWeight: '900'
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: COLORS.primary,
        fontSize: 15
    }
});

export default HomeScreen;
