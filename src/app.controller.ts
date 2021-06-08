import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { json } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './public.decorator';
import { GetStock } from './specific-pantheon/specific-pantheon.service'
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private specificPantheonService: SpecificPantheonService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('authentication/token')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('')
  getStatus() {
    return 'api running ok :)';
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/stock')
  async Stock() {
  var sqlResult = await this.specificPantheonService.getStock();
  console.log(sqlResult);
  return { message: { queryResult: { rowCount: sqlResult.length, rows: sqlResult, outParams: {} } }};
  }
}
