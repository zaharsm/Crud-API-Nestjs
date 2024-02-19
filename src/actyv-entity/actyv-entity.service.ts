import { Body, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActyvEntity } from './Schema/actyv-entity.schema';
import { Model } from 'mongoose';
import { ActyvEntityResponseDto } from './dto/actyv-entity-response.dto';
import {  CreateActyvEntityRequestDto } from './dto/create-actyv-entity-request.dto';
import { error } from 'console';
import { UpdateActyvEntityRequestDto } from './dto/update-actyv-entity-request.dto';

@Injectable()
export class ActyvEntityService {
    constructor(
        @InjectModel(ActyvEntity.name)
        private readonly actyvEntityModel:Model<ActyvEntity>
    ){}

    public async getAllActyvEntities():Promise<ActyvEntity[]>{
        const actyvEntity = await this.actyvEntityModel.find()
        return actyvEntity;
    }

    public async getActyvEntitiesById(actyvEntityId:string):Promise<ActyvEntity>{
        const actyvEntitybyId = await this.actyvEntityModel.findById(actyvEntityId)
        if(!actyvEntitybyId) throw new NotFoundException(`Actyv Entity with id ${actyvEntityId} not found`); 
        return actyvEntitybyId;
    }

    public async createActyvEntity(createActyvEntityRequestDto:CreateActyvEntityRequestDto): Promise<ActyvEntity>{
        const actyvEntity = await this.actyvEntityModel.create({
            ...createActyvEntityRequestDto
        })
        return actyvEntity;
    }

    public async updateActyvEntity(actyvEntityId:string,updateActyvEntityRequestDto:UpdateActyvEntityRequestDto):Promise<ActyvEntity>{
        const updateActyvEntity = await this.actyvEntityModel.findByIdAndUpdate((actyvEntityId),{
            ...updateActyvEntityRequestDto
        },{new:true})
        return updateActyvEntity;
    }

    public async deleteActyvEntity(actyvEntityId:string):Promise<ActyvEntity>{
        const deleteActyvEntity = await this.actyvEntityModel.findByIdAndDelete(actyvEntityId);
    
        if(!deleteActyvEntity) throw new NotFoundException(`Actyv Entity with id ${actyvEntityId} not found`);
        return deleteActyvEntity;
    }

}
