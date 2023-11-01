export class ModelViewerParsers {

    /*
    * These functions will take the raw timestamp on the streams and transform into a global integer timestamp.
    */

    public static parse_stream_stream( streamName: string, stream: any ): any {

        switch(streamName){
            case 'detic:memory':
                return ModelViewerParsers.parse_memory_stream( stream );
            // case 'detic:image:misc:for3d':
            //     return ModelViewerParsers.parse_detic_image_misc( stream );
        }

    }

    // private static parse_detic_image_misc( stream ): any {

    //     const objectNames: string[] = stream.reduce( (labels, current) => {
    //         const currentObjects: Set<string> = current.objects.map( (object: any) => object.label);            
    //         currentObjects .forEach( (object: string) => {
    //             labels.add( object );
    //         })
    //         return labels;
    //     }, new Set());

    //     stream.forEach()


    //     return []
    // }

    private static parse_memory_stream( stream: any ): { [labelName: string]: { [id: number] : { value: string | number, timestamp: number }[] } } {

        const indexedIDs: { [labelName: string]: { [id: number] : { value: string | number, timestamp: number }[] } } = {};
        stream.forEach( (entry: any) => {

            const currentTimestamp: number = entry.timestamp;
            entry.values.forEach( (object: any) => {

                if( !(object.label in indexedIDs) ){
                    indexedIDs[object.label] = {};
                }

                if( !(object.id in indexedIDs[object.label] ) ){
                    indexedIDs[object.label][object.id] = [];
                }

                indexedIDs[object.label][object.id].push({ value: object.status, timestamp: currentTimestamp });            
            })
        });

        return indexedIDs;        

    }

    // parseing detic:memory stream
    private static parse_perception_stream( stream: any ): any {

        // getting all object names
        const entries: any = stream.map( (entry: any) => entry.values ).flat();
        
        const labels: { [label: string]: any } = {};
        entries.forEach( (entry: any) => {
            labels[entry.label] = { name: entry.label, values: [], confidence: 0.5, coverage: 0.5 };
        });

        stream.forEach( (entry: any) => {

            Object.keys(labels).forEach( (label: string) => {

                let flag: boolean = false;
                for( let i = 0; i < entry.values.length; i++){
                    if( entry.values[i].label === label ){
                        labels[label].values.push(1);
                        flag = true;
                        break;
                    }
                }

                if(!flag){
                    labels[label].values.push(0);
                }

            })
        })

        return Object.values( labels );
    }


}