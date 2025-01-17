import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserSchema } from './entities/user.entity';
import { JWTStartegy } from 'src/auth/jwt-strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from 'src/auth/refreshToken.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),AuthModule, PassportModule,
  JwtModule.register({
    secret: 'MATHYTHESCRETECODEFORDEV',
    signOptions: { expiresIn: '20s' },
  }),],
  providers: [UsersResolver, UsersService,JWTStartegy,RefreshTokenStrategy],
  exports:[UsersModule,UsersService]
})
export class UsersModule {}
