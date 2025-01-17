import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import passport from 'passport';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
}
