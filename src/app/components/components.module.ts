import { UserCreateComponent } from './user-create/user-create.component';
import { UserDatagridComponent } from './user-datagrid/user-datagrid.component';
import { UserGroupDatagridComponent } from './user-group-datagrid/user-group-datagrid.component';
import { ApprovalFlowDatagridComponent } from './approval-flow-datagrid/approval-flow-datagrid.component';
import { ApprovalFlowCreateComponent } from './approval-flow-create/approval-flow-create.component';
import { ActionFlowDatagridComponent } from './action-flow-datagrid/action-flow-datagrid.component';
import { ActionFlowCreateComponent } from './action-flow-create/action-flow-create.component';
import { UserGroupCreateComponent } from './user-group-create/user-group-create.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { RouterModule } from '@angular/router';
import { ClrDataModule, ClrIconModule, ClrModalModule, ClrFormsModule, ClrWizardModule, ClrAlertModule, ClrTabsModule, ClrStepperModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDatagridComponent } from './project-datagrid/project-datagrid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectTabPlayComponent } from './project-tab-play/project-tab-play.component';

const components: any[] = [
  ProjectDatagridComponent, ProjectCreateComponent, LoginFormComponent, UserGroupCreateComponent,
  ActionFlowCreateComponent, ActionFlowDatagridComponent, ApprovalFlowCreateComponent, ApprovalFlowDatagridComponent,
  ProjectTabPlayComponent, UserGroupDatagridComponent, UserDatagridComponent, UserCreateComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ClrIconModule,
    ClrFormsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ClrWizardModule,
    ClrAlertModule,
    ClrDataModule,
    ClrTabsModule,
    ClrModalModule,
    DragDropModule,
    ClrStepperModule,
  ],
  exports: components
})
export class ComponentsModule { }
