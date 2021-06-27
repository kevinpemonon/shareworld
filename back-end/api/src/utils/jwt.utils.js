// ? Necessary modules
const JWT = require('jsonwebtoken');
const createError = require('http-errors');


const secret = process.env.JWT_ACCESS;
const secret_refresh = process.env.JWT_REFRESH;

module.exports = {
   signAccessToken: function(userId){
     return new Promise((resolve, reject) =>{
       const payload = {};
       const options = {
         expiresIn: '1h',
         issuer: 'localhost',
         audience: userId.toString(),
       }
       JWT.sign(payload,secret, options,(err, token)=>{
         if(err){
           return reject(err);
         }
         return resolve(token);
       })
     })

   },
   signRefreshToken: function(userId){
    return new Promise((resolve, reject) =>{
      const payload = {};
      const options = {
        expiresIn: '1m',
        issuer: 'localhost',
        audience: userId.toString(),
      }
      JWT.sign(payload,secret_refresh, options,(err, token)=>{
        if(err){
          return reject(err);
        }
        return resolve(token);
      })
    })

  },
   verifyAccessToken: function(req, res, next){

     if(!req.headers['authorization']){
       return next(createError.Unauthorized());
     }
     const authHeader = req.headers['authorization'];
     const bearerToken = authHeader.split(' ');
     const token = bearerToken[1];

     JWT.verify(token, secret, (err, payload) =>{
       if(err){
         return next(createError.Unauthorized(err.message))
       }
       res.payload = payload;
       next();
     } )

   },
   verifyRefreshToken: function(refreshToken){
     return new Promise((resolve, reject)=>{
       JWT.verify(refreshToken, secret_refresh, (err, payload)=>{
         if(err){
           return reject(createError.Unauthorized());
         }
         const userId = payload.aud;
         return resolve(userId);
       })
     })
   }
  
  }
  