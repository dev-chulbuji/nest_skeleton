const {env: ENV} = process

export const config = {
  env: ENV.NODE_ENV || 'local',
  db: {
    host: ENV.DB_HOST || 'localhost',
    username: ENV.DB_USER || 'flittodev',
    database: ENV.DB_NAME || 'flittodev',
  },
  log_dir: ENV.LOG_DIR || 'logs',
  port: 20040
}

export class Config {

}
