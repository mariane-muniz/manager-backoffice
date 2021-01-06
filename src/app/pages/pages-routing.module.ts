import { UserComponent } from './user/user.component';
import { ProjectPlayComponent } from './project-play/project-play.component';
import { ApprovalFlowComponent } from './approval-flow/approval-flow.component';
import { ActionFlowComponent } from './action-flow/action-flow.component';
import { GroupsComponent } from './groups/groups.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'groups',
    component: GroupsComponent
  },
  {
    path: 'action-flows',
    component: ActionFlowComponent
  },
  {
    path: 'approval-flows',
    component: ApprovalFlowComponent
  },
  {
    path: 'project-play/:code',
    component: ProjectPlayComponent
  },
  {
    path: 'users',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
