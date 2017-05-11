'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sharedServerMulterFilesConfig = require('../config/shared.server.multer-files-config.js');

var _sharedServerMulterFilesConfig2 = _interopRequireDefault(_sharedServerMulterFilesConfig);

var _sharedServerMulterImageConfig = require('../config/shared.server.multer-image-config.js');

var _sharedServerMulterImageConfig2 = _interopRequireDefault(_sharedServerMulterImageConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sharedControls = {
    uploadFile: function uploadFile(req, res) {
        (0, _sharedServerMulterFilesConfig2.default)(req, res, function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({ success: false, message: 'File size is too large. Max limit is 20MB.' });
                } else {
                    res.json({ success: false, message: 'Unable to upload file.' });
                }
            } else {
                if (!req.file) {
                    res.json({ success: false, message: 'No file was selected.' });
                } else {
                    res.json({ success: true, message: 'File uploaded!', file: req.file });
                }
            }
        });
    },
    uploadImage: function uploadImage(req, res) {
        (0, _sharedServerMulterImageConfig2.default)(req, res, function (err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({ success: false, message: 'File size is too large. Max limit is 10MB.' });
                } else {
                    res.json({ success: false, message: 'Unable to upload photo.' });
                }
            } else {
                if (!req.file) {
                    res.json({ success: false, message: 'No photo was selected.' });
                } else {
                    res.json({ success: true, message: 'File uploaded!', image: req.file });
                }
            }
        });
    }
};

exports.default = sharedControls;