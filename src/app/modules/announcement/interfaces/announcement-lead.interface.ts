import { LeadType } from '../../lead/enums/lead-type.enum';

export interface AnnouncementLead {
  readonly nome: string;
  readonly email: string;
  readonly telefone: string;
  readonly tipoForm: LeadType;
  readonly codigoimovel: string;
  readonly id?: string;
}
