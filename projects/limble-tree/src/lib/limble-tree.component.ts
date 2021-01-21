import {
   AfterViewInit,
   ChangeDetectorRef,
   Component,
   Input,
   OnChanges,
   ViewChild,
   ViewContainerRef
} from "@angular/core";
import { LimbleTreeData, LimbleTreeService } from "./limble-tree.service";

@Component({
   selector: "limble-tree",
   templateUrl: "./limble-tree.component.html",
   styles: ["./limble-tree.component.scss"]
})
export class LimbleTreeComponent implements AfterViewInit, OnChanges {
   @Input() treeData: LimbleTreeData | undefined;
   @Input() coordinates: Array<number> | undefined;
   @Input() indent: number;

   @ViewChild("host", { read: ViewContainerRef }) private host:
      | ViewContainerRef
      | undefined;

   constructor(
      private readonly limbleTreeService: LimbleTreeService,
      private readonly changeDetectorRef: ChangeDetectorRef
   ) {
      this.indent = 0;
   }

   ngAfterViewInit() {
      this.reRender();
      this.changeDetectorRef.detectChanges();
   }

   ngOnChanges() {
      if (this.host !== undefined && this.treeData !== undefined) {
         this.reRender();
      }
   }

   public reRender() {
      if (this.host === undefined) {
         throw new Error(
            "Failed to render limble tree. Failure occurred at root."
         );
      }
      if (this.treeData === undefined) {
         throw new Error(`limbleTree requires a data object`);
      }
      if (this.coordinates === undefined) {
         this.limbleTreeService.renderRoot(this.host, this.treeData);
      } else {
         this.limbleTreeService.render(
            this.host,
            this.treeData,
            this.coordinates
         );
      }
   }
}
