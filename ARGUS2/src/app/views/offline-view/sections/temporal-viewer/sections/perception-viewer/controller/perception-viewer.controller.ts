import { EventEmitter } from "@angular/core";
import { ModelViewer } from "modelviewer";
import { ModelViewerParsers } from "src/app/utils/parsers/modelviewer.parsers";

export class PerceptionViewerController {

    // consts
    public streamName: string = 'detic:image:misc:for3d';
    public labels: string[] = [];
    public selectedLabels: string[] = [];

    public rawData: any[] = [];
    public filteredData: any[] = [];

    // viewer
    public perceptionViewer!: ModelViewer;

    // recipes
    // public indexedTasks: { [id: string]: { step: number; timestamp: number; error: boolean; }[]; } = {};

    // timestamps to indices
    // public indexedTimestamps: { [timestamp: number]: number } = {};

    constructor( public events: {[name: string]: EventEmitter<any>} ){}

    public initialize_component( containerRef: HTMLDivElement ): void {

        const callbacks: { [callbackName: string]: any } = {
            'mouseover': (timestamp: number | null) => { this.cell_hovered(timestamp) },
            'mouseout': (timestamp: number | null) => { this.cell_hovered(timestamp) }
        }

        this.perceptionViewer = new ModelViewer( containerRef, callbacks );

    }

    public update_dataset( streamName: string, streamData: any, labels: string[] ): void {

        const chartData: any = ModelViewerParsers.parse_stream_stream( streamName, streamData );
        this.labels = chartData.map( (label: any) => label.name);

        this.rawData = chartData;
    }

    public update_render( data: any, timestamp: number | null ): void {           
        this.perceptionViewer.update( {name: 'perception', labels: data }, timestamp );
    }

    public highlight_timestamp( timestamp: number | null ){
        this.update_render( this.filteredData, timestamp );
    }

    public change_labels( name: string, selection: boolean ): void {

        const labelSet: Set<string> = new Set( this.selectedLabels );

        if( selection ){
            labelSet.add( name );
        }else{
            labelSet.delete( name )
        }

        this.selectedLabels = Array.from( labelSet.values() );

        this.filteredData = this.rawData.filter( (label: any) => {
            return labelSet.has( label.name );
        });

        this.update_render( this.filteredData , null );

    }

    public cell_hovered( timestamp: number ): void {
        this.events['timestampselected'].emit({timestamp});
    }





}