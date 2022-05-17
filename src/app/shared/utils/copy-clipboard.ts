export class CopyClipboard {

  public static copy(text: string): void {
    const input = document.createElement('input');
    input.hidden = true;
    input.value = text.trim();
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
    document.body.removeChild(input);
  }

}
