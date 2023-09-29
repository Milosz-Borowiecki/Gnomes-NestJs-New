import { Test, TestingModule } from '@nestjs/testing';
import { GnomesController } from './gnomes.controller';

describe('GnomesController', () => {
  let controller: GnomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GnomesController],
    }).compile();

    controller = module.get<GnomesController>(GnomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
