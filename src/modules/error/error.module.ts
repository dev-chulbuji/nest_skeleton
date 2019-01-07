import { Module } from '@nestjs/common'
import { ErrorController } from './error.controller'

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    //
    // ]),
  ],
  providers: [
    // ErrorService,
    // ErrorDAO,
    // ErrorSerializer
  ],
  controllers: [ErrorController]
})
export class ErrorModule {
}
