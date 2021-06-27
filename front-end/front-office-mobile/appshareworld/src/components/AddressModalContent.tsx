import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ListRenderItem, ActivityIndicator } from 'react-native';

import NsGeo from '../models/NsGeo';
import { COLORS } from './Styles';
import { geoService } from '../services/geoService';

interface Props {
    getAddress: (param: NsGeo.IGeocodage) => void
}

const AddressModalContent: React.FC<Props> = ({ getAddress }) => {

    const [geocodageResult, setGeocodageResult] = useState<NsGeo.IGeocodage[]>([]);
    const [errorFound, setErrorFound] = useState(false);

    const handleAddress = async (searchString: string) => {
        setGeocodageResult([]);
        try {

            setErrorFound(false);
            if (searchString.length > 3) {
                let result = await geoService.geocodage(searchString);
                setGeocodageResult(result);
            }

        } catch (error) {
            console.log(error);
            setErrorFound(true);
        }
    }

    const RenderAddressItem: ListRenderItem<NsGeo.IGeocodage> = ({ item }) => (
        < TouchableOpacity key={[item.properties.id, item.properties.importance].toString()}
            style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.darkGrey }}
            onPress={() => {
                getAddress(item);
            }}
        >
            <View>
                <Text>{item.properties.label} </Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => handleAddress(e)}
                    placeholder="Rechercher une adresse"
                />
            </View>
            <View>
                {(geocodageResult && geocodageResult?.length > 0) ?
                    <FlatList
                        data={geocodageResult}
                        renderItem={RenderAddressItem}
                        keyExtractor={(item) => [item.properties.id, item.properties.importance].toString()}
                        numColumns={1}
                        showsHorizontalScrollIndicator={false}
                    />
                    :
                    <View style={{ justifyContent: 'center', flex: 0.5 }} >
                        {errorFound &&
                            <View >
                                <Text style={styles.errorMsgStyle}>
                                    Pardon!
                                </Text>
                                <Text style={styles.errorMsgStyle}>
                                    Pour le moment, nous ne pouvons pas rechercher l'adresse.
                                </Text>
                                <Text style={styles.errorMsgStyle}>
                                    Essayez plus tard !
                                </Text>
                            </View>
                        }
                    </View>

                }
            </View>
        </View >
    );
}



export default AddressModalContent;
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.darkGrey,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: COLORS.primary,
        fontSize: 15
    },
});