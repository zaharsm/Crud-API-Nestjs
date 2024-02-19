import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Post, Put, Query, Res } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { Magazine } from './Schema/magazine.schema';
import { CreateMagazineDto } from './dto/create.magazine.request.dto';
import { MagazineResponseDto } from './dto/magazine.response.dto';
import { UpdateMagazineRequestDto } from './dto/update.response.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('magazine')
export class MagazineController {
    private readonly logger = new Logger(MagazineController.name);
    constructor(private magazineService:MagazineService){}

    // This finds all the magazine in the database

    // Pagination
    // Search using Values 
    @Get()
    async getAllTheMagazine(@Res() res,@Query() query:ExpressQuery):Promise<Magazine[]>{
        this.logger.log(`This is working as Expected GET`);
        const getMagazine = await this.magazineService.findAll(query);
        return res.status(HttpStatus.OK).json(getMagazine);
    }

    @Get('/:id')
    async getOneMagazine(@Res() res, @Param("id") magazineId: string):Promise<Magazine>{
        this.logger.log(`Thus is finding One particular`);
        const getOneMagazine = await this.magazineService.findOne(magazineId);
        return res.status(HttpStatus.OK).json(getOneMagazine);
    }

    @Post()
    async createAllMagazine(@Res() res, @Body() createMagazineDto: CreateMagazineDto):Promise<MagazineResponseDto>{
        this.logger.log(`this is working as Expected POST`);
        const newMagazine = await this.magazineService.createMagazine(createMagazineDto);
        return res.status(HttpStatus.CREATED).json(newMagazine); 
    }

    @Put("/:id")
    public async updateTheMagazine(@Res() res, @Param("id") magazineId: string, @Body() updateMagazineRequestDto: UpdateMagazineRequestDto): Promise<MagazineResponseDto>{
        this.logger.log(`Started updating the magazine with dto ${JSON.stringify(updateMagazineRequestDto)}`);
        const updateEntity = await this.magazineService.updateMagazine(magazineId, updateMagazineRequestDto);
        this.logger.log(`Updated the magazine ${JSON.stringify(updateEntity)}`);
        return res.status(HttpStatus.OK).json(updateEntity);
    }

    @Delete("/:id")
    public async deleteTheMagazine(@Res() res, @Param("id") magazineId: string):Promise<MagazineResponseDto>{
        this.logger.log(`Magazine is Deleting`);
        const deleteEntity = await this.magazineService.removeMagazine(magazineId);
        this.logger.log(`Magazine is Deleted`);
        return res.status(HttpStatus.OK).json(deleteEntity);
    }
}
