import { NgModule } from "@angular/core";

// material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';


const MATERIAL_MODULES = [

    MatToolbarModule,   MatSlideToggleModule,
    MatButtonModule,    MatIconModule,
    MatSidenavModule,   MatSliderModule,
    MatDialogModule,    MatMenuModule,
    MatSelectModule,    MatDividerModule,
    MatGridListModule,  MatProgressSpinnerModule,   
    MatFormFieldModule, MatInputModule,
    MatExpansionModule, MatCheckboxModule
]

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})

export class MaterialModule{};