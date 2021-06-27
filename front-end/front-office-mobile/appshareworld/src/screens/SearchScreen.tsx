import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, ListRenderItem, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../components/Styles';
import NsPropsType from '../routes/propsType';
import NsCategory from '../models/NsCategory';
import { categoryService } from '../services/categoryService';


const SearchScreen: React.FC<NsPropsType.SearchProps> = ({ navigation, route }: NsPropsType.SearchProps) => {

    const [errorFound, setErrorFound] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const [categories, setCategories] = useState<NsCategory.ICategory[]>([]);
    useEffect(() => {

        const refresh = async (): Promise<void> => {

            try {

                const data = await categoryService.getCategories();
                setCategories(data);

                if (!data) {
                    setErrorFound(true);
                }
                if (data.length == 0) {
                    setTimeout(function () { setErrorFound(true); }, 3000);
                }

            } catch (error) {
                console.log('Error', error.message);
                setErrorFound(true);
            }
        };

        refresh();

    }, []);
    /* const { data, error } = useFetchCategories();

    if (error) {
        console.log(error)
        setErrorFound(true);
    } */

    const CategoryComponent: ListRenderItem<NsCategory.ICategory> = ({ item }) => (
        <TouchableHighlight key={item.id}
            style={styles.itemContainerStyle}
            onPress={() => navigation.navigate('SearchListScreen', {
                categoryId: item.id,
                categoryLabel: item.label
            }
            )}
        >
            <View>
                {(item.image_url)
                    ?
                    <Image style={styles.imageStyle} source={{ uri: item.image_url }} />
                    :
                    <Image style={styles.imageStyle} source={require('../assets/logo.png')} />
                }
                <Text style={styles.labelCategoryStyle}>{item.label} </Text>
            </View>

        </TouchableHighlight>
    );
    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <Ionicons name="search" size={24} color={COLORS.secondary} />
                <TextInput style={styles.searchInput}
                    inlineImageLeft='search_icon'
                    onFocus={() => navigation.navigate('SearchListScreen', {
                        categoryId: undefined,
                        categoryLabel: undefined
                    })}
                    placeholder='Rechercher un don' />
            </View>

            <View style={styles.containerListOffers}>

                {(categories && categories?.length > 0) ?
                    <FlatList
                        data={categories}
                        renderItem={CategoryComponent}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
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
        backgroundColor: '#fff',
    },
    containerListOffers: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: '#e9383f',
        fontSize: 15
    },
    searchView: {
        padding: 10,
        paddingTop: 20,
        flex: 0.1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        elevation: 2
    },
    searchInput: {
        borderColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 10,
        height: 35,
        width: 300,
        marginLeft: 10,
        /*  placeholderTextColor: COLORS.secondary,
         selectionColor: COLORS.secondary, */
        color: COLORS.secondary,
        paddingHorizontal: 10
    },
    imageStyle: {
        width: 170,
        height: 145,
    },
    itemContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    labelCategoryStyle: {
        color: COLORS.primary,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default SearchScreen;

