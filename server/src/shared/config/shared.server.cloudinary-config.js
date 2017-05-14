import cloudinary from 'cloudinary';
import env from 'node-env-file';

env(`${__dirname} /../../../../.env`);

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API, 
  api_secret: process.env.CLOUDINARY_SECRET 
});

export default cloudinary;