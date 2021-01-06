import { Feature } from './../../entities/feature.entity';
import { FeatureService } from './../../service/feature.service';
import { ActionFlowEntity } from './../../entities/action-flow.entity';
import { UserGroupEntity } from './../../entities/user-group.entity';
import { UserGroupService } from './../../service/user-group.service';
import { EventEnum } from 'src/app/enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ActionFlowService } from './../../service/action-flow.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-action-flow-create-component',
  templateUrl: './action-flow-create.component.html',
  styleUrls: ['./action-flow-create.component.sass']
})
export class ActionFlowCreateComponent implements OnInit {

  public isModalVisible: string;
  public actionFlow: ActionFlowEntity = new ActionFlowEntity();
  public userGroupList: UserGroupEntity[];
  public form: FormGroup;
  public features: Feature[] = [];

  public availableUserGroupList: UserGroupEntity[] = [];
  public availableApprovalGroupList: UserGroupEntity[] = [];
  public confirmedUserGroupList: UserGroupEntity[] = [];
  public confirmedApprovalGroupList: UserGroupEntity[] = [];

  constructor(
    private actionFlowService: ActionFlowService,
    private userGroupService: UserGroupService,
    private featureService: FeatureService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setNewForm(null);
    this.openModal();
    this.getAllUserGroups();
    this.getFeatures();
  }

  submit(): void {
    if (this.form.valid) {
      this.actionFlow.name = this.form.value.name;
      this.actionFlow.featureCode = this.form.value.feature;
      this.actionFlow.userGroupCodes = this.getSelectedUserGroupCodes();
      this.actionFlow.approvalGroupCodes = this.getSelectedApprovalGroupCodes();

      this.actionFlowService.registerActionFlow(this.actionFlow).subscribe(result => {
        EventEmitterService.get(EventEnum.actionFlowModification).emit();
        this.isModalVisible = '';
        this.setNewForm(null);
      });
    }
  }

  private getFeatures(): void {
    this.featureService.findLastFeatureRegisters().valueChanges.subscribe(result => {
      this.features = result.data.findLastFeatureRegisters;
    });
  }

  private getSelectedApprovalGroupCodes(): string[] {
    const userGroupCodes: string[] = [];
    this.confirmedApprovalGroupList.forEach(userGroup => userGroupCodes.push(userGroup.code));
    return userGroupCodes;
  }

  private getSelectedUserGroupCodes(): string[] {
    const userGroupCodes: string[] = [];
    this.confirmedUserGroupList.forEach(userGroup => userGroupCodes.push(userGroup.code));
    return userGroupCodes;
  }

  private setNewForm(code: string): void {
    this.getAllUserGroups();
    this.actionFlow = new ActionFlowEntity();
    this.confirmedUserGroupList = [];
    this.confirmedApprovalGroupList = [];

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      feature: [null, [Validators.required]]
    });

    if (code !== null) {
      this.setActionFlowEntity(code);
    }
  }

  private setActionFlowEntity(code: string): void {
    this.actionFlowService.findOneActionFlowByCode(code).valueChanges.subscribe(result => {

      const confirmedUserGroupCodeList: string[] = [];
      const confirmedApprovalGroupCodeList: string[] = [];

      const json = JSON.parse(JSON.stringify(result.data.findOneActionFlowByCode));

      this.actionFlow.code = json.code;
      this.actionFlow.name = json.name;
      this.actionFlow.featureCode = json.feature.code;
      this.confirmedUserGroupList = JSON.parse(JSON.stringify(json.userGroups));
      this.confirmedApprovalGroupList = JSON.parse(JSON.stringify(json.approvalGroups));

      this.confirmedUserGroupList.forEach(confirmed => confirmedUserGroupCodeList.push(confirmed.code));
      this.confirmedApprovalGroupList.forEach(confirmed => confirmedApprovalGroupCodeList.push(confirmed.code));

      this.availableUserGroupList = this.userGroupList.filter(function(value): boolean {
        return !confirmedUserGroupCodeList.includes(value.code);
      });

      this.availableApprovalGroupList = this.userGroupList.filter(function(value): boolean {
        return !confirmedApprovalGroupCodeList.includes(value.code);
      });

      this.form = this.formBuilder.group({
        name: [this.actionFlow.name, [Validators.required]],
        feature: [this.actionFlow.featureCode, [Validators.required]]
      });
    });
  }

  private getAllUserGroups(): void {
    this.userGroupService.findLastRegisters().valueChanges.subscribe(result => {
      this.userGroupList = JSON.parse(JSON.stringify(result.data.findLastUserGroupRegisters));
    });
  }

  private openModal(): void {
    EventEmitterService.get(EventEnum.openActionFlowRegisterForm).subscribe(code => {
      this.isModalVisible = 'open';
      this.setNewForm(code);
    });
  }

  public drop(event: CdkDragDrop<UserGroupEntity[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
