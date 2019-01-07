import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from './common/logger/logger.module'
import { modules } from './modules/modules'
import { config } from "./common/config/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.host,
      port: 5432,
      username: config.db.username,
      database: config.db.database,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: false,
      logging: false,
    }),
    ...modules,
    LoggerModule
  ],
})
export class AppModule {
}
