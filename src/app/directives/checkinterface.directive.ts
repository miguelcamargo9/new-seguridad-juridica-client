import { Directive, OnInit, ElementRef, Renderer2, Input } from "@angular/core";

@Directive({
  selector: "[checkInterface]"
})
export class CheckInterfaceDirective implements OnInit {
  @Input("checkInterface") permission: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, "color", "red");
  }
}
