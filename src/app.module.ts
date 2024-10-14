import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptionst } from './database/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { s3ClientProvider } from './aws/s3-client.provider';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptionst),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [s3ClientProvider, AppService],
})
export class AppModule {}
