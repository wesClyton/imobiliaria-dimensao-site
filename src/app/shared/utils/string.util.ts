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
    return value?.replace('R$', '').trim();
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

  public static isUrl(value: string): boolean {
    return value.startsWith('http') || value.startsWith('www');
  }

}
