import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ListRenderItem, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from './Styles';
import NsCategory from '../models/NsCategory';
import { categoryService } from '../services/categoryService';

interface Props {
    getCategory: (param: NsCategory.ICategory) => void
}

const CategoriesModalContent: React.FC<Props> = ({ getCategory }) => {

    const [chooseCategory, setChooseCategory] = useState<NsCategory.ICategory>({} as NsCategory.ICategory); //Category

    const [categories, setCategories] = useState<NsCategory.ICategory[]>([]);
    const [errorFound, setErrorFound] = useState(false);
    const [count, setCount] = useState(0);

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

    }, [count]);

    const getCategoryFilter = () => {

        CategoryList();
    }

    const CategoryList = () => {
        return (
            <View>
                <View style={{ height: 370 }}>
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
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            }
                        </View>
                    }
                </View>
                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                        getCategory(chooseCategory);
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.secondary, textAlign: 'center' }}>
                        Appliquer rer
                    </Text>
                </TouchableOpacity>

            </View >
        );
    }


    const RenderCategoryItem: ListRenderItem<NsCategory.ICategory> = ({ item }) => {

        return (
            < TouchableOpacity key={item.id}
                style={styles.itemCategory}
                onPress={() => {
                    setChooseCategory({
                        id: item.id,
                        label: item.label,
                        image_url: item.image_url
                    });
                    getCategoryFilter();
                }}
            >
                <View>
                    <Text >{item.label} </Text>
                </View>

                <View>
                    {(chooseCategory.id == item.id) &&
                        <Ionicons name="checkmark" size={24} color={COLORS.success} />
                    }
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <View >
            <CategoryList />
        </View >
    );
}



export default CategoriesModalContent;
const styles = StyleSheet.create({
    itemCategory: {
        padding: 5,
        marginVertical: 5,
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: COLORS.primary,
        fontSize: 15
    },
    buttons: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 15,
    },
    text: {
        fontSize: 15
    }
});