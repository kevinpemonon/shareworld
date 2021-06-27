import { StackScreenProps } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

declare namespace NsPropsType {

    export type NavigatorSearchStackParamList = {
        SearchScreen: NavigatorScreenParams<SearchProps>;
        SearchListScreen: {
            categoryId?: number,
            categoryLabel?: string
        };
    };
    export type SearchProps = StackScreenProps<
        NavigatorSearchStackParamList,
        'SearchListScreen'
    >;

    export type NavigatorProfiletackParamList = {
        MyDonnationsScreen: undefined;
        ProfileScreen: undefined;
    };

    export type NavigatorCreateStackParamList = {
        AddScreen: undefined;
        ProfileScreen: NavigatorScreenParams<NavigatorProfiletackParamList>;
    };

    export type CreateProps = StackScreenProps<
        NavigatorCreateStackParamList,
        'AddScreen'
    >;
}

export default NsPropsType;