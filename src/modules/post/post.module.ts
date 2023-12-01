import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostTranslationEntity } from './post-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostTranslationEntity])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
