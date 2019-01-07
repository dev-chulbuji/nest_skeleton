import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Logger } from 'winston'
import ERROR from '../../error'
import { LOGGER_TYPE } from '../../shared/enum/common.enum'
import { LoggerService } from '../logger/logger.service'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly errorLogger: Logger

  constructor(private loggerService: LoggerService) {
    this.errorLogger = this.loggerService.getLogger(LOGGER_TYPE.ERROR)
  }

  private getError = (error: any): string => {
    if (isNaN(error)) return error ? error.toString() : ''
    return ERROR[error] ? ERROR[error].message : ''
  }

  catch(exception: any, host: ArgumentsHost): any {
  }
}
