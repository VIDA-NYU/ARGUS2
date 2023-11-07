import { EventEmitter } from "@angular/core";

export class QueryBarController {

    constructor( private events: { [eventName: string]: EventEmitter<any> } ){}

    public on_query_button_click(): void {
        this.events['querybuttonclicked'].emit();
    }

    public on_annotation_button_click(): void {
        this.events['annotationbuttonclicked'].emit();
    }


}