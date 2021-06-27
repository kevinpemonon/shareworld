const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "uploads/offers"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "uploads/offers"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(12, (err, hash) => {
                if (err) cb(err);
                let format = file.mimetype.replace('image/', '');
                const fileName = `${new Date().getTime()}-${hash.toString('hex')}.${format}`;

                cb(null, fileName);
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error("Invalid file type"));
        }
    }
}
