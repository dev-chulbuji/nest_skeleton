import * as winston from 'winston'
import { LOGGER_TYPE } from '../../shared/enum/common.enum'
import * as fs from 'fs'
import { ConfigService } from "../config/config.service";

const jsonFormatter = (logEntry) => {
  const base = {timestamp: new Date()}
  const json = Object.assign(base, logEntry.message)
  logEntry[Symbol.for('message')] = JSON.stringify(json)
  return logEntry
}

const winstonConfig = (type: LOGGER_TYPE) => {
  if (!fs.existsSync(ConfigService.getLogDir())) {
    fs.mkdirSync(ConfigService.getLogDir())
  }

  const level = type === LOGGER_TYPE.ERROR ? 'error' : 'info'
  const filename = type === LOGGER_TYPE.ERROR ? 'error.log' : 'access.log'

  const transports = []
  transports.push(new winston.transports.File({filename: `${ConfigService.getLogDir()}/${filename}`}))

  if (ConfigService.isLocal()) {
    transports.push(new winston.transports.Console())
  }

  return {
    provide: type,
    useFactory: () => winston.createLogger({
      level,
      format: winston.format(jsonFormatter)(),
      transports,
    }),
  }
}

export const loggerProviders = [
  winstonConfig(LOGGER_TYPE.ACCESS),
  winstonConfig(LOGGER_TYPE.ERROR),
]
