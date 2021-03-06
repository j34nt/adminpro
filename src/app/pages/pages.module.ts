import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';

// routes
import { PAGES_ROUTES } from './pages.routes';

import { PipesModule } from '../pipes/pipes.module';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonasComponent } from '../components/grafica-donas/grafica-donas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadsComponent } from '../components/modal-uploads/modal-uploads.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        // PagesComponent,
        IncrementadorComponent,
        GraficaDonasComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadsComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        // PagesComponent
    ],
    providers: [],
})
export class PagesModule {}
