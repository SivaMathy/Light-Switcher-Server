import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JWTStartegy } from './jwt-strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';

@Module({
  imports:[  forwardRef(() => UsersModule),PassportModule,JwtModule.register({
    secret: 'MATHYTHESCRETECODEFORDEV',
    signOptions: { expiresIn: '60s' },
  }),MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService,JWTStartegy,RefreshTokenStrategy],
  exports:[AuthService]
})
export class AuthModule {}
