import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/user-schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<User>,
        private jwtService: JwtService
    ){}

    public async signUp(signUpDto:SignUpDto):Promise<{token:string}>{

        const {name,email,password} = signUpDto;

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await this.UserModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = this.jwtService.sign({id:user._id});

        return { token }
    }

    public async login(loginDto:LoginDto):Promise<{token:string}>{
        const {email,password} = loginDto;

        const user = await this.UserModel.findOne({email})

        if(!user){
            throw new UnauthorizedException('Enter correct emaail or password');
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password) ;

        if(!isPasswordCorrect){
            throw new UnauthorizedException('Wrong password');
        }

        const token = this.jwtService.sign({id:user._id});

        return { token }
    }
}
