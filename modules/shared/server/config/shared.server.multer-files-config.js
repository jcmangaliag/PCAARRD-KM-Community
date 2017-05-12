import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.replace(/\.[^/.]+$/, "") + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

const fileUpload = multer({
    	storage,
    	limits: { fileSize: 20000000 }
	}).single('sharedUploadFiles');


export default fileUpload;