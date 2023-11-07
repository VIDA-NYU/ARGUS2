export class TimestampParsers {


    public static index_stream_timestamps( streamName: string, stream: any ): any {

        switch( streamName ){
            case 'eye':
                return TimestampParsers.static_index_eye_point_cloud( stream );
            case 'hand':
                return TimestampParsers.static_index_hand_point_cloud( stream );
            // case ''
        }

    }

    public static static_index_eye_point_cloud( stream: any ): {[ timestamp: number ]: number }{

        const indexedTimestamp: {[ timestamp: number ]: number } = {};
        stream.forEach( (measurement: any, index: number) => {
            indexedTimestamp[measurement.timestamp] = index;
        });

        return indexedTimestamp;
    }

    public static static_index_hand_point_cloud( stream: any ): {[ timestamp: number ]: number }{

        return {};
    }



    /*
    * These functions will take the raw timestamp on the streams and transform into a global integer timestamp.
    */

    public static parse_stream_timestamp( streamName: string, stream: any, firstEntry: number ): any {

        switch(streamName){
            case 'voxelized-pointcloud':
                return TimestampParsers.parse_world_point_cloud( stream, firstEntry );
            case 'eye':
                return TimestampParsers.parse_eye_point_cloud( stream, firstEntry );
            // case 'hand':
            //     return TimestampParsers.parse_hand_point_cloud( stream, firstEntry );
            case 'detic:memory':
                return TimestampParsers.parse_memory_point_cloud( stream, firstEntry );
            case 'detic:image:misc:for3d':
                return TimestampParsers.parse_detic_image_misc_output( stream, firstEntry );
            case 'reasoning:check_status':
                return TimestampParsers.parse_reasoning_output( stream, firstEntry );
            case 'reasoning:check_status_db':
                return TimestampParsers.parse_reasoning_smooth_output( stream, firstEntry );
        }

    }

    private static parse_reasoning_smooth_output( stream: any, firstEntry: number ): any{

        const normalizedStream: any[] = [];
        for( let i = 0; i < stream.length; i++ ){

            if( 'values' in stream[i] ){
                continue;
            }
            
            const normalizedTimestamp: number = stream[i].timestamp.split('-')[0] - firstEntry;
            normalizedStream.push({...stream[i], timestamp: normalizedTimestamp })

        }

        return normalizedStream;

    }

    private static parse_detic_image_misc_output( stream: any, firstEntry: number ): any {

        const normalizedStream: any[] = [];
        stream.forEach( (entry: any) => {

            if( entry.objects ){
                const normalizedTimestamp: number = entry.timestamp.split('-')[0] - firstEntry;
                normalizedStream.push({...entry, timestamp: normalizedTimestamp })
            }

        })
        
        return normalizedStream;
    }

    private static parse_reasoning_output( stream: any, firstEntry: number ): any {

        const normalizedStream: any[] = [];
        stream.forEach( (entry: any) => {

            const normalizedTimestamp: number = entry.timestamp.split('-')[0] - firstEntry;
            normalizedStream.push({...entry, timestamp: normalizedTimestamp})

        })

        return normalizedStream;
    }

    private static parse_memory_point_cloud( stream: any, firstEntry: number ): any {

        const normalizedStream: any[] = [];
        stream.forEach( (measurement: any) => {
            const timestamp: number = parseInt(measurement.timestamp.split('-')[0]); 
            const normalizedTimestamp: number = timestamp - firstEntry;
            normalizedStream.push( { ...measurement, timestamp: normalizedTimestamp} )
        });

        return normalizedStream;
    }


    private static parse_world_point_cloud( stream: any, firstEntry: number ): number[] {
        return stream;
    }

    private static parse_eye_point_cloud( stream: any, firstEntry: number ): any {

        const normalizedStream: any[] = [];
        stream.forEach( (measurement: any) => {
            const timestamp: number = parseInt(measurement.timestamp.split('-')[0]); 
            const normalizedTimestamp: number = timestamp - firstEntry;
            normalizedStream.push( { ...measurement, timestamp: normalizedTimestamp} )
        });

        return normalizedStream;
    }

    // private static parse_hand_point_cloud( stream: any, firstEntry: number ): number[] {
    //     return []
    // }

}