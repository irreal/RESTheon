import { Injectable } from '@nestjs/common';
import { Parameters, SqlService } from 'src/sql/sql.service';
import { SubjectDto, SubjectPutDTO } from './subject.dto';

@Injectable()
export class SubjectService {
  constructor(private sql: SqlService) {}
  async postSubject(subject: SubjectDto) {
    //waaait
    return await this.sql.executeProcedure(
      '_pNQ_BuyerInsert',
      Parameters(subject),
      [{ name: 'nQID' }],
    );
  }

  async putSubject(subject: SubjectPutDTO) {
    return await this.sql.executeProcedure(
      '_pNQ_BuyerUpdate',
      Parameters(subject),
    );
  }
}
