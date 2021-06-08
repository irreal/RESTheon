export type SubjectDto = {
  cActive: string;
  cShippingAddress: string;
  cEmail: string;
  cEmail2: string;
  cFax: string;
  cSubject: string;
  cContact: string;
  cCurrency: string;
  cFieldSA: string;
  cFieldSAParentId: string;
  cCode: string;
  cAddress: string;
  cPhone: string;
  cPhone2: string;
  cURL: string;
};

export type SubjectPutDTO = SubjectDto & { nQId: number };
