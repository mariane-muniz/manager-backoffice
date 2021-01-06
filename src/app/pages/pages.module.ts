import { DragDropModule } from '@angular/cdk/drag-drop';
import { FragmentsModule } from './../fragments/fragments.module';
import { ComponentsModule } from './../components/components.module';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrIconModule, ClrModalModule } from '@clr/angular';
import { GroupsComponent } from './groups/groups.component';
import { ActionFlowComponent } from './action-flow/action-flow.component';
import { ApprovalFlowComponent } from './approval-flow/approval-flow.component';
import { ProjectPlayComponent } from './project-play/project-play.component';
import { UserComponent } from './user/user.component';

const components = [LoginComponent, DashboardComponent,
  ProjectsComponent, GroupsComponent, ActionFlowComponent,
  ApprovalFlowComponent, ProjectPlayComponent, UserComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    PagesRoutingModule,
    ClrFormsModule,
    ClrIconModule,
    ClrModalModule,
    FormsModule,
    FragmentsModule,
    ComponentsModule,
    DragDropModule
  ]
})
export class PagesModule { }
