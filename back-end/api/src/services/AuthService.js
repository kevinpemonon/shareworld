// ? Necessary Modules
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Address = require('../models/Address');
const { signAccessToken, signRefreshToken } = require('../utils/jwt.utils');


module.exports = {
    //! code comment
    addUserService: function (
        street, city, zipcode, complement, number, latitude, longitude,
        first_name, last_name, credit, mail, password_hash, status
    ) 
    {
        // return ([500, { 'error': "Working in progress" }]);
        return new Promise((resolve, reject) => {
        User.findOne({
            where: {
                mail: mail,
            }
        })
            // ? Register check if user exist
            .then(function (userFound) {
                if (userFound) {
                    return resolve([200, { "msg": 'userFound' }])
                }
                // ? create new User
                if (userFound === null) {

                    Address.create({
                        street: street,
                        city: city,
                        zipcode: zipcode,
                        complement: complement,
                        number: number,
                        latitude: latitude,
                        longitude: longitude,
                    })
                        .then(function (newAddress) {
                            User.create({
                                first_name: first_name,
                                last_name: last_name,
                                mail: mail,
                                status: status,
                                credit: credit,
                                password_hash: password_hash,
                                address_id: newAddress.id,

                            })
                                .then(async function (newUser) {
                                    if (newUser) {
                                        const accessToken = await signAccessToken(newUser.id);
                                        const refreshToken = await signRefreshToken(newUser.id);

                                        return resolve([201, {
                                            'accessToken': accessToken,
                                            'refreshToken': refreshToken,
                                            'userId': newUser.id
                                        }]);
                                    } else {
                                        throw new Error({ 'error': "Nous ne pouvons ajouter l'ulisateur" })
                                    }
                                })
                                .catch(function (err) {
                                    return reject([500, err]);
                                    
                                })
                        })
                }
            })
        })

    },
    //! code comment
    updateUserService: function (
        first_name, last_name, credit, mail,
        password_hash, status, userId, address_id,
        street, city, zipcode, complement, number,
        latitude, longitude
    ) {
        // return resolve([200, { "msg": "Utilisateur mis à jour" }])
        return new Promise((resolve, reject) => {

            Address.update({
                street: street,
                city: city,
                zipcode: zipcode,
                complement: complement,
                number: number,
                latitude: latitude,
                longitude: longitude,
            }, {
                where: {
                    id: address_id,
                }
            }),
                User.update({
                    first_name: first_name,
                    last_name: last_name,
                    mail: mail,
                    status: status,
                    credit: credit,
                    password_hash: password_hash,
                    address_id: address_id,
                }, {
                    where: {
                        id: userId,
                    }
                })
                    .then(function (userUpdate) {
                        return resolve([200, { "msg": "Utilisateur mis à jour" }])
                    })
                    .catch(function (err) {
                        return reject([500, { "error": "Impossible de modifier utilisateur" }])
                    })
            // return reject([500, {"error": "Promise error"}]);
        })
    },
    //! code comment
    deleteUserService: function (userId) {
        console.log(`Am here deleteUserService`)
        // return resolve([200, { "msg": "Utilisateur détruit" }])
        return new Promise((resolve, reject) => {
            User.destroy({
                where: {
                    id: userId,
                }
            })
                .then(function (delete_User) {
                    return resolve([200, { "msg": "Utilisateur détruit" }])
                })
                .catch(function (err) {
                    return reject([500, { "error": "Impossible d'effacer utilisateur" }])
                })
        })

    },
    loginUserService: function (mail, password) {
        console.log(`AuthService: LoginUserService-> mail: ${mail}, password: ${password}`);
        
        return new Promise((resolve, reject) => {
            try {
                
                User.findOne({
                    where: {
                        mail: mail,
    
                    }
                })
                .then(function (user) {
                    console.log('IN');
                        if (user) {
                            bcrypt.compare(password, user.password_hash, async (err, same) => {
                                if (err || !same) {
                                    return reject([500, { 'error': 'Unthorized' }]);
                                }
                                const accessToken = await signAccessToken(user.id);
                                const refreshToken = await signRefreshToken(user.id);
                                console.log(accessToken);
                                console.log(refreshToken);
                                const address = await Address.findOne({ where: { id: user.address_id } });
                                return resolve([200, {
                                    accessToken,
                                    refreshToken,
                                    user,
                                    address
                                }])
    
                            })
                        }
                        else {
                            throw new Error('Impossible de vérifier existence utilisateur')
                        }
                    })
                    .catch(function (err) {
                        return reject([500, { 'error': err }]);
                    });
            } catch (error) {
                return reject([500, { 'error': 'Impossible de vérifier existence utilisateur' }]);
            }
        })

    },
}
