import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-youtube-iframe',
  templateUrl: './youtube-iframe.component.html',
  styleUrls: ['./youtube-iframe.component.scss']
})
export class YoutubeIframeComponent implements AfterViewInit {

  @ViewChild('iframe', { static: false })
  public iframe!: ElementRef;

  @Input()
  public width!: number;

  @Input()
  public height!: number;

  @Input()
  public videoId!: string | null;

  constructor(
    private readonly renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.videoId ? this.loadVideo(this.videoId) : null;
  }

  private loadVideo(id: string): void {
    this.reset();
    this.videoId = id;
    if (this.videoId) {
      this.renderer.setAttribute(this.iframe.nativeElement, 'src', `https://www.youtube.com/embed/${this.videoId}`);
      this.renderer.setStyle(this.iframe.nativeElement, 'display', 'block');
    }
  }

  private reset(): void {
    this.videoId = null;
    this.renderer.removeAttribute(this.iframe.nativeElement, 'src');
    this.renderer.setStyle(this.iframe.nativeElement, 'display', 'none');
  }

}
