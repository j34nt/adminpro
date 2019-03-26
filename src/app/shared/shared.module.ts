import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [ CommonModule, RouterModule, PipesModule ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent

    ],
    providers: [],
})
export class SharedModule {}
