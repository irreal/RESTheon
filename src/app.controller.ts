import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getInfo(): { msg: string } {
    return { msg: "RESTheon is running :)" };
  }
}
