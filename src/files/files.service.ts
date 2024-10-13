import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferredFile } from './entities/file.entity';
import { getParams } from 'src/aws/s3-upload.params';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Response } from 'express';

@Injectable()
export class FilesService {
  constructor(
    @Inject('S3_CLIENT') private s3,
    @InjectRepository(TransferredFile)
    private fileRepository: Repository<TransferredFile>,
  ) {}

  async upload(file: Express.Multer.File) {
    const fileRecord = this.fileRepository.create({
      originalFileName: file.originalname,
    });
    const awsFile = await this.fileRepository.save(fileRecord);
    awsFile.awsFileName = awsFile.id + '-' + file.originalname;

    try {
      await this.s3.send(
        new PutObjectCommand(getParams(awsFile.awsFileName, file)),
      );

      awsFile.link = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${awsFile.awsFileName}`;
      await this.fileRepository.save(awsFile);

      return awsFile.link;
    } catch (error) {
      throw new BadRequestException(
        `Failed to upload ${file.originalname} to S3:`,
        error,
      );
    }
  }

  async getFile(id: number, res: Response) {
    const awsFile = await this.fileRepository.findOneBy({ id });
    if (!awsFile) {
      throw new NotFoundException(`File with id ${id} is not found`);
    }
    try {
      const s3Response = (
        await this.s3.send(new GetObjectCommand(getParams(awsFile.awsFileName)))
      ).Body as Readable;

      s3Response.pipe(
        res.set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${awsFile.originalFileName}"`,
        }),
      );
    } catch (error) {
      throw new BadRequestException(
        `Error retrieving file ${awsFile.awsFileName} from S3: ${error.message}`,
      );
    }
  }
}
