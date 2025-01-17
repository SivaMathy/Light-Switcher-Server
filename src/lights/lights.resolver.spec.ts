import { Test, TestingModule } from '@nestjs/testing';
import { LightsResolver } from './lights.resolver';
import { LightsService } from './lights.service';

describe('LightsResolver', () => {
  let resolver: LightsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightsResolver, LightsService],
    }).compile();

    resolver = module.get<LightsResolver>(LightsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
