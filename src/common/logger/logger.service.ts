import { Inject, Injectable } from '@nestjs/common'
import { Logger } from 'winston'
import { LOGGER_TYPE } from '../../shared/enum/common.enum'

@Injectable()
export class LoggerService {
  constructor(
    @Inject(LOGGER_TYPE.ACCESS) private readonly accessLogger: Logger,
    @Inject(LOGGER_TYPE.ERROR) private readonly errorLogger: Logger,
  ) {
  }

  getLogger(loggerType: LOGGER_TYPE): Logger {
    return this[loggerType]
  }
}
