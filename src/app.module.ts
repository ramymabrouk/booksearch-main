import { Module } from '@nestjs/common';
import { SearchController } from './books/search/search.controller';
import { SearchService } from './books/search/search.service';
import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [SearchController],
  providers: [SearchService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },],
})
export class AppModule {}
