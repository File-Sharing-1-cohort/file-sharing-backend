import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferredFile } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(TransferredFile)
    private fileRepository: Repository<TransferredFile>,
  ) {}

  async upload(data: Express.Multer.File) {
    const awsFile = this.fileRepository.create();
    awsFile.link = 'link to aws';
    awsFile.fileName = data.originalname;
    return await this.fileRepository.save(awsFile);
  }

  async getFile(id: number) {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException(`File with id ${id} is not found`);
    }
    return file;
  }
}
