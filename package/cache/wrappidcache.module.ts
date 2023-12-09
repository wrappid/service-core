import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";
import { RedisCacheService } from "./cache.service";

@Module({
  imports: [],
  providers: [RedisCacheService, ...RedisCacheService.getAllCacheProviders()],
  exports: [RedisCacheService],
})
export class WrappidCacheModule extends BaseModule {
  constructor(private readonly redisCacheService: RedisCacheService) {
    super();
  }
  async onModuleInit() {
    console.log(`::=== WrappidCacheModule::onModuleInit START ===::`);
    this.redisCacheService.checkConnection();
  }
}
