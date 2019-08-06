import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        ModalUploadsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
        ModalUploadsComponent

    ],
    providers: [],
})
export class SharedModule {}
