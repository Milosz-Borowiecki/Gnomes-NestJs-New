import { Test, TestingModule } from '@nestjs/testing';
import { GnomesService } from './gnomes.service';

describe('GnomesService', () => {
  let service: GnomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GnomesService],
    }).compile();

    service = module.get<GnomesService>(GnomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
