import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExceptionsFilter } from './common/filter/exceptions.filter'
import { AccessInterceptor } from './common/interceptor/access.interceptor'
import { LoggerService } from './common/logger/logger.service'
import { config } from './common/config/config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  const loggerService = app.get<LoggerService>('LoggerService')

  app.useGlobalFilters(new ExceptionsFilter(loggerService))
  app.useGlobalInterceptors(new AccessInterceptor(loggerService))
  // app.useGlobalPipes(new ParseIntPipe(), new PlainToDTOPipe(), new ValidationPipe())

  await app.listen(config.port)
}

bootstrap()
