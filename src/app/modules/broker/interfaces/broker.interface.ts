export interface Broker {
  readonly id: string;
  readonly usuarioId?: string;
  readonly nome: string;
  readonly biografia: string;
  readonly funcao: string;
  readonly creci: string;
  readonly telefone: string;
  readonly whatsapp: string;
  readonly email: string;
  readonly instagram: string;
  readonly facebook: string;
  readonly linkedin: string;
  readonly foto: string;
  readonly ativo: boolean;
}