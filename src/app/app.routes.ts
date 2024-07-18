import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { DocumentsComponent } from './views/admin/documents/documents.component';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { IndexComponent } from './views/index/index.component';
import { LandingComponent } from './views/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { VerifyComponent } from './views/verify/verify.component';
import { RolesComponent } from './views/admin/roles/roles.component';
import { UserDocumentsComponent } from './views/user-documents/user-documents.component';
import { LogsComponent } from './views/admin/logs/logs.component';

export const routes: Routes = [
     // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "documents", component: DocumentsComponent },
      { path: "roles", component: RolesComponent },
      { path: "logs", component: LogsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AuthGuard],
    data: {
      role: true,
    }
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ]
  },
  // no layout views
  { path: "landing", component: LandingComponent, canActivate: [AuthGuard] },
  { path: "verify", component: VerifyComponent, canActivate: [AuthGuard] },
  { path: "documents", component: UserDocumentsComponent , canActivate: [AuthGuard]},
  { path: "", component: IndexComponent , canActivate: [AuthGuard]},
  { path: "**", redirectTo: "", pathMatch: "full", canActivate: [AuthGuard] },
];