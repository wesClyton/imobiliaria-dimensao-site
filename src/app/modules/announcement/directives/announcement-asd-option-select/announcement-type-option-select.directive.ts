import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { AnnouncementType as AnnouncementTypeEnum } from '../../enums/announcement-type.enum';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';
import { AnnouncementTypePipe } from '../../pipes/announcement-type/announcement-type.pipe';
import { AnnouncementTypeLabel } from '../../utils/announcement-type-label.util';

@Directive({
  selector: '[appAnnouncementTypeOptionSelect]',
  providers: [AnnouncementTypePipe]
})
export class AnnouncementTypeOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<Array<AnnouncementType>>();

  constructor(
    private readonly announcementTypePipe: AnnouncementTypePipe
  ) { }

  ngOnInit(): void {
    const announcementTypes = new Array<AnnouncementType>();
    Object.keys(AnnouncementTypeLabel.getAll()).forEach(key => {
      announcementTypes.push({
        name: this.announcementTypePipe.transform(key as never),
        value: key as AnnouncementTypeEnum
      });
    })
    this.dataFinded.emit(announcementTypes);
  }

}

