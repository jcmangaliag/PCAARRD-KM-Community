import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.replace(/\.[^/.]+$/, "") + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

const imageFilter = (req, file, cb) => {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only jpg, jpeg, png, gif image files are allowed!'), false);
    }
    cb(null, true);
};

const imageUpload = multer({
    	storage,
    	limits: { fileSize: 10000000 }, /* max 10mb per file */
    	fileFilter: imageFilter
	}).single('sharedUploadPhoto');


export default imageUpload;