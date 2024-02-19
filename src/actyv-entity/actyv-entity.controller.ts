import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ActyvEntity } from './Schema/actyv-entity.schema';
import { Model } from 'mongoose';
import { ActyvEntityService } from './actyv-entity.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActyvEntityResponseDto } from './dto/actyv-entity-response.dto';
import { brotliDecompressSync } from 'zlib';
import { CreateActyvEntityRequestDto } from './dto/create-actyv-entity-request.dto';
import { UpdateActyvEntityRequestDto } from './dto/update-actyv-entity-request.dto';

@Controller('actyv-entity')
@ApiTags('actyv-entity')
export class ActyvEntityController {
    private readonly logger = new Logger(ActyvEntityController.name);
    constructor(private actyvEntityService: ActyvEntityService){}

    @Get()
    @ApiResponse({ status:HttpStatus.OK, type: [ActyvEntityResponseDto]})
    async getAllActyvEntities(@Res() res):Promise<ActyvEntity[]>{
        this.logger.log(`Started Fetching all actyv entities`);
        const actyvEntities = await this.actyvEntityService.getAllActyvEntities();
        this.logger.log(`Fetched all actyv entities ${JSON.stringify(actyvEntities)}`);
        return res.status(HttpStatus.OK).json(actyvEntities);
    }

    @Get('/:id')
    @ApiResponse({status:HttpStatus.OK,type:[ActyvEntityResponseDto]})
    async getActyvEntityById(@Res() res, @Param('id') actyvEntityId:string):Promise<ActyvEntityResponseDto>{
        this.logger.log(`Started Fetching the actyv entity ${actyvEntityId}`);
        const actyvEntity = await this.actyvEntityService.getActyvEntitiesById(actyvEntityId);
        this.logger.log(`Fetched the actyv entity ${JSON.stringify(actyvEntity)}`);
        return res.status(HttpStatus.OK).json(actyvEntity);
    }

    @Post()
    @ApiResponse({ status:HttpStatus.OK,type: [ActyvEntityResponseDto]})
    async createActyvEntity(@Res() res, @Body() createActyvEntityRequestDto:CreateActyvEntityRequestDto): Promise<ActyvEntityResponseDto>{
        this.logger.log(`Started creating actyv entity ${createActyvEntityRequestDto}`);
        const actyvEntity = await this.actyvEntityService.createActyvEntity(createActyvEntityRequestDto);
        this.logger.log(`Created actyv entity ${JSON.stringify(actyvEntity)}`);
        return res.status(HttpStatus.OK).json(actyvEntity);
    }
    
    @Put('/:id')
    @ApiResponse({status:HttpStatus.OK,type:[ActyvEntityResponseDto]})
    async updateActyvEntity(@Res() res,@Param('id') actyvEntityId:string ,@Body() updateActyvEntityRequestDto:UpdateActyvEntityRequestDto):Promise<ActyvEntityResponseDto>{
        this.logger.log(`Started Updating actyv Entity ${JSON.stringify(updateActyvEntityRequestDto)} with Id ${actyvEntityId}`);
        const updatedActyvEntity = await this.actyvEntityService.updateActyvEntity(actyvEntityId,updateActyvEntityRequestDto);
        this.logger.log(`Updated actyv Entity ${JSON.stringify(updatedActyvEntity)}`);
        return res.status(HttpStatus.OK).json(updatedActyvEntity);
    }

    @Delete('/:id')
    @ApiResponse({status:HttpStatus.OK,type:[ActyvEntityResponseDto]})
    async deleteActyvEntity(@Res() res, @Param('id') actyvEntityId:string):Promise<ActyvEntityResponseDto>{
        this.logger.log(`Started Deleting actyv Entity with ID ${actyvEntityId}`);
        const deletedActyvEntity = await this.actyvEntityService.deleteActyvEntity(actyvEntityId);
        this.logger.log(`Deleted actyv Entity ${JSON.stringify(deletedActyvEntity)}`);
        return res.status(HttpStatus.OK).json(deletedActyvEntity);
    }
}
