import { EventEmitter } from "@angular/core";

// external
import { ContinuousModelViewer } from 'modelviewer'
import { ModelViewerParsers } from "src/app/utils/parsers/modelviewer.parsers";

export class ReasoningViewerController {

    // consts
    // public streamName: string = 'reasoning:check_status';
    public streamName: string = 'reasoning:check_status_db';
    

    // viewer
    public reasoningViewer!: ContinuousModelViewer;

    // recipes
    public indexedTasks: { [id: string]: { step: number; timestamp: number; error: boolean; }[]; } = {};

    constructor( public events: {[name: string]: EventEmitter<any> } ){}

    public initialize_component( containerRef: HTMLDivElement ): void {

        const callbacks: { [callbackName: string]: any } = {
            'mouseover': (timestamp: number | null) => { this.cell_hovered( timestamp) },
            'mouseout': (timestamp: number | null) => { this.cell_hovered( timestamp) }
        }

        this.reasoningViewer = new ContinuousModelViewer( containerRef, callbacks );
    }

    public update_dataset( streamData: any ): void {

        const parsedStream: { [id: string]: { step: number; timestamp: number; error: boolean; }[]; } = ModelViewerParsers.parse_stream_stream( this.streamName, streamData );
        
        this.indexedTasks = parsedStream;

        // updating render
        this.update_render( this.indexedTasks, null  );
    }

    public update_render( data: { [id: string]: { step: number; timestamp: number; error: boolean; }[]; }, selectedTimestamp: number ): void {
        this.reasoningViewer.update( this.indexedTasks, selectedTimestamp );
    }

    public cell_hovered( timestamp: number ): void {
        this.events['timestampselected'].emit({timestamp})
    }

    public highlight_timestamp( timestamp: number | null ): void {
        this.update_render( this.indexedTasks, timestamp );
    }

}