import { ModelViewer } from 'modelviewer';
import { ModelViewerParsers } from 'src/app/utils/parsers/modelviewer.parsers';

export class ModelViewerController {

    public modelViewer!: ModelViewer;
    public currentChartData!: any;

    constructor(){}

    public initialize_component( containerRef: HTMLDivElement ): void {

        // const callbacks: { [callbackName: string]: any } = {
        //     'mouseover': (index: number | null) => { this.cell_hovered(index) },
        //     'mouseout': (index: number | null) => { this.cell_hovered(index) }
        // }

        // this.modelViewer = new ModelViewer( containerRef, callbacks );
    }
    
    public update( streamName: string, streamData: any ): void {


        // console.log('UPDATING');
        // console.log(streamData);


        // const labels: { name: string, values: number[], confidence: number, coverage: number }[] = ModelViewerParsers.parse_stream_stream( streamName, streamData );

        // // binning

        // const data = {
        //     name: 'detic:memory',
        //     labels: labels
        // }

        // this.currentChartData = data;

        // this.modelViewer.update( this.currentChartData, null,  [0, 180000] );

    }

    public cell_hovered( index: number | null ): void {
        // this.modelViewer.update( this.currentChartData, index, [0, 180000] )
    }
    
    
}