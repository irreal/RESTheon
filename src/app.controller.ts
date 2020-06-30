import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getInfo(): { msg: string } {
    return { msg: "RESTheon is running :)" };
  }
}
