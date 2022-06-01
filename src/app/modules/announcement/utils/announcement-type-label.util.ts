import { AnnouncementType } from '../enums/announcement-type.enum';

export class AnnouncementTypeLabel {

  public static getAll(): { [key in AnnouncementType]: string } {
    return {
      APARTAMENTO: 'Apartamento',
      CASA: 'Casa',
      COMERCIAL: 'Comercial',
      SOBRADO: 'Sobrado',
      TERRENO_RURAL: 'Terreno Rural',
      TERRENO_URBANO: 'Terreno Urbano'
    }
  }

  public static getByRole(type: AnnouncementType): string {
    return AnnouncementTypeLabel.getAll()[type];
  }

}
