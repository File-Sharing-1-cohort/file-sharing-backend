import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            ping: jest.fn().mockReturnValue({ status: 200 }),
            getLogo: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should return status 200 for ping', () => {
    expect(appController.ping()).toEqual({ status: 200 });
  });

  it('should call getLogo method of AppService', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;

    await appController.getLogo(res);

    expect(appService.getLogo).toHaveBeenCalled();
  });
});
