import { NgModule } from "@angular/core";
import { SessionPickerDialogComponent } from './session-picker-dialog/session-picker-dialog.component';
import { KeywordSearchBarComponent } from './session-picker-dialog/sections/keyword-search-bar/keyword-search-bar.component';
import { HistogramFiltersComponent } from './session-picker-dialog/sections/histogram-filters/histogram-filters.component';
import { ResultsListComponent } from './session-picker-dialog/sections/results-list/results-list.component';
import { MaterialModule } from "../material/material.module";
import { ResultCardComponent } from './session-picker-dialog/sections/results-list/result-card/result-card.component';
import { TemplatesModule } from "../templates/templates.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SessionAnnotationDialogComponent } from './session-annotation-dialog/session-annotation-dialog.component';

@NgModule({
    declarations: [
        SessionPickerDialogComponent,
        KeywordSearchBarComponent,
        HistogramFiltersComponent,
        ResultsListComponent,
        ResultCardComponent,
        SessionAnnotationDialogComponent
    ],
    imports: [
        MaterialModule,
        TemplatesModule,
        CommonModule,
        FormsModule
    ],
    exports: []
})
export class DialogsModule {}