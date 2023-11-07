export class PointCloudParsers {

    public static parse_stream_into_pointcloud( streamName: string, stream: any ): any  {

        switch(streamName) {
            case 'voxelized-pointcloud':
                return PointCloudParsers.parse_world_point_cloud( stream );
            case 'eye':
                return PointCloudParsers.parse_eye_point_cloud( stream );
            case 'hand':
                return PointCloudParsers.parse_hand_point_cloud( stream );
            case 'detic:memory':
                return PointCloudParsers.parse_memory_point_cloud( stream );
            case 'reasoning:check_status':
                return PointCloudParsers.parse_reasoning_point_cloud( stream );
          }
    }

    private static parse_reasoning_point_cloud( stream: any ): { [task: number]: { positions: number[][], colors: number[][], normals: number[][], meta: any[] } } {
        
        const taskIDs: { [task: number]: { positions: number[][], colors: number[][], normals: number[][], meta: any[] } } = {};
        stream.forEach( (entry: any) => {

            entry.active_tasks.forEach( (task: any) => {

                if( !(task.task_id in taskIDs) ){
                    taskIDs[task.task_id] = { positions: [], colors: [], normals: [], meta: [] };
                }

                task.objects.forEach( (object: any) => {
                    taskIDs[task.task_id].positions.push(object.pos);
                    taskIDs[task.task_id].meta.push({timestamp: entry.timestamp});
                })
            })
        });

        return taskIDs;
    }

    private static parse_eye_point_cloud( stream: any ): any {

        let positions: number[][] = [];
        let timestamps: any[] = [];
        stream.forEach( ( measure: any ) => {

            const currentPosition: number[] = [ measure.GazeOrigin.x, measure.GazeOrigin.y, (-1)*measure.GazeOrigin.z ];
            const currentTimestamp: any = {'timestamp': measure.timestamp};

            positions.push( currentPosition );
            timestamps.push( currentTimestamp );
        
        });

        return { positions, colors: [], normals: [], meta: timestamps };
    }

    private static parse_hand_point_cloud( stream: any ): any {

        console.log( 'HAND: ', stream );

        return { positions: [], colors: [], normals: [], meta: [] };
    }

    private static parse_memory_point_cloud( stream: any ): any {

        const timestamps: { [name: string]: number[] } = {};
        const objects: { [name: string]: number[][] } = {};

        stream.forEach( (entry: any) => {
            
            const currentTimestamp: number = entry.timestamp;
            entry.values.forEach( (label: {pos: number[], label: string, status: string, last_seen: number}) => {
                
                if( !(label.label in objects) ){
                    timestamps[label.label] = [];
                    objects[label.label] = [];
                }

                timestamps[label.label].push( currentTimestamp );
                objects[label.label].push( label.pos );

            })
        })


        const pointClouds: { [name: string]: { positions: number[][], colors: number[][], normals: number[][], meta: any[] } } = {};
        Object.keys( objects ).forEach( ( label: string ) => {

            pointClouds[ label ] = {
                positions: objects[label],
                colors: [],
                normals: [],
                meta: timestamps[ label ]
            }
        })


        return pointClouds;
    }

    private static parse_world_point_cloud( stream: any ): any {

        // const positions = stream.xyz_world
        // const colors = stream.colors;

        const positions = []
        const colors = [];

        // TODO: Removing hands manually
        stream.xyz_world.forEach( (position: number[], index: number) => {

            positions.push(position);
            colors.push(stream.colors[index]);
            
            // if(position[1] < -0.79){}
        })

        return { positions, colors, normals: [], meta: [] };
    }
}