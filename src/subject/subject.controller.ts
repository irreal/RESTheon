import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SubjectDto, SubjectPutDTO } from './subject.dto';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subject: SubjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async CreateSubject(@Body() subject: SubjectDto) {
    const result = await this.subject.postSubject(subject);
    //console.log('je je', result);
    return result;
  }

  @Put()
  async UpdateSubject(@Body() subjectPut: SubjectPutDTO) {
    const result = await this.subject.putSubject(subjectPut);
    //console.log('je je', result);
    return result;
  }
}
