import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptionst } from './database/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptionst),
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new AWS.S3({
          accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
          region: configService.get('AWS_REGION'),
        });
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}
