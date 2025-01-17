import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LightsModule } from './lights/lights.module';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context:({req,res})=>({req,res,pubSub}),
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      }
      // autoSchemaFile:join(process.cwd(),"src/schema.gql")
    }),
    AuthModule,
    LightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
