import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { v4 } from 'uuid';
import NsPropsType from '../routes/propsType';
import Modal from 'modal-enhanced-react-native-web';

import { COLORS } from '../components/Styles';
import NsOffer from '../models/NsOffer';
import NsCategory from '../models/NsCategory';
import NsAddress from '../models/NsAddress';
import NsUser from '../models/NsUser';
import NsGeo from '../models/NsGeo';
import AddressModalContent from '../components/AddressModalContent';
import CategoriesModalContent from '../components/CategoriesModalContent';
import StateModalContent from '../components/StateModalContent';
import { offerService } from '../services/offerService';


interface IPicture {
    id: string;
    uri: string;
}

const AddScreen: React.FC<NsPropsType.CreateProps> = ({ navigation, route }) => {

    const [modalChoice, setModalChoice] = useState(false);
    const [modalCategories, setModalCategories] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [modalAddress, setModalAddress] = useState(false);
    const [images, setImages] = useState<IPicture[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [offer, setOffer] = useState<NsOffer.IOfferDataIn>({ display_mail: false, display_phone: false } as NsOffer.IOfferDataIn);
    const [address, setAddress] = useState<NsAddress.IAddress>({} as NsAddress.IAddress);
    const [offerCategory, setOfferCategory] = useState('category');
    const [offerState, setOfferState] = useState('state');
    const [chooseAddress, setChooseAddress] = useState('Adresse');

    const [displayPhone, setDisplayPhone] = useState('Non');
    const [displayMail, setDisplayMail] = useState('Non');


    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        } else {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            console.log(result);

            /* Insert the picture in the array */
            if (!result.cancelled) {
                setImages([...images, {
                    id: v4(),
                    uri: result.uri
                }]);
            }

            /* Hide the access to galery ou camera */
            setModalChoice(false);
            if (images.length > 1) {
                setModalChoice(false);
            }
        }
    };

    const pickFromCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        } else {

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            /* Insert the picture in the array */
            if (!result.cancelled) {
                setImages([...images, {
                    id: v4(),
                    uri: result.uri
                }]);
            }

            /* Hide the access to galery ou camera */
            if (images.length > 1) {
                setModalChoice(false);
            }
        }
    };

    /* Delete Picture */
    const handleDeletePicture = (id: string) => {
        const newList = images.filter((item) => item.id !== id);
        setImages(newList);
    }

    const handleTitle = (text: string) => {
        const newOffer: NsOffer.IOfferDataIn = offer;
        newOffer.label = text;
        setOffer(newOffer);
        setTitle(text);
    };

    const handleDescription = (text: string) => {
        const newOffer: NsOffer.IOfferDataIn = offer;
        newOffer.description = text;
        setOffer(newOffer);
        setDescription(text);
    };

    const handleState = (offerState: string) => {
        setOfferState(offerState);
        const newOffer: NsOffer.IOfferDataIn = offer;
        newOffer.state = offerState;
        setOffer(newOffer);
        setModalState(false);
    }

    const handleCategory = (c: NsCategory.ICategory) => {
        const newOffer: NsOffer.IOfferDataIn = offer;
        newOffer.category = c.id;
        setOffer(newOffer);
        setOfferCategory(c.label);
        setModalCategories(false);
    }

    const handleAddress = (a: NsGeo.IGeocodage) => {

        if (a.properties.housenumber) {
            setModalAddress(false);
            setAddress({
                city: a.properties.city,
                number: a.properties.housenumber,
                street: a.properties.street,
                zipcode: a.properties.postcode,
                complement: a.properties.context,
                latitude: a.geometry.coordinates[1],
                longitude: a.geometry.coordinates[0],
            });

            setChooseAddress(a.properties.label);

            const newOffer: NsOffer.IOfferDataIn = offer;
            newOffer.exchange_address = {
                city: a.properties.city,
                number: a.properties.housenumber,
                street: a.properties.street,
                zipcode: a.properties.postcode,
                complement: a.properties.context,
                latitude: a.geometry.coordinates[1],
                longitude: a.geometry.coordinates[0],
            }
            newOffer.is_owner_address = false;
            setOffer(newOffer);
        }

    }

    const ModalPicture = () => (
        <Modal
            isVisible={modalChoice}
            onBackdropPress={() => setModalChoice(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}>
            <View style={styles.modalViewChoice}>
                <View style={styles.viewAllButtons}>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => pickFromCamera()}
                    >
                        <View style={styles.viewButtons}>
                            <Ionicons name="camera-outline" size={24} color='#fff' />
                            <Text style={styles.textStyle}>Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => pickFromGallery()}
                    >
                        <View style={styles.viewButtons}>
                            <Ionicons name="images-outline" size={24} color='#fff' />
                            <Text style={styles.textStyle}>Galerie</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, marginBottom: 20, paddingHorizontal: 25 }}>
                    <TouchableOpacity style={styles.buttons} onPress={() => setModalChoice(false)}>
                        <View style={styles.viewButtons}>
                            <Text style={{ ...styles.textStyle, fontWeight: 'bold', fontSize: 20, color: COLORS.secondary }}>Fermer</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const ModalCategories = () => (
        <Modal
            isVisible={modalCategories}
            onBackdropPress={() => setModalCategories(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}>
            <View style={styles.modalViewOptions} >
                <Text style={styles.titleModal}>Catégories</Text>

                <CategoriesModalContent getCategory={(c) => handleCategory(c)} />

            </View>
        </Modal>
    );

    const ModalState = () => (
        <Modal
            isVisible={modalState}
            onBackdropPress={() => setModalState(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}>
            <View style={styles.modalViewOptions}>
                <Text style={styles.titleModal}>État</Text>
                <StateModalContent getState={(s) => handleState(s)} />
            </View>
        </Modal >

    );

    const ModalAddress = () => (
        <Modal
            isVisible={modalAddress}
            onBackdropPress={() => setModalAddress(false)}
            style={{ margin: 0, justifyContent: 'flex-end' }}>
            <View style={{ flex: 1 }}>

                <View style={styles.modalAddressHeader}>
                    <Text style={{ fontSize: 20, color: COLORS.secondary, textAlign: 'center' }}>Localisation</Text>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalAddress(false)
                        }}>
                        <Text style={{ fontSize: 15, color: COLORS.secondary, textAlign: 'center' }}>
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalViewAdress}>

                    <AddressModalContent getAddress={(a) => handleAddress(a)} />

                </View>
            </View>
        </Modal >
    );

    const user: NsUser.IUserData = {} as NsUser.IUserData
    useEffect(() => {
        if (user.mail) {
            setAddress({
                id: user.address.id,
                city: user.address.city,
                number: user.address.number,
                street: user.address.street,
                zipcode: user.address.zipcode,
                complement: user.address.complement,
                latitude: user.address.latitude,
                longitude: user.address.longitude,
            });
            const newOffer: NsOffer.IOfferDataIn = offer;
            newOffer.is_owner_address = true;
            setOffer(newOffer);

        }
        /*  return () => {
             cleanup
         } */
    }, []);

    const validateForm = (): Boolean => {

        const {
            label,
            state,
            images,
            category,
        } = offer;

        if (images.length == 0) {
            Alert.alert('Veuillez ajouter au moins une image!');
            return false;
        }
        if (!label || label.length == 0 || label == ' ') {
            Alert.alert('Veuillez remplir le champ titre');
            return false;
        }

        if (!state || state.length == 0 || state == ' ') {
            Alert.alert('Veuillez choisir un état!');
            return false;
        }
        if (!category) {
            Alert.alert('Veuillez choisir une catégorie!');
            return false;
        }

        return true;
    }

    /* Submit Offer */
    const handleSubmitOffer = async () => {

        let pictures = images.map((e) => {
            return e.uri
        });

        const newOffer: NsOffer.IOfferDataIn = offer;

        newOffer.images = pictures;
        newOffer.owner = 1; // id user owner
        newOffer.display_mail = (displayMail == 'Oui') ? true : false;
        newOffer.display_phone = (displayPhone == 'Oui') ? true : false;

        setOffer(newOffer);

        if (validateForm()) {

            console.log(offer);

            const result = await offerService.postOffer(offer);

            if (result !== null) {
                setImages([]);
                setOfferCategory('category');
                setOfferState('state');
                setChooseAddress('Adresse');
                setDisplayMail('Non');
                setDisplayPhone('Non');
                setTitle('');
                setDescription('');
                setAddress({} as NsAddress.IAddress);
                setOffer({} as NsOffer.IOfferDataIn);

                // Redirect to my Donnations
                navigation.navigate('ProfileScreen', {
                    screen: 'MyDonnationsScreen'
                });
            }
        }
    }

    return (
        <ScrollView style={styles.centeredView}
            showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 20, marginVertical: 3 }}>Photos</Text>

            <View style={styles.picturesList}>
                {images.length > 0 && images.map((item) => {
                    return (
                        <View key={item.id}>
                            <TouchableOpacity
                                onPress={() => handleDeletePicture(item.id)}
                                style={styles.deleteButton}
                                key={item.id}>
                                <Text style={styles.deleteText}>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.imagesStyle} />
                        </View>

                    );
                })}

                {images.length < 3 &&

                    <TouchableOpacity style={styles.photoButton}
                        activeOpacity={0.6}
                        onPress={() => setModalChoice(true)}>
                        <Ionicons name="camera" size={60} color="#8d99ae" />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ marginTop: 5 }}>

                <TextInput
                    style={styles.input}
                    onChangeText={handleTitle}
                    placeholder="Titre"
                    value={title}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={handleDescription}
                    placeholder="Description"
                    multiline
                    numberOfLines={4}
                    value={description}
                />
                <TouchableOpacity style={styles.buttonOpenModal} onPress={() => setModalCategories(true)}>
                    <View style={styles.viewOpenModalButtons}>
                        {offerCategory == 'category'
                            ? <Text style={{ fontSize: 20, color: COLORS.darkBlue }}>
                                Catégories
                            </Text>
                            :
                            <Text style={{ fontSize: 20, color: COLORS.primary }}>
                                {offerCategory}
                            </Text>
                        }
                        <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOpenModal} onPress={() => setModalState(true)}>
                    <View style={styles.viewOpenModalButtons}>
                        {offerState == 'state'
                            ? <Text style={{ fontSize: 20, color: COLORS.darkBlue }}>
                                Sélectionnez l'état de votre objet
                            </Text>
                            :
                            <Text style={{ fontSize: 20, color: COLORS.primary }}>
                                {offerState}
                            </Text>
                        }
                        <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.primary} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOpenModal} onPress={() => setModalAddress(true)}>
                    <View style={styles.viewOpenModalButtons}>
                        <View style={styles.viewOpenModalButtons}>
                            <Ionicons name="location" size={24} color={COLORS.primary} />
                            {address.city
                                ?
                                <Text style={{ fontSize: 20, color: COLORS.primary }}>
                                    {address.number} {address.street}, {address.city}
                                </Text>
                                :
                                <Text style={{ fontSize: 20, color: COLORS.darkBlue }}>
                                    {chooseAddress}
                                </Text>
                            }
                        </View>
                        <View>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.primary} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ marginVertical: 10, fontSize: 16 }}>Afficher mon téléphone</Text>
                    <TouchableOpacity
                        style={(displayPhone == 'Oui') ?
                            styles.toggleButtonsOn : styles.toggleButtonsOff
                        }
                        onPress={() => {
                            if (displayPhone == 'Oui') {
                                setDisplayPhone('Non')
                            } else {
                                setDisplayPhone('Oui');
                            }
                        }}
                    >
                        <View>
                            <Text style={(displayPhone == 'Oui') ? styles.toggleTextOn : styles.toggleTextOff}>{displayPhone}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }} >
                    <Text style={{ marginVertical: 10, fontSize: 16 }}>Afficher mon email</Text>
                    <TouchableOpacity
                        style={
                            (displayMail == 'Oui') ?
                                styles.toggleButtonsOn : styles.toggleButtonsOff
                        }
                        onPress={() => {
                            if (displayMail == 'Oui') {
                                setDisplayMail('Non')
                            } else {
                                setDisplayMail('Oui');
                            }
                        }}
                    >
                        <View>
                            <Text style={(displayMail == 'Oui') ? styles.toggleTextOn : styles.toggleTextOff}>{displayMail}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginBottom: 20, paddingHorizontal: 25 }}>
                <TouchableOpacity style={styles.buttons} onPress={() => {
                    handleSubmitOffer();

                }}>
                    <View style={styles.viewButtons}>
                        <Text style={{ ...styles.textStyle, fontWeight: 'bold', fontSize: 20, color: COLORS.secondary }}>CRÉER</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Modals */}
            <ModalPicture />
            <ModalCategories />
            <ModalState />
            <ModalAddress />
        </ScrollView >
    )
}


export default AddScreen;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.secondary
    },
    modalViewChoice: {
        backgroundColor: COLORS.secondary,
        flex: 0.5
    },
    photoButton: {
        width: 70,
        height: 85,
        borderWidth: 2,
        borderColor: COLORS.darkGrey,
        borderStyle: 'dotted',
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagesStyle: {
        width: 90,
        height: 100,
        borderRadius: 5,
        marginRight: 5,
    },
    buttons: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        marginTop: 15,
    },
    viewAllButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    viewOpenModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picturesList: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    deleteButton: {
        borderRadius: 25,
        borderColor: COLORS.primary,
        borderWidth: 1,
        position: 'absolute',
        top: -15,
        elevation: 2,
        alignSelf: 'flex-end',
        backgroundColor: COLORS.secondary,
        width: 25,
        zIndex: 1
    },
    deleteText: {
        padding: 3,
        color: COLORS.primary,
        textAlign: 'center'
    },
    textStyle: {
        color: COLORS.secondary,
        marginLeft: 3
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.darkGrey,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10
    },
    buttonOpenModal: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.darkGrey,
        padding: 5,
        borderRadius: 5,
        marginVertical: 10,
        borderWidth: 1,
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
    titleModal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    errorMsgStyle: {
        textAlign: 'center',
        color: COLORS.primary,
        fontSize: 15
    },
    modalViewOptions: {
        backgroundColor: COLORS.secondary,
        padding: 20,
        flex: 0.6
    },
    modalViewAdress: {
        backgroundColor: COLORS.secondary,
        padding: 20,
        flex: 1
    },
    modalAddressHeader: {
        backgroundColor: COLORS.primary,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    closeButton: {
        borderRadius: 50,
        width: 26,
        borderColor: COLORS.secondary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleButtonsOff: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        marginTop: 15,
        width: 50,
    },
    toggleButtonsOn: {
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        marginTop: 15,
        width: 50,
    },
    toggleTextOn: {
        color: COLORS.secondary,
        textAlign: 'center'
    },
    toggleTextOff: {
        color: COLORS.primary,
        textAlign: 'center'
    },
});