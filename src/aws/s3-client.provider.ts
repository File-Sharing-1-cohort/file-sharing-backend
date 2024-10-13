import { S3Client } from '@aws-sdk/client-s3';

export const s3ClientProvider = {
  provide: 'S3_CLIENT',
  useFactory: () => {
    return new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  },
};