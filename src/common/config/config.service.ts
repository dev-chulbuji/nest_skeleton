import { config } from './config'

export class ConfigService {
  static isProd() {
    return config.env === 'production'
  }

  static isDev() {
    return config.env === 'development'
  }

  static isLocal() {
    return config.env === 'local'
  }

  static getLogDir() {
    return config.log_dir
  }

  static getPort() {
    return config.port
  }
}
