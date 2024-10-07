import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('S3_CLIENT') private s3: S3,
  ) {}

  async getLogo(name: string): Promise<any> {
    const params = {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: name,
    };
    try {
      const data = await this.s3.getObject(params).promise();
      return data.Body;
    } catch (error) {
      throw new Error(`Error fetching logo from S3: ${error}`);
    }
  }
}
