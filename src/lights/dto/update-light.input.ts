import { CreateLightInput } from './create-light.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLightInput extends PartialType(CreateLightInput) {
  id: number;
}
