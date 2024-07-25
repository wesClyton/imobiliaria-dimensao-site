import { LeadType } from '../lead/enums/lead-type.enum';

export interface ContactLead {
  readonly email: string;
	readonly nome: string;
	readonly telefone: string;
  readonly melhorHorario: string;
  readonly mensagem: string;
	readonly tipoForm: LeadType;
  readonly id?: string;
}
