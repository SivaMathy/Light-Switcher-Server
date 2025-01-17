import { connect } from "http2";
import { Connection, connection } from "mongoose";
import { Inject } from "@nestjs/common";
import { UserSchema } from "./entities/user.entity";

export const userProvider = [
    {
        provide:'USER_MODEL',
        useFactory:(connection:Connection)=>connection.model('User',UserSchema),
        inject:['']
    }
]