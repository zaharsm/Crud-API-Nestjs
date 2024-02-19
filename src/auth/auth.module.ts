import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Schema/user-schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    MongooseModule.forFeature([{
      name:'User',
      schema:UserSchema
    }]),
    JwtModule.registerAsync(
      {
        inject:[ConfigService],
        useFactory:(config: ConfigService)=>{
          return {
            secret : config.get<string>('JWT_SECRET'),
            signOptions: { 
              expiresIn: config.get<string | number>('JWT_EXPIRES')
            },
          }
        }
      }
    )
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports :[JwtStrategy,PassportModule]

})
export class AuthModule {}
