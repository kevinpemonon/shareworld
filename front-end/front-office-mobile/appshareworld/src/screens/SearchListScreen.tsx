import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity, ScrollView, ListRenderItem } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import Modal from 'modal-enhanced-react-native-web';

import { offerService } from '../services/offerService';
import { categoryService } from '../services/categoryService';
import NsOffer from '../models/NsOffer';
import OfferComponent from '../components/OfferComponent';
import { COLORS } from '../components/Styles';
import NsPropsType from '../routes/propsType';
import NsCategory from '../models/NsCategory';
import { NumberHelper } from '../helpers/NumberHelper';

interface Coordinate {

    latitude?: number,
    longitude?: number,

}
const SearchListScreen: React.FC<NsPropsType.SearchProps> = ({ navigation, route }: NsPropsType.SearchProps) => {

    interface CategoryFilter {
        categoryType: string;
        categoryId: number;
    }
    interface SortFilter {
        sortBy: string;
        sortFilterLabel: string;
    }
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

            setConditions({
                ...conditions,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                distance: 20,
            });

            const coord = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
            //AsyncStorage
            storeData(coord);
        }
    }

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
                    distance: 20,
                });
            } else {
                // Request Permission
                hasPermission();
            }

        } catch (error) {
            console.log(error)
        }

    }

    const storeData = async (coord: Coordinate) => {
        try {
            const jsonValue = JSON.stringify(coord)
            await AsyncStorage.setItem('@coordinate', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const { categoryId, categoryLabel } = route.params;
    const [conditions, setConditions] = useState<NsOffer.IOfferConditionsParams>(
        {
            page_size: 10,
            page_number: 1,
            category: categoryId,
        }
    );

    const [offersData, setOffersData] = useState<NsOffer.IOfferData[]>([]);

    const [errorFound, setErrorFound] = useState(false);

    /* const [location, setLocation] = useState<LocationObject>(); */
    const [errorMsg, setErrorMsg] = useState('');

    const [numberPages, setNumberPages] = useState(0);

    const [search, setSearch] = useState(categoryLabel ? categoryLabel : '');

    const [isVisibleFilterModal, setIsVisibleFilterModal] = useState(false);

    const [chooseCategory, setChooseCategory] = useState<CategoryFilter>({} as CategoryFilter);
    const [offerCategoryFilter, setOfferCategoryFilter] = useState('Catégories');
    const [offerSort, setOfferSort] = useState<SortFilter>({
        sortBy: '',
        sortFilterLabel: 'Trier'
    });
    const [chooseState, setChooseState] = useState('État');
    const [offerStateFilter, setOfferStateFilter] = useState('État');
    const [chooseDistance, setChooseDistance] = useState(0);
    const [offerDistanceFilter, setOfferDistanceFilter] = useState('Distance');
    const [categories, setCategories] = useState<NsCategory.ICategory[]>([]);

    /*     const { data, error } = useFetchCategories();
    
        if (error) {
            console.log(error)
            setErrorFound(true);
        } */

    interface ModalContentType {
        type: 'sort' | 'category' | 'state' | 'distance'
    }
    const [modalContentType, setModalContentType] = useState<ModalContentType>({ type: 'category' });

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {

        const refreshCategories = async (): Promise<void> => {

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
        refreshCategories();

    }, []);

    useEffect(() => {

        const refresh = async (): Promise<void> => {

            try {

                const data = await offerService.getOffers(conditions);
                //   setOffersData(offersData.concat(data?.results?.offers));
                setOffersData(data?.results?.offers);
                setNumberPages(data.results.pagination?.total_pages ? data.results.pagination?.total_pages : 0);

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


    const handleSearch = (text: string) => {
        setSearch(text);

        if (text !== categoryLabel) {
            setOffersData([]);
            setConditions({ ...conditions, search: text, category: undefined })
        }

    }
    const RenderSwitch = (props: ModalContentType) => {
        switch (props.type) {
            case 'sort':
                return <SortModalContent />
                break;
            case 'distance':
                return <DistanceModalContent />
                break;
            case 'state':
                return <StateModalContent />
                break;
            case 'category':
                return <CategoryModalContent />
                break;
        }
    };

    const getCategoryFilter = (type: string, value: number) => {
        setChooseCategory({
            categoryId: value,
            categoryType: type
        });
    }
    const RenderCategoryItem: ListRenderItem<NsCategory.ICategory> = ({ item }) => (
        < TouchableOpacity key={item.id}
            style={styles.itemCategory}
            onPress={() => {
                getCategoryFilter(item.label, item.id);
            }}
        >
            <View>
                <Text>{item.label} </Text>
            </View>
            <View>
                {(chooseCategory.categoryId == item.id) &&
                    <Ionicons name="checkmark" size={24} color={COLORS.success} />
                }
            </View>
        </TouchableOpacity>
    );
    const CategoryModalContent = () => (
        <View>
            <Text style={styles.titleModal}>Catégories</Text>
            {(categories && categories?.length > 0) ?
                <FlatList
                    data={categories}
                    renderItem={RenderCategoryItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={1}
                    showsHorizontalScrollIndicator={false}
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

            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => {
                    setIsVisibleFilterModal(false);
                    getOfferCategory(chooseCategory)
                }}>
                <Text style={{ fontSize: 20, color: COLORS.secondary }}>
                    Appliquer
                </Text>
            </TouchableOpacity>
        </View>
    );

    const getOfferSort = (sortData: SortFilter) => {
        setOfferSort({
            sortBy: sortData.sortBy,
            sortFilterLabel: `Trier par ${sortData.sortBy}`
        });
        setConditions({
            ...conditions,
            sort_by: sortData.sortBy
        });
    }
    const getOfferCategory = (categoriesData: CategoryFilter) => {
        setOfferCategoryFilter(categoriesData.categoryType);
        setConditions({
            ...conditions,
            category: categoriesData.categoryId
        });
    }
    const getOfferState = (offerState: string) => {

        setOfferStateFilter(offerState);

        if (offerState == 'Tous') {
            setConditions({
                ...conditions,
                state: ['Comme neuf', 'Bon état', 'État Moyen', 'À bricoler']
            });
        } else {
            setConditions({
                ...conditions,
                state: [offerState]
            });
        }
    }

    const getOfferDistance = (nDistance: number) => {
        let result = `${NumberHelper.roundNumber(nDistance)} Km`
        setOfferDistanceFilter(result)
        setConditions({
            ...conditions,
            distance: nDistance
        });
    }

    const SortModalContent = () => (
        <View>
            <Text style={styles.titleModal}>Trier</Text>

            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setOfferSort({ sortBy: 'date', sortFilterLabel: 'Trier' })
                    }}
                >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <MaterialIcons name="update" size={24} color={COLORS.primary} />
                        <Text>Date</Text>

                    </View>
                    <View>
                        {(offerSort.sortBy == 'date') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View >
            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setOfferSort({ sortBy: 'distance', sortFilterLabel: 'Trier' })
                    }}
                >
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Ionicons name="location" size={24} color={COLORS.primary} />

                        <Text>Distance</Text>

                    </View>
                    <View>
                        {(offerSort.sortBy == 'distance') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View >
            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => {
                    getOfferSort(offerSort)
                    setIsVisibleFilterModal(false)
                }}>
                <Text style={{ fontSize: 20, color: COLORS.secondary }}>
                    Appliquer
                </Text>
            </TouchableOpacity>
        </View >
    );
    const StateModalContent = () => (
        <View>
            <Text style={styles.titleModal}>État</Text>

            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setChooseState('Comme neuf')
                    }}
                >
                    <View>
                        <Text>Comme neuf</Text>
                    </View>
                    <View>
                        {(chooseState == 'Comme neuf') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setChooseState('Bon état')
                    }}
                >
                    <View>
                        <Text>Bon état</Text>
                    </View>
                    <View>
                        {(chooseState == 'Bon état') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setChooseState('État Moyen')
                    }}
                >
                    <View>
                        <Text>État Moyen</Text>
                    </View>
                    <View>
                        {(chooseState == 'État Moyen') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setChooseState('À bricoler')
                    }}
                >
                    <View>
                        <Text>À bricoler</Text>
                    </View>
                    <View>
                        {(chooseState == 'À bricoler') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                < TouchableOpacity
                    style={styles.itemCategory}
                    onPress={() => {
                        setChooseState('Tous')
                    }}
                >
                    <View>
                        <Text>Tous</Text>
                    </View>
                    <View>
                        {(chooseState == 'Tous') &&
                            <Ionicons name="checkmark" size={24} color={COLORS.success} />
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => {
                    getOfferState(chooseState)
                    setIsVisibleFilterModal(false)
                }}>
                <Text style={{ fontSize: 20, color: COLORS.secondary }}>
                    Appliquer
                </Text>
            </TouchableOpacity>
        </View>
    );

    const DistanceModalContent = () => (
        <View>
            <Text style={styles.titleModal}>Distance</Text>
            <Slider
                style={{ width: 350, height: 40 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.darkGrey}
                onSlidingComplete={(value) => {
                    setChooseDistance(NumberHelper.roundNumber(value))
                }}
                value={NumberHelper.roundNumber(chooseDistance)}
            />
            <Text style={styles.offerDistanceLabel}>{chooseDistance} Km</Text>
            <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => {
                    setIsVisibleFilterModal(false)
                    getOfferDistance(chooseDistance)
                }}>
                <Text style={{ fontSize: 20, color: COLORS.secondary }}>
                    Appliquer
                </Text>
            </TouchableOpacity>
        </View >
    );
    const ModalFilters = () => (
        <Modal
            isVisible={isVisibleFilterModal}
            onBackdropPress={() => setIsVisibleFilterModal(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}
        >
            <View style={styles.modals}>
                <RenderSwitch type={modalContentType.type} />
            </View>
        </Modal>
    );

    /* Clean Filters */
    const clearFilters = () => {
        setOfferStateFilter('État');
        setOfferDistanceFilter('Distance');
        setOfferCategoryFilter('Catégories');
        setOfferSort({ sortBy: '', sortFilterLabel: 'Trier' });
        getData().then(() => {
            setConditions({
                latitude: conditions.latitude,
                longitude: conditions.longitude,
                distance: conditions.distance,
                page_size: 10,
                page_number: 1,
            });
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <Ionicons name="arrow-back" size={24} color={COLORS.secondary} onPress={() => navigation.goBack()} />
                <Ionicons name="search" size={24} color={COLORS.secondary} />
                <TextInput style={styles.searchInput}
                    onChangeText={(text) => handleSearch(text)}
                    defaultValue={search}
                    placeholder='Rechercher un don' />
            </View>
            {/* Filters */}
            <ScrollView horizontal={true}
                style={{ flex: 0.09, marginTop: 10 }}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.buttonsView}>

                    <TouchableOpacity
                        style={styles.buttonsFilter}
                        onPress={() => {
                            setModalContentType({ type: 'sort' });
                            setIsVisibleFilterModal(true)
                        }}>
                        <Text style={styles.buttonTextStyle}>{offerSort.sortFilterLabel}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonsFilter}
                        onPress={() => {
                            setModalContentType({ type: 'category' });
                            setIsVisibleFilterModal(true)
                        }}>
                        <Text style={styles.buttonTextStyle}>{offerCategoryFilter}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonsFilter}
                        onPress={() => {
                            setModalContentType({ type: 'state' });
                            setIsVisibleFilterModal(true)
                        }}>
                        <Text style={styles.buttonTextStyle}>{offerStateFilter}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonsFilter}
                        onPress={() => {
                            setModalContentType({ type: 'distance' });
                            setIsVisibleFilterModal(true)
                        }}>
                        <Text style={styles.buttonTextStyle}>{offerDistanceFilter}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color={COLORS.secondary} />
                    </TouchableOpacity>
                    {(offerStateFilter !== 'État' || offerDistanceFilter !== 'Distance' || offerCategoryFilter !== 'Catégories') &&

                        <TouchableOpacity
                            style={styles.buttonsFilter}
                            onPress={() => {
                                clearFilters();
                            }}>
                            <Text style={styles.buttonTextStyle}>Effacer</Text>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>

            {/* Offers */}
            <View style={styles.containerListOffers}>

                {(offersData && offersData.length > 0) ?
                    <FlatList
                        data={offersData}
                        renderItem={OfferComponent}
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

            {/* Modal filters */}
            <ModalFilters />
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
    titleContainerStyle: {
        backgroundColor: '#edf2f4',
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subTitleContainerStyle: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        elevation: 2
    },
    titleStyle: {
        color: '#e9383f',
        textAlignVertical: 'center',
        fontSize: 17,
        fontWeight: '900'
    },
    itemContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 180,
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: '#e9383f',
        fontSize: 15
    },
    searchView: {
        padding: 10,
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
        width: 290,
        marginHorizontal: 10,
        /*  placeholderTextColor: COLORS.secondary,
         selectionColor: COLORS.secondary, */
        color: COLORS.secondary,
        paddingHorizontal: 10
    },
    buttonsView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        width: 550,
    },
    buttonsFilter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        borderRadius: 6,
        width: 100,
        backgroundColor: COLORS.primary,
        padding: 5
    },
    buttonTextStyle: {
        color: COLORS.secondary
    },
    modals: {
        backgroundColor: COLORS.secondary,
        padding: 15,
    },
    buttonApply: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        borderRadius: 6,
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 5,
        marginVertical: 20
    },
    titleModal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemCategory: {
        backgroundColor: COLORS.lightGrey,
        padding: 5,
        marginVertical: 5,
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    offerDistanceLabel: {
        textAlign: 'center',
        fontWeight: '900'
    }
});

export default SearchListScreen;