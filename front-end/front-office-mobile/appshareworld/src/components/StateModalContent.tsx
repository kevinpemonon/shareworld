import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ListRenderItem, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from './Styles';

interface State {
    state: string
}
interface Props {
    getState: (param: string) => void
}

const StateModalContent: React.FC<Props> = ({ getState }) => {

    const [chooseState, setChooseState] = useState<State>({ state: 'État' });


    const getStateFilter = () => {

        StateList();
    }

    const StateList = () => {
        return (
            <View>
                <View style={{ height: 200 }}>
                    <View>
                        < TouchableOpacity
                            style={styles.itemCategory}
                            onPress={() => {
                                setChooseState({ state: 'Comme neuf' })
                            }}
                        >
                            <View>
                                <Text >Comme neuf</Text>
                            </View>
                            <View>
                                {(chooseState.state == 'Comme neuf') &&
                                    <Ionicons name="checkmark" size={24} color={COLORS.success} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        < TouchableOpacity
                            style={styles.itemCategory}
                            onPress={() => {
                                setChooseState({ state: 'Bon état' });
                                getStateFilter();
                            }}
                        >
                            <View>
                                <Text style={styles.text}>Bon état</Text>
                            </View>
                            <View>
                                {(chooseState.state == 'Bon état') &&
                                    <Ionicons name="checkmark" size={24} color={COLORS.success} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        < TouchableOpacity
                            style={styles.itemCategory}
                            onPress={() => {
                                setChooseState({ state: 'État Moyen' }); getStateFilter();

                            }}
                        >
                            <View>
                                <Text style={styles.text}>État Moyen</Text>
                            </View>
                            <View>
                                {(chooseState.state == 'État Moyen') &&
                                    <Ionicons name="checkmark" size={24} color={COLORS.success} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        < TouchableOpacity
                            style={styles.itemCategory}
                            onPress={() => {
                                setChooseState({ state: 'À bricoler' }); getStateFilter();

                            }}
                        >
                            <View>
                                <Text style={styles.text}>À bricoler</Text>
                            </View>
                            <View>
                                {(chooseState.state == 'À bricoler') &&
                                    <Ionicons name="checkmark" size={24} color={COLORS.success} />
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity
                    style={styles.buttons}
                    onPress={() => {
                        getState(chooseState.state);
                    }}>
                    <Text style={{ fontSize: 20, color: COLORS.secondary, textAlign: 'center' }}>
                        Appliquer
                    </Text>
                </TouchableOpacity>

            </View >
        );
    }


    return (
        <View >
            <StateList />
        </View >
    );
}



export default StateModalContent;
const styles = StyleSheet.create({
    itemCategory: {
        padding: 5,
        marginVertical: 5,
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttons: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 15,
    },
    text: {
        fontSize: 18
    }
});