import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Magazine } from './Schema/magazine.schema';
import { CreateMagazineDto } from './dto/create.magazine.request.dto';
import { UpdateMagazineRequestDto } from './dto/update.response.dto';

import { Query } from 'express-serve-static-core';

@Injectable()
export class MagazineService {
    constructor(
        @InjectModel(Magazine.name)
        private readonly MagazineModel:Model<Magazine>
    ){}

    public async findAll(query : Query): Promise<Magazine[]> {

        console.log(query);

        let resPages = 2;
        let currentPage = Number(query.pages) || 1;
        let skip = resPages * (currentPage-1)

        const keyword =  query.category ? {
            category:{
                $regex: query.category,
                $options: "i"
            },

        
        }:{}
        const magazine = await this.MagazineModel
        .find({...keyword})
        .limit(currentPage)
        .skip(skip)
        return magazine;
    }

    public async findOne(magazineId:string):Promise<Magazine>{
        const particularMagazine = await this.MagazineModel.findById(magazineId).exec();
        return particularMagazine;
    }

    public async createMagazine(createMagazineDto:CreateMagazineDto):Promise<Magazine>{
        const newMagazine = await this.MagazineModel.create({
            ...createMagazineDto
        })

        return newMagazine
    }

    public async updateMagazine(magazineId: string,updateMagazineRequestDto:UpdateMagazineRequestDto): Promise<Magazine> {
        const updateInfo = await this.MagazineModel.findByIdAndUpdate(magazineId,{
            ...updateMagazineRequestDto
        }, {new: true});

        return updateInfo;
    }

    public async removeMagazine(magazineId: string):Promise<Magazine>{
        const deleteMagazine = await this.MagazineModel.findByIdAndDelete({ 
            _id: magazineId 
        })
        return deleteMagazine;
    }
    
}
