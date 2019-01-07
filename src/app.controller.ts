import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
    @Get('/hc')
    healthCheck() {
        return 'OK'
    }
}
