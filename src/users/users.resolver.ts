import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Auth } from 'src/auth/entities/auth.enitity';
import { AuthGuard } from '@nestjs/passport';
import { JWTAuthGuard } from 'src/auth/jwt-auth-guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { RolesTypes } from './roles.enum';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }
  // @UseGuards(JWTAuthGuard,RolesGuard)
  // @Roles(RolesTypes.ADMIN)
  @Query(() => [User], { name: 'findAll' })
  async findAll() {
    return this.usersService.findAll();
  }
  @Query(() => User, { name: 'user' })
  async findOneById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getUserById(id);
  }

  @Query(() => User, { name: 'findByName' })
  async getUserByName(@Args('name', { type: () => String }) name: string) {
    return this.usersService.getUserByName(name);
  }

  @Mutation(() => Auth, { name: 'signin' })
  async signin(
    @Args('name') name: string,
    @Args('password') password: string
  ): Promise<any> {
    const token = await this.authService.validateUser(name, password);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return token;
  }
  // @UseGuards(JWTAuthGuard,RolesGuard)
  // @Roles('Admin')
  @Query(()=>User, {name:'fillterUserOnly'})
  async filterUserOnly(){
    return this.usersService.filterUserOnlyRole();
  }

  @Mutation(() => Auth, { name: 'refreshTokens' })
  async refreshTokens(
    @Args('userId', { type: () => String }) userId: string,
    @Args('refreshToken', { type: () => String }) refreshToken: string,
  ): Promise<any> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    if (!tokens) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return tokens;
  }
}
