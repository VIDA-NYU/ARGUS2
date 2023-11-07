// core
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

// controller
import { ReasoningViewerController } from './controller/reasoning-viewer.controller';

@Component({
  selector: 'app-reasoning-viewer',
  templateUrl: './reasoning-viewer.component.html',
  styleUrls: ['./reasoning-viewer.component.scss']
})
export class ReasoningViewerComponent implements AfterViewInit, OnChanges, OnInit {

  // consts
  // public streamName: string = 'reasoning:check_status';
  public streamName: string = 'reasoning:check_status_db';

  // controller
  public reasoningViewerController!: ReasoningViewerController;

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
    
    this.reasoningViewerController = new ReasoningViewerController( events );

  }

  ngAfterViewInit(): void {
    this.reasoningViewerController.initialize_component( this.containerRef.nativeElement );
  }

  ngOnChanges(changes: SimpleChanges): void {

    if( 'streamData' in changes && !changes['streamData'].firstChange ){
      if(changes['streamData'].currentValue){
        this.reasoningViewerController.update_dataset( changes['streamData'].currentValue );
      }
    }

    if( 'selectedTimestamp' in changes && !changes['selectedTimestamp'].firstChange ){
      if(changes['selectedTimestamp'].currentValue){
        this.reasoningViewerController.highlight_timestamp( changes['selectedTimestamp'].currentValue[this.streamName] );
      }
    }

  }

}
