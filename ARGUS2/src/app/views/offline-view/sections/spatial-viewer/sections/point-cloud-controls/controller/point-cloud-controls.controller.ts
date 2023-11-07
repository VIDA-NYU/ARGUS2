import { EventEmitter } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

export class PointCloudControlsController{

    public pointClouds: string[] = [];

    constructor( public events: { [eventName: string]: EventEmitter<any>  }){}

    public on_style_change( objectName: string, styleName: string, value: number ): void{
        
        this.events['onstylechange'].emit( {
            objectName, styleName, value: value/10000
        });
        
    }

    public on_visibility_change( objectName: string, visible: MatCheckboxChange ): void {

        this.events['onvisibilitychange'].emit( {
            objectName,
            visible: visible.checked
        });
                
    }

}