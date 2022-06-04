import { StringUtil } from '../../../shared/utils/string.util';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { Announcement } from '../interfaces/announcement.interface';

export class AnnouncementLinkUtil {

  public static create(announcement: Announcement): string {
    return `${ANNOUNCEMENT_CONFIG.pathFront}/${StringUtil.formatFriendlyUrl(announcement.titulo)}/${announcement.codigoAnuncio.toLocaleUpperCase()}`;
  }

}
