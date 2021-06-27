// ? Necessary Modules
const bcrypt = require('bcrypt');

const {addUserService, updateUserService, deleteUserService, loginUserService} = require('../services/AuthService');

// const asyncLib  = require('async');

// ? Regex for Password and Email

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;


// ? All Users Routes

module.exports = {

  // ? register step
  register: async function (req, res) {

    // ? Address Parameters
    const { street, city, zipcode, complement, number, latitude, longitude } = req.body;
    // ? Parameters
    const {
      first_name,
      last_name,
      credit,
      mail,
      password,
      status
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    bcrypt.hash(password, salt, async (err, encrypted) => {
      const password_hash = encrypted;
      console.log(password_hash);
      if (err) {
        res.status(400).json({ "error": 'bcrypt error' });
      }
      if (first_name == null || last_name == null || mail == null || password_hash == null) {
        return res.status(400).json({ "error": 'Champs Obligatoire manquants' });
      }
  
      if (first_name.length >= 12 || first_name.length <= 4) {
        return res.status(400).json({ 'error': 'Prénom entre 4 et 12 caractères' });
      }
      if (last_name.length >= 12 || last_name.length <= 4) {
        return res.status(400).json({ 'error': 'Nom entre 4 et 12 caractères' });
      }
      // ? verify email, password 
  
      if (!EMAIL_REGEX.test(mail)) {
        return res.status(400).json({ 'error': "email n'est pas valide" });
      }
  
      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'mot de passe de 4 à 8 caractères' });
      }

      const result = await addUserService(
        street, city, zipcode, complement, number, latitude, longitude,
        first_name, last_name, credit, mail, password_hash, status
      );
      res.status(result[0]).json(result[1]);
  })
},

  updateUser: function (req, res, next) {

    const {
      first_name,
      last_name,
      credit,
      mail,
      password_hash,
      status,
      userId,
      address_id,
    } = req.body;

    const { street, city, zipcode, complement, number, latitude, longitude } = req.body;

    const result = updateUserService(
      first_name, last_name, credit, mail,
      password_hash, status, userId, address_id,
      street, city, zipcode, complement, number,
      latitude, longitude);
    res.status(result[0]).json(result[1]);
  },

  deleteUser: async function (req, res) {
    const { userId } = req.body;
  
      const result = await deleteUserService(userId);
      res.status(result[0]).json(result[1]);
  },

  // ? login step

  login: async function (req, res) {
    console.log(`AuthController: login -> start`)
    // ? Check Only Parameters Mail and password
    const { mail, password } = req.body;

    if (mail == null || password == null) {
      return res.status(400).json({ 'error': 'informations manquantes' });
    }



    // ? verify mail exist
    const result = await loginUserService(mail, password);
    console.table(result);
    res.status(result[0]).json(result[1]);
   
  },

}