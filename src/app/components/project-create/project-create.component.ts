import { UserService } from './../../service/user.service';
import { UserEntity } from './../../entities/user.entity';
import { ApprovalFlowService } from './../../service/approval-flow.service';
import { ProjectEntity } from './../../entities/project.entity';
import { EventEnum } from './../../enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ProjectService } from '../../service/project.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovalFlowEntity } from 'src/app/entities/approval-flow.entity';

@Component({
  selector: 'app-project-create-component',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})
export class ProjectCreateComponent implements OnInit {

  public userList: UserEntity[] = [];
  public project: ProjectEntity = new ProjectEntity();
  public isModalVisible: string;
  public form: FormGroup;
  public columns: string[] = ['name'];
  public selected: UserEntity[] = [];
  public approvalFlowList: ApprovalFlowEntity[];
  public priorityList: string[] = ['HIGH', 'MEDIUM', 'LOW'];
  public statusList: string[] = ['NOT_INITIATED', 'ANALYSES', 'PAUSED', 'REJECTED', 'APPROVED'];

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private approvalFlowService: ApprovalFlowService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.project.code = null;
    this.getApprovalFlowList();
    this.getUserList();
    this.setNewForm();
    this.openModal();
  }

  submit(): void {
    if (this.form.valid) {
      this.project.name = this.form.value.name;
      this.project.jiraID = this.form.value.jiraID;
      this.project.approvalFlowCode = this.form.value.approvalFlowCode;
      this.project.priorityCode = this.form.value.priorityCode;
      this.project.statusCode = this.form.value.statusCode;
      this.project.userCodes = this.getSelectedUserCodeList();

      this.projectService.create(this.project).subscribe(() => {
        EventEmitterService.get(EventEnum.projectModification).emit();
        this.isModalVisible = '';
      });
    }
  }

  private setNewForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      jiraID: [null, [Validators.required]],
      statusCode: [null, [Validators.required]],
      priorityCode: [null, [Validators.required]],
      approvalFlowCode: [null, [Validators.required]]
    });

    if (this.project.code !== null) {
      this.fillProjectForm();
    }
  }

  private fillProjectForm(): void {
    this.projectService.findOneByCode(this.project.code).valueChanges.subscribe(result => {
      const json = JSON.parse(JSON.stringify(result.data.findOneProjectByCode));
      const jsonUsers: UserEntity[] = json.users;

      this.form = this.formBuilder.group({
        name: [json.name, [Validators.required]],
        jiraID: [json.jiraID, [Validators.required]],
        statusCode: [json.status, [Validators.required]],
        priorityCode: [json.priority, [Validators.required]],
        approvalFlowCode: [json.approvalFlow.code, [Validators.required]]
      });

      jsonUsers.forEach(user => {
        this.userList.forEach(iten => {
          if (iten.code === user.code) {
            this.selected.push(iten);
          }
        });
      });
    });
  }

  private openModal(): void {
    EventEmitterService.get(EventEnum.openProjectRegisterForm).subscribe(code => {
      this.isModalVisible = 'open';
      this.project = new ProjectEntity();
      this.project.code = code;
      this.setNewForm();
    });
  }

  private getApprovalFlowList(): void {
    this.approvalFlowService.findLastApprovalFlowRegisters().valueChanges.subscribe(result => {
      this.approvalFlowList = JSON.parse(JSON.stringify(result.data.findLastApprovalFlowRegisters));
    });
  }

  private getUserList(): void {
    this.userService.findLastUserRegisters().valueChanges.subscribe(result => {
      this.userList = JSON.parse(JSON.stringify(result.data.findLastUserRegisters));
    });
  }

  private getSelectedUserCodeList(): string[] {
    const codes: string[] = [];
    this.selected.forEach(seletedUser => codes.push(seletedUser.code));
    return codes;
  }
}
