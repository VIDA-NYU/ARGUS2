import { EventEmitter } from "@angular/core";
import { TemporalModelViewer } from "modelviewer";
import { ModelViewerParsers } from "src/app/utils/parsers/modelviewer.parsers";

export class MemoryViewerController {

    // viewer
    public memoryViewer!: any;

    // labels
    public labels: string[] = [];
    public indexedLabels: { [labelName: string]: { [id: number] : { value: string | number, timestamp: number }[] } } = {};
    public selectedLabel: string = '';

    constructor( public events: {[name: string]: EventEmitter<any> } ){}

    public initialize_component( containerRef: HTMLDivElement ): void {

        const callbacks: { [callbackName: string]: any } = {
            'mouseover': (index: number | null) => { this.cell_hovered(index) },
            'mouseout': (index: number | null) => { this.cell_hovered(index) }
        }

        // this.modelViewer = new ModelViewer( containerRef, callbacks );
        this.memoryViewer = new TemporalModelViewer( containerRef, callbacks )

    }

    public update_dataset( streamName: string, streamData: any ): void {

        const chartData: { [labelName: string]: { [id: number] : { value: string | number, timestamp: number }[] } } = ModelViewerParsers.parse_stream_stream( streamName, streamData );

        // saving labels
        this.labels = Object.keys( chartData );
        this.indexedLabels = chartData;

        this.change_label( this.labels[0] );
    }

    public update_render( data: { [id: number] : { value: string | number, timestamp: number }[] }, timestamp: number | null ): void {        
        this.memoryViewer.update( data, timestamp );
    }

    public change_label( label: string ): void {

        this.selectedLabel = label;
        const currentLabelData: { [id: number] : { value: string | number, timestamp: number }[] } = this.indexedLabels[this.selectedLabel];
        this.update_render( currentLabelData, null );

    }

    public highlight_timestamp( timestamp: number | null ){
        const currentLabelData: { [id: number] : { value: string | number, timestamp: number }[] } = this.indexedLabels[this.selectedLabel];
        this.update_render( currentLabelData, timestamp );
    }

    public cell_hovered( timestamp: number ): void {
        this.events['timestampselected'].emit({timestamp})
    }

}