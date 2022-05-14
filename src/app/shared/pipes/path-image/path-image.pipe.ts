import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment';

const PathsImage = ['anuncios', 'banners', 'corretores'] as const;

type PathImageType = typeof PathsImage[number];

@Pipe({
  name: 'pathImage'
})
export class PathImagePipe implements PipeTransform {

  private get valuesPossibiles(): Array<string> {
    return Object.values(PathsImage);
  }

  private isAnnouncement(path: string): boolean {
    return path === PathsImage[0];
  }

  transform(image: string | undefined, path: PathImageType, galeriaId?: string): string {
    if (!image) {
      return 'assets/no-image.jpg';
    }

    if (!path && !galeriaId) {
      throw new Error(`PathImagePipe => Informe o "path" da imagem. Valores possíveis: ${this.valuesPossibiles}`);
    }
    if (!Object.values(PathsImage).some(pathImage => pathImage === path)) {
      throw new Error(`PathImagePipe => ${path} não é um valor válido. Valores possíveis: ${this.valuesPossibiles}`);
    }
    if (this.isAnnouncement(path) && !galeriaId) {
      throw new Error(`PathImagePipe => Para o "path" ${PathsImage[0]} é necessário informar a "galeriaId".`);
    }

    let pathImage = environment.aws;

    if (this.isAnnouncement(path) && galeriaId) {
      pathImage = `${pathImage}/${path}/${galeriaId}/${image}`;
    } else {
      pathImage = `${pathImage}/${path}/${image}`;
    }

    return pathImage;
  }

}
