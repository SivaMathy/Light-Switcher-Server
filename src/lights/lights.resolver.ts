import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { LightsService } from './lights.service';
import { CreateLightInput } from './dto/create-light.input';
import { UpdateLightInput } from './dto/update-light.input';
import { Light } from './entities/light.entity';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '@nestjs/passport';
import { JWTAuthGuard } from 'src/auth/jwt-auth-guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { RolesTypes } from '../users/roles.enum';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
const pubSub = new PubSub();

@Resolver('Light')
export class LightsResolver {
  constructor(private readonly lightsService: LightsService) {}

  @Mutation(() => Light, { name: 'createLight' })
  async create(@Args('createLightInput') createLightInput: CreateLightInput) {
    const newLight = this.lightsService.create(createLightInput);
    pubSub.publish('lightCreated', { lightCreated: newLight });
    return newLight;
  }

  @Query('findAllLights')
  findAllLights() {
    return this.lightsService.findAll();
  }
  @UseGuards(JWTAuthGuard,RolesGuard)
  @Roles(RolesTypes.ADMIN)
  @Mutation(() => Light, { name: 'toggleLightState' })
  async toggleLightState(
    @Args('updateLightInput') updateLightInput: UpdateLightInput,
  ) {
    const updatedLight = this.lightsService.toggleLightState(updateLightInput);
    pubSub.publish('lightUpdated', { lightUpdated: updatedLight });
    return updatedLight;
  }

  @Mutation(() => Light, { name: 'assignUserToLight' })
  async assignUserToLight(
    @Args('lightId') lightId: string,
    @Args('userId') userId: string,
  ) {
    return this.lightsService.assignUserToLight(lightId, userId);
  }
  @Subscription(() => Light)
  lightCreated() {
    return pubSub.asyncIterableIterator('lightCreated');
  }
  @Subscription(() => Light)
  lightUpdated() {
    return pubSub.asyncIterableIterator('lightUpdated');
  }
}
