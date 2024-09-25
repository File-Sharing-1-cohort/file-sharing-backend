import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptionst } from './database/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptionst)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
