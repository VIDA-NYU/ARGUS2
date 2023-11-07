import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ModelViewerController } from './controller/model-viewer.controller';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements AfterViewInit, OnChanges {

  // controller
  public modelViewerController!: ModelViewerController;

  // DOM Refs
  @ViewChild('containerref') containerRef!: ElementRef;

  // inputs
  @Input('streamname') streamName: string = '';
  @Input('stream') stream: any = {};

  constructor(){
    this.modelViewerController = new ModelViewerController();
  }

  ngAfterViewInit(): void {
    // this.modelViewerController.initialize_component( this.containerRef.nativeElement );
  }

  ngOnChanges(changes: SimpleChanges): void {

    // if( 'stream' in changes && !changes['stream'].firstChange ){
    //   // if(changes['stream'].currentValue){
    //   //   // this.modelViewerController.update( this.streamName, changes['stream'].currentValue );
    //   // }
    // }

  }

}
