import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from 'winston'
import { LOGGER_TYPE } from '../../shared/enum/common.enum'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class AccessInterceptor implements NestInterceptor {
  private readonly accessLogger: Logger

  constructor(private loggerService: LoggerService) {
    this.accessLogger = this.loggerService.getLogger(LOGGER_TYPE.ACCESS)
  }

  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>> {
    const [request] = context.getArgs()
    const now = Date.now()

    return call$.pipe(
      tap(() => {
        const {__uuid, ipaddr: ip, method} = request.headers
        this.accessLogger.info({
          __uuid,
          ip,
          status: request.status,
          method,
          url: request.originalUrl || request.url,
          params: request.params,
          body: request.body,
          timestamp: Date.now(),
          duration: Date.now() - now,
          user_agent: request.headers['user-agent'],
        })
      }),
    )
  }
}
