import { Global, Module } from '@nestjs/common'
import { loggerProviders } from './logger.providers'
import { LoggerService } from './logger.service'

@Global()
@Module({
  providers: [...loggerProviders, LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {
}

