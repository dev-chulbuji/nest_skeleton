import { Controller, Get } from '@nestjs/common'

@Controller('/errors')
export class ErrorController {
  constructor() {
  }

  @Get('')
  async getErrorList() {
    return 'test'
  }
}
