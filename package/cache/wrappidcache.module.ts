import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";
import { RedisCacheService } from "./cache.service";

@Module({
  imports: [],
  providers: [RedisCacheService, ...RedisCacheService.getAllCacheProviders()],
  exports: [RedisCacheService],
})
export class WrappidCacheModule extends BaseModule {
  onCoreModuleInit(): void {
    console.log(`::=== WrappidCacheModule::onModuleInit START ===::`);
    // this.redisCacheService.checkConnection();
    console.log(`::=== WrappidCacheModule::onModuleInit END ===::`);
  }
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
  constructor(private readonly redisCacheService: RedisCacheService) {
    super();
  }
}
