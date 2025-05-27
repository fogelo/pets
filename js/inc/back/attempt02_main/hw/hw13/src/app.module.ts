import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './blogs/api/blogs.conroller';
import { BlogsService } from './blogs/application/blogs.service';
import { Blog, BlogSchema } from './blogs/domain/blog.entity';
import { BlogsQueryRepository } from './blogs/infrastructure/blogs.query-repository';
import { BlogsRepository } from './blogs/infrastructure/blogs.repository';
import { UsersController } from './user-accounts/api/users.controller';
import { UsersService } from './user-accounts/application/users.service';
import { User, UserSchema } from './user-accounts/domain/user.entity';
import { UsersQueryRepository } from './user-accounts/infrastructure/query/users.query-repository';
import { UsersRepository } from './user-accounts/infrastructure/users.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/inc-hw',
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [AppController, UsersController, BlogsController],
  providers: [
    AppService,
    UsersQueryRepository,
    UsersService,
    UsersRepository,
    BlogsQueryRepository,
    BlogsService,
    BlogsRepository,
  ],
})
export class AppModule {}
