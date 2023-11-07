export class ModelViewerParsers {

    /*
    * These functions will take the raw timestamp on the streams and transform into a global integer timestamp.
    */

    public static parse_stream_stream( streamName: string, stream: any ): any {

        switch(streamName){
            case 'detic:memory':
                return ModelViewerParsers.parse_memory_stream( stream );
            case 'reasoning:check_status':
                return ModelViewerParsers.parse_reasoning_stream( stream );
            case 'reasoning:check_status_db':
                return ModelViewerParsers.parse_reasoning_smooth_stream( stream );
            case 'detic:image:misc:for3d':
                return ModelViewerParsers.parse_perception_stream( stream );
            
        }

    }

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

    private static parse_reasoning_smooth_stream( stream: any ): any {

        const tasks: { [task: string]: { step: number, timestamp: number, error: boolean }[] } = {};
        stream.forEach( (row: any) => {

            // if( 'values' in row )

            const currentTimestamp: number = row.timestamp; // parseInt( .split('-')[0] );
            // row.active_tasks.forEach( (activeTask: any) => {

            if( ! (row.task_id in tasks) ){
                tasks[row.task_id] = [];
            }

            tasks[row.task_id].push( {timestamp: currentTimestamp, step: row.step_num, error: false });

            // })
        });

        return tasks;

    }

    private static parse_reasoning_stream( stream: any ): any {

        const tasks: { [task: string ]: { step: number, timestamp: number, error: boolean }[] } = {};
        stream.forEach( (row: any) => {

            const currentTimestamp: number = row.timestamp; // parseInt( .split('-')[0] );
            row.active_tasks.forEach( (activeTask: any) => {

                if( ! (activeTask.task_id in tasks) ){
                    tasks[activeTask.task_id] = [];
                }

                tasks[activeTask.task_id].push( {timestamp: currentTimestamp, step: activeTask.step_id, error: activeTask.error_status });

            })
        });

        return tasks;

    }

    // parseing detic:memory stream
    private static parse_perception_stream( stream: any ): any {

        const indexedLabels: { [label: string]: { values: number[], timestamps: number[] } } = {};
        stream.forEach( (entry: any) => {
    
            const currentTimestamp: number = entry.timestamp;
    
            const detectedObjects: { [label:string]: number } = {};
            entry.objects.forEach( (object: any) => {
                detectedObjects[object.label] = object.confidence;
            });
    
            Object.keys( detectedObjects ).forEach( (key: string) => {
    
                if( !(key in indexedLabels) ){
                    indexedLabels[key] = { values: [], timestamps: [] };
                }
                indexedLabels[key].values.push( detectedObjects[key] );
                indexedLabels[key].timestamps.push( currentTimestamp );
            });
    
        })
    
        const parsedData: any[] = [];
        const maxCount = Object.values(indexedLabels).reduce( (a, b) => {
            if( a < b.timestamps.length ) return b.timestamps.length
            return a;
        }, 0)
        Object.keys( indexedLabels ).forEach( (key: string) => {
            parsedData.push(
                { 
                    name: key, 
                    values: indexedLabels[key].values, 
                    timestamps: indexedLabels[key].timestamps, 
                    confidence: indexedLabels[key].values.reduce((a, b) => a + b) / indexedLabels[key].values.length, 
                    coverage: indexedLabels[key].timestamps.length/maxCount
                }
            )
        });

        // console.log(parsedData);
        // const indexedLabels: { [labels: string]: number[] } = {};
        // stream.forEach( (entry: any, index: number) => {
        //     entry.objects.forEach( ( object: any ) => {
        //         indexedLabels[object.label] = [];
        //     })
        // });

        // stream.forEach( (entry: any, index: number) => {
        //     for(let i = 0; i < entry.objects.length; i++ ){
        //         if( indexedLabels[entry.objects[i].label].length <= index ){
        //             indexedLabels[entry.objects[i].label].push( entry.objects[i].confidence );
        //         }
        //     }

        //     Object.keys( indexedLabels ).forEach( (label: string) => {
        //         if( indexedLabels[label].length <= index ){
        //             indexedLabels[label].push( 0 );
        //         }
        //     })

        // });

        // const parsedData: any[] = [];
        // Object.keys( indexedLabels ).forEach( (label: string) => {
        //     const currentObj: any = {
        //         name: label,
        //         values: indexedLabels[label],
        //         confidence: 0.5,
        //         coverage: 0.5
        //     }

        //     parsedData.push( currentObj );
        // })
    
        // return parsedData;
        // console.log('Parsed data: ', parsedData);
        return parsedData;

    }


}