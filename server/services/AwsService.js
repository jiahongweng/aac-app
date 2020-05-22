import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

class AwsService {
  static uploadFileToS3Bucket(params) {
    return new Promise((resolve, reject) => {
      s3.upload(params, (error, data) => {
        if (error) {
          return reject(error);
        }

        console.log(`File uploaded successfully at ${data.Location}`);

        return resolve(data);
      });
    });
  }
}

export default AwsService;
