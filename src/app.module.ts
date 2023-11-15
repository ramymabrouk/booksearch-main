import { Module } from '@nestjs/common';
import { SearchController } from './books/search/search.controller';
import { SearchService } from './books/search/search.service';
import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [HttpModule, CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: 'cache',
    port: 6379,
  }),],
  controllers: [SearchController],
  providers: [SearchService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },],
})
export class AppModule {}
