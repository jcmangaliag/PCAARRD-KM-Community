'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function filename(req, file, cb) {
        cb(null, file.originalname.replace(/\.[^/.]+$/, "") + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var fileUpload = (0, _multer2.default)({
    storage: storage,
    limits: { fileSize: 20000000 }
}).single('sharedUploadFiles');

exports.default = fileUpload;