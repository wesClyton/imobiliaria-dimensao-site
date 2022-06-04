import { AnnouncementType } from "src/app/modules/announcement/enums/announcement-type.enum";

export class StringUtil {

  public static removeSpecialCharacteres(value: string): string {
    return value?.replace(/[^a-zA-Z0-9 ]/g, '')?.trim();
  }

  public static removeWhiteSpaces(value: string): string {
    return value?.replace(/\s/g, '')?.trim();
  }

  public static onlyNumbers(value: string): string {
    return this.removeSpecialCharacteresAndWhiteSpaces(value?.replace(/[a-zA-Z]/, ''))?.trim();
  }

  public static removeSpecialCharacteresAndWhiteSpaces(value: string): string {
    return this.removeSpecialCharacteres(this.removeWhiteSpaces(value))?.trim();
  }

  public static removeSymbolCurrencyBr(value: string): string {
    return value?.toString().replace('R$', '').trim();
  }

  public static formatFriendlyUrl(value: string): string {
    value = value.replace(/[á|ã|â|à]/gi, 'a');
    value = value.replace(/[é|ê|è]/gi, 'e');
    value = value.replace(/[í|ì|î]/gi, 'i');
    value = value.replace(/[õ|ò|ó|ô]/gi, 'o');
    value = value.replace(/[ú|ù|û]/gi, 'u');
    value = value.replace(/[ç]/gi, 'c');
    value = value.replace(/[ñ]/gi, 'n');
    value = value.replace(/[á|ã|â]/gi, 'a');
    value = value.replace(/\W/gi, '-');
    value = value.replace(/(\-)\1+/gi, '-');
    return value.trim().toLowerCase();
  }

  public static transformCurrencyEUA(value: string): number {
    value = this.removeSymbolCurrencyBr(value);
    return parseFloat(value.replace(/\./g, '').replace(',', '.').trim());
  }

  public static transformNumber(value: string): number {
    value = this.removeSymbolCurrencyBr(value);
    return parseFloat(value?.replace(/\./g, '')?.replace(',', '.').trim());
  }

  public static isUrl(value: string): boolean {
    return value.startsWith('http') || value.startsWith('www');
  }

  public static isUrlAnnouncementType(value: string): boolean {
    const valueEnum = Object.values(AnnouncementType).filter(valueEnum => value.includes(valueEnum));
    return valueEnum.length ? true : false;
  }

  public static isUrlInternal(value: string): boolean {
    return value.startsWith('/');
  }

  public static isBoolean(value: any): boolean {
    return typeof value === 'boolean'
  }

  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public static isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  public static prepareSearchValue(key: string, value: any): any {
    const keysTranformNumber = [
      'areaTotalMinima',
      'areaTotalMaxima',
      'areaConstruidaMinima',
      'areaConstruidaMaxima',
      'banheiros',
      'dormitorios',
      'vagasGaragem'
    ];
    if (keysTranformNumber.some(item => item === key)) {
      return this.transformNumber(value);
    }

    if (value instanceof Date) {
      return (value as Date).toString();
    }

    if (value && !this.isBoolean(value) && !this.isNumber(value) && value?.startsWith('R$')) {
      value = this.removeSymbolCurrencyBr(value);
      return this.transformNumber(value);
    }

    return value;
  }

  public static formatMaskDecimalInValueLoaded(value: string): string {
    let thousand!: string;
    let decimal!: string;
    let formated!: string;

    if (!value.includes('.')) {
      value = `${value}.00`;
    }

    if (value.includes('.')) {
      decimal = value.substring(value.length - 2, value.length);
      if (decimal.includes('.')) {
        value = `${value}0`;
      }
    }

    if (value.includes('.,')) {
      return value;
    }

    thousand = value.substring(0, value.length - 2);
    decimal = value.substring(value.length - 2, value.length);
    formated = thousand ? `${thousand},${decimal}` : '0';

    return formated;
  }

}
