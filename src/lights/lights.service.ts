import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateLightInput } from './dto/create-light.input';
import { UpdateLightInput } from './dto/update-light.input';
import { InjectModel } from '@nestjs/mongoose';
import { Light } from './entities/light.entity';
import { Model } from 'mongoose';

@Injectable()
export class LightsService implements OnModuleInit {
  constructor(@InjectModel(Light.name) private lightModel: Model<Light>) {}
  onModuleInit() {}

  async create(createLightInput: CreateLightInput) {
    const createdLight = new this.lightModel(createLightInput);
    return createdLight
      .save()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  }

  findAll() {
    return this.lightModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} light`;
  }
  async toggleLightState(updateLightInput: UpdateLightInput) {
    const { id } = updateLightInput;
    const light = await this.lightModel.findById(id);
    if (!light) {
      throw new Error(`Light with ID ${id} not found.`);
    }
    light.state = !light.state;
    return light.save();
  }

  async assignUserToLight(lightId: string, userId: string) {
    const light = await this.lightModel.findById(lightId);
  
    if (!light) {
      throw new Error(`Light with ID ${lightId} not found.`);
    }
    if (light.assignees.includes(userId)) {
      throw new Error(`User with ID ${userId} is already assigned to this light.`);
    }
    light.assignees.push(userId);
    return light.save();
  }
  
}
