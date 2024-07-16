import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'flight-form', component: FlightFormComponent, canActivate: [AuthGuard] }
];