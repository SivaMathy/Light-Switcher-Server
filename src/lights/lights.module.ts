import { Module } from '@nestjs/common';
import { LightsService } from './lights.service';
import { LightsResolver } from './lights.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Light, LightsSchema } from './entities/light.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Light.name, schema: LightsSchema }]),
  ],
  providers: [LightsService,LightsResolver],
  exports: [LightsService],
})
export class LightsModule {}
