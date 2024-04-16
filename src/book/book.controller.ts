import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Schema/book.schema';
import { createRequestDto } from './dto/create-request-dto';
import { UpdateRequestDto } from './dto/update-request.dto';

import { Query as ExpressQuery } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/Schema/user-schema';

@Controller('book')
export class BookController {
    constructor(private bookService:BookService) {};
    @Get()
    async findBooks(@Query() query: ExpressQuery):Promise<Book[]>{
        const books = await this.bookService.findAll(query);
        return books;
    }

    @Get('/:id')
    async findBookId(@Param('id') id:string):Promise<Book>{
        return await this.bookService.findBookById(id); 
    }

    @Post()
    @UseGuards(AuthGuard())
    async createBooks(@Body() book:createRequestDto, @Req() req):Promise<Book>{
        console.log(req)
        return await this.bookService.create(book,req.user);
    }


    @Put('/:id')
    async updateBookId(@Param('id') id:string,@Body() book:UpdateRequestDto):Promise<Book>{
        
        const isValid = mongoose.isValidObjectId(id);
        console.log(isValid)
        if(!isValid) throw new BadRequestException('Please Enter Correct ID')

        const books =  await this.bookService.updateById(id,book);
        if(!books) throw new NotFoundException('book')

        return books;
    }

    @Delete('/:id')
    async deleteBookId(@Param('id') id:string):Promise<Book>{
        return await this.bookService.deleteById(id);
    }
}
