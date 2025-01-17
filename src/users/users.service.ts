import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  getUserByName(name: string) {
    return this.userModel.findOne({ name });
  }

  async updateUserToken(id: string, token: string, refreshToken: string): Promise<User> {
    console.log("testinmg update")
    return this.userModel.findByIdAndUpdate(
        id,
        { token, refreshToken },
        { new: true } 
    ).exec();
}


  async filterUserOnlyRole():Promise<User[]>{
    return this.userModel.find({role:'User'}).exec();
  }

}
