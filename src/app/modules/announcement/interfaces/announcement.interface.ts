import { Characteristic } from '../../characteristic/interfaces/characteristic.interface';
import { District } from '../../district/interfaces/district.interface';
import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';
import { AnnouncementType } from '../enums/announcement-type.enum';
import { AnnouncementGallery } from './announcement-gallery.interface';

export interface Announcement {
  readonly id: string;
  readonly areaConstruida: number;
  readonly areaTotal: number;
  readonly ativo: boolean;
  readonly bairro: District;
  readonly banheiros: number;
  readonly caracteristicas: Array<Characteristic>;
  readonly cep: string;
  readonly codigoAnuncio: string;
  readonly dataConclusao: Date;
  readonly destaque: boolean;
  readonly dormitorios: number;
  readonly empreendimento: string;
  readonly endereco: string;
  readonly estadoImovel: AnnouncementStateProperty;
  readonly expiracaoAnuncio: Date;
  readonly galeria: AnnouncementGallery;
  readonly latitude: string;
  readonly longitude: string;
  readonly sobre: string;
  readonly suites: number;
  readonly tipo: AnnouncementType;
  readonly titulo: string;
  readonly url360: string;
  readonly urlMapa: string;
  readonly urlVideo: string;
  readonly vagasGaragem: number;
  readonly valor: number;
  readonly valorCondominio: number;
}
