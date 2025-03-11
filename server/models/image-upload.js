import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'de2b7a7kz',
    api_key: '892386119173385',
    api_secret: 'SsyZSUiRpsPE2VynEFfz5MSKRvg'
  });

export const uploadImage = async (file) => {
    console.log('file:', file);
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        }).end(file.buffer);
    });
};