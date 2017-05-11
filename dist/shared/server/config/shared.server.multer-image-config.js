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

var imageFilter = function imageFilter(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only jpg, jpeg, png, gif image files are allowed!'), false);
    }
    cb(null, true);
};

var imageUpload = (0, _multer2.default)({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: imageFilter
}).single('sharedUploadPhoto');

exports.default = imageUpload;