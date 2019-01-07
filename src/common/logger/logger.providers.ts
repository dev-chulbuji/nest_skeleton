import * as fs from 'fs'
import * as winston from 'winston'
import { LOGGER_TYPE } from '../../shared/enum/common.enum'
import { ConfigService } from '../config/config.service'

const jsonFormat = (logEntry) => {
  const base = {timestamp: new Date()}
  const json = Object.assign(base, logEntry.message)
  logEntry[Symbol.for('message')] = JSON.stringify(json)
  return logEntry
}

const winstonConfig = (errorType) => {

  if (!fs.existsSync(ConfigService.getLogDir())) {
    fs.mkdirSync(ConfigService.getLogDir())
  }

  let option = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: errorType === LOGGER_TYPE.ERROR ?
          `${ConfigService.getLogDir()}/error.log` : `${ConfigService.getLogDir()}/access.log`,
      })]
  }

  if (LOGGER_TYPE.ACCESS) {
    option = Object.assign({format: winston.format(jsonFormat)()}, option)
  }

  return option
}

export const loggerProviders = [
  {
    provide: LOGGER_TYPE.ACCESS,
    useFactory: () => winston.createLogger(winstonConfig(LOGGER_TYPE.ACCESS)),
  },
  {
    provide: LOGGER_TYPE.ERROR,
    useFactory: () => winston.createLogger(winstonConfig(LOGGER_TYPE.ERROR)),
  },
]
