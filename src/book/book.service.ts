import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './Schema/book.schema';
import { Model} from 'mongoose';

import { Query } from 'express-serve-static-core';
import { User } from 'src/auth/Schema/user-schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: Model<Book>
    ){}

    public async findAll(query:Query):Promise<Book[]>{
        console.log(query)

        let resPerPage = 2
        let currentPage = Number(query.page) || 1;
        let skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            title :{
                $regex : query.keyword,
                $options : 'i'
            },

        }:{}
        const author = query.author ? {
            author : {
                $regex : query.author,
                $options : 'i'
            }
        }:{}
        const book = (await this.bookModel
            .find({...keyword,...author})
            .limit(resPerPage)
            .skip(skip));
        return book;
    }

    public async create(book:Book,user:User):Promise<Book>{

        const data = Object.assign(book,{user:user._id})
        const books = await this.bookModel.create(book);
        return books;
    }

    public async findBookById(id:string):Promise<Book>{
        const book = await this.bookModel.findById(id);
        return book;
    }

    public async updateById(id:string,book:Book):Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id,book,{
            new:true
        });
    }

    public async deleteById(id:string):Promise<Book>{
        return await this.bookModel.findByIdAndDelete(id);
    }
}
