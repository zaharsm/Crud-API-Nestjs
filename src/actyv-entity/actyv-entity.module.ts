import { Module } from '@nestjs/common';
import { ActyvEntityController } from './actyv-entity.controller';
import { ActyvEntityService } from './actyv-entity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActyvEntity, ActyvEntitySchema } from './Schema/actyv-entity.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: 'ActyvEntity',
      schema:ActyvEntitySchema
    }
   ])
  ],
  controllers:[ActyvEntityController],
  providers:[ActyvEntityService],
  exports: [ActyvEntityService]
})

export class ActyvEntityModule {}
