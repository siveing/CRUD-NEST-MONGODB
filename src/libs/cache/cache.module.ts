import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register()
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }]
})
export class LibCacheModule { }
