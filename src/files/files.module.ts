import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferredFile } from './entities/file.entity';
import { s3ClientProvider } from 'src/aws/s3-client.provider';

@Module({
  imports: [TypeOrmModule.forFeature([TransferredFile])],
  controllers: [FilesController],
  providers: [FilesService, s3ClientProvider],
})
export class FilesModule {}
