import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PerceptionViewerController } from './controller/perception-viewer.controller';

@Component({
  selector: 'app-perception-viewer',
  templateUrl: './perception-viewer.component.html',
  styleUrls: ['./perception-viewer.component.scss']
})
export class PerceptionViewerComponent implements AfterViewInit, OnChanges, OnInit {

  // consts
  public streamName: string = 'detic:image:misc:for3d';

  // controller
  public perceptionViewerController!: PerceptionViewerController;
  
  // DOM refs
  @ViewChild('containerref') containerRef!: ElementRef;

  // inputs
  @Input('streamdata') streamData: any[] = [];
  @Input('selectedtimestamp') selectedTimestamp: { [name: string]: number } = {};

  // events
  @Output('timestampselected') timestampSelected: EventEmitter<{timestamp: number}> = new EventEmitter<{timestamp: number}>();

  constructor(){}

  ngOnInit(): void {

    const events: {[name: string]: EventEmitter<any>} = {
      'timestampselected': this.timestampSelected
    }

    this.perceptionViewerController = new PerceptionViewerController( events );

  }

  ngAfterViewInit(): void {
    this.perceptionViewerController.initialize_component( this.containerRef.nativeElement );
  }

  ngOnChanges(changes: SimpleChanges): void {

    if( 'streamData' in changes && !changes['streamData'].firstChange ){
      if( changes['streamData'].currentValue ){
        this.perceptionViewerController.update_dataset( this.streamName, changes['streamData'].currentValue, [] );
      }
    }

    if( 'selectedTimestamp' in changes && !changes['selectedTimestamp'].firstChange ){
      if( changes['selectedTimestamp'].currentValue ){
        this.perceptionViewerController.highlight_timestamp( changes['selectedTimestamp'].currentValue['detic:image:misc:for3d'] );
      }
    }

  }

}
