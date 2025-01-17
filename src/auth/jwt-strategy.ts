import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JWTStartegy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    ignoreExpiration: false,
                    secretOrKey: 'MATHYTHESCRETECODEFORDEV',
                })
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.name, role: payload.role };
      }
}          