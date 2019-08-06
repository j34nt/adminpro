import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const pagesRoute: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [VerificaTokenGuard] },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'} },
    // Mantenimiento
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Manteniminto de Usuarios' } },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Manteniminto de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Manteniminto de Medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medicos' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoute);
