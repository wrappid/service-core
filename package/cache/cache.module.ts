import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";

/**
 * @todo =
 *
 * @description
 */
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class CacheModule extends BaseModule {
  async onModuleInit() {
    console.log(`::=== DatabaseModule::onModuleInit START ===::`);
  }
}
