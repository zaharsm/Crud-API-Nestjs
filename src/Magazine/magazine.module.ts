import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { MagazineSchema } from './Schema/magazine.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{ 
            name:'Magazine',
            schema:MagazineSchema
        }
        ])
    ],
    controllers:[MagazineController],
    providers:[MagazineService]
})

export class MagazineModule {}
