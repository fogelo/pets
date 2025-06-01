import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { UserAccountsModule } from './modules/user-accounts/user-accounts.module';
import { TestingModule } from './modules/testing/testing.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/inc-hw',
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      },
    ),
    TestingModule,
    UserAccountsModule, //все модули должны быть заимпортированы в корневой модуль, либо напрямую, либо по цепочке (через другие модули)
    BloggersPlatformModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
