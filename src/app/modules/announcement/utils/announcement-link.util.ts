import { Params } from '@angular/router';
import { StringUtil } from '../../../shared/utils/string.util';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { Announcement } from '../interfaces/announcement.interface';

export class AnnouncementLinkUtil {

  public static create(announcement: Announcement): string {
    return `${ANNOUNCEMENT_CONFIG.pathFront}/${StringUtil.formatFriendlyUrl(announcement.titulo)}/${announcement.codigoAnuncio.toLocaleUpperCase()}`;
  }

  public static convertParamTypeAnnouncement(link: string, destaque: boolean = false): Params {
    let params = {};

    if (destaque) {
      params = { destaque }
    }

    const splited = link.split('=');
    const key = splited[0].substring(1, splited[0].length);
    const value = splited[1];

    params = {...params, [key]: value };

    return params;
  }

  public static canOpenAnnouncement(announcement: Announcement): boolean {
    let isNotExpired = false;
    let dateSplited = announcement.expiracaoAnuncio.toString().split('/');
    const date = new Date(
      parseInt(dateSplited[2], 10),
      parseInt(dateSplited[1], 10) - 1,
      parseInt(dateSplited[0], 10)
    );
    isNotExpired = date > new Date();

    return announcement.ativo || isNotExpired;
  }

}
