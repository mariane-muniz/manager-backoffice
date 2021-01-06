import { ApprovalFlowEntity } from './../../entities/approval-flow.entity';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActionFlowEntity } from './../../entities/action-flow.entity';
import { ActionFlowService } from './../../service/action-flow.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEnum } from 'src/app/enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ApprovalFlowService } from './../../service/approval-flow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-flow-create-component',
  templateUrl: './approval-flow-create.component.html',
  styleUrls: ['./approval-flow-create.component.sass']
})
export class ApprovalFlowCreateComponent implements OnInit {
  public isModalVisible: string;

  public code: string;
  public form: FormGroup;
  public actionFlowList: ActionFlowEntity[] = [];
  public selectedActionFlowList: ActionFlowEntity[] = [];

  constructor(
    private approvalFlowService: ApprovalFlowService,
    private actionFlowService: ActionFlowService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.openModal();
    this.getActionFlowList();
    this.setNewForm(null);
  }

  submit(): void {
    if (this.form.valid) {
      const approvalFlowEntity: ApprovalFlowEntity = new ApprovalFlowEntity();
      approvalFlowEntity.name = this.form.value.name;
      approvalFlowEntity.code = this.code;
      approvalFlowEntity.actionFlowCodes = this.getSelectedActionFlowCodeList();

      this.approvalFlowService.registerApprovalFlow(approvalFlowEntity).subscribe(() => {
        EventEmitterService.get(EventEnum.approvalFlowModification).emit();
        this.isModalVisible = '';
      });
    }
  }

  private setNewForm(code: string): void {
    this.code = code;
    this.getActionFlowList();

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (code !== null) {
      this.fillNewFormWithEntityData(code);
    }
  }

  private fillNewFormWithEntityData(code: string): void {
    this.approvalFlowService.findOneApprovalFlowByCode(code).valueChanges.subscribe(result => {
      const selectedActionFlowCodes: string[] = [];
      const json = JSON.parse(JSON.stringify(result.data.findOneApprovalFlowByCode));

      json.actionFlowList.forEach(actionFlow => selectedActionFlowCodes.push(actionFlow.code));

      this.selectedActionFlowList = this.actionFlowList.filter(function(actionFlow) {
        return selectedActionFlowCodes.includes(actionFlow.code);
      });

      this.selectedActionFlowList.reverse();

      this.actionFlowList = this.actionFlowList.filter(function(actionFlow) {
        return !selectedActionFlowCodes.includes(actionFlow.code);
      });

      this.form = this.formBuilder.group({
        name: [json.name, [Validators.required]],
      });
    });
  }

  private openModal(): void {
    EventEmitterService.get(EventEnum.openApprovalFlowRegisterForm).subscribe(code => {
      this.isModalVisible = 'open';
      this.selectedActionFlowList = [];
      this.setNewForm(code);
    });
  }

  private getActionFlowList(): void {
    this.actionFlowService.findLastActionFlowRegisters().valueChanges.subscribe(result => {
      this.actionFlowList = JSON.parse(JSON.stringify(result.data.findLastActionFlowRegisters));
    });
  }

  private getSelectedActionFlowCodeList(): string[] {
    const codes: string[] = [];
    this.selectedActionFlowList.forEach(actionFlow => codes.push(actionFlow.code));
    return codes;
  }

  public drop(event: CdkDragDrop<ActionFlowEntity[]>): void {
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
