import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BlankComponent } from './views/blank/blank.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { ProjectsComponent } from './project/projects/projects.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';

import { TutorialsAddComponent } from './components/tutorials-add/tutorials-add.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialsDetailsComponent } from './components/tutorials-details/tutorials-details.component';
import { TutorialsEditComponent } from './components/tutorials-edit/tutorials-edit.component';

import { UpdatesComponent } from './pages/updates/updates.component';
import { ListeUsersComponent } from './pages/liste-users/liste-users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { GestionDepartComponent } from './pages/gestion-depart/gestion-depart.component';
import { AjouterdepartComponent } from './pages/ajouterdepart/ajouterdepart.component';

const routes: Routes = [
  { path: '', component: LoginComponent , canActivate: [NonAuthGuard] },
  
  {
    path: 'home',
    component: MainComponent,
    
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'blank', component: BlankComponent },
      { path: 'update', component: UpdatesComponent },
      { path: 'list-user', component: ListeUsersComponent },
      { path: 'ajout', component: AddUserComponent },
      { path: 'gestserv', component: GestionDepartComponent },
      { path: 'ajouterdepart', component: AjouterdepartComponent },
      { path: 'tutorials', component: TutorialsListComponent },
      { path: 'project', component: ProjectsComponent },
      { path: 'addproject', component: ProjectAddComponent },
      { path: 'tutorials/details/:id', component: TutorialsDetailsComponent },
      { path: 'tutorials/edit/:id', component: TutorialsEditComponent },
    ],
  },
 
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
