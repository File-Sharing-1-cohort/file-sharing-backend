import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferredFile } from './entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransferredFile])],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
