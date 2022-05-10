import { Pipe, PipeTransform } from '@angular/core';
import { AnnouncementType } from '../../enums/announcement-type.enum';
import { AnnouncementTypeLabel } from '../../utils/announcement-type-label.util';

@Pipe({
  name: 'announcementType'
})
export class AnnouncementTypePipe implements PipeTransform {

  transform(type: AnnouncementType): string {
    return AnnouncementTypeLabel.getByRole(type);
  }

}
