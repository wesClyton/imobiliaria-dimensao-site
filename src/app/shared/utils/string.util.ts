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
    return 'formatar-url-amigavel';
  }

  public static transformCurrencyEUA(value: string): number {
    value = this.removeSymbolCurrencyBr(value);
    return parseFloat(value.replace(/\./g, '').replace(',', '.').trim());
  }

}
