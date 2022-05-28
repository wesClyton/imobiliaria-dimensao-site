import { LeadType } from '../lead/enums/lead-type.enum';

export interface AnnounceLead {
  readonly email: string;
	readonly nome: string;
	readonly telefone: string;
  readonly tipoImovel: string;
	readonly tipoForm: LeadType;
}
