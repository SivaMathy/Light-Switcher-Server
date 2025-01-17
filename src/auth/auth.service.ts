import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.getUserByName(name);

    if (user && user.password === password) {
      const payload = { name: user.name, sub: user.id, role: user.role };
      const token = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(
        { name: user.name, sub: user.id },
        { expiresIn: '7d' },
      );
      await this.userService.updateUserToken(user.id, token, refreshToken);
      return { user, token, refreshToken };
    } else {
      return null;
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = user.refreshToken === refreshToken;
    console.log(refreshTokenMatches)
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const token = this.jwtService.sign({name: user.name, sub: user.id, role: user.role});
    const newrefreshToken = this.jwtService.sign(
      { name: user.name, sub: user.id },
      { expiresIn: '7d' },
    );
    await this.userService.updateUserToken(user.id, token, newrefreshToken);
    return{token,refreshToken}
  }
}
