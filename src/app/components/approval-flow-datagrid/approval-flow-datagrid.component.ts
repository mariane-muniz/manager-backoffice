import { EventEnum } from 'src/app/enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ApprovalFlowService } from './../../service/approval-flow.service';
import { ApprovalFlowEntity } from './../../entities/approval-flow.entity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-flow-datagrid-component',
  templateUrl: './approval-flow-datagrid.component.html',
  styleUrls: ['./approval-flow-datagrid.component.sass']
})
export class ApprovalFlowDatagridComponent implements OnInit {

  public columns: string[] = ['name'];
  public selected: ApprovalFlowEntity[] = [];
  public approvalFlowList: ApprovalFlowEntity[] = [];

  public constructor(
    private approvalFlowService: ApprovalFlowService
  ) { }

  public ngOnInit(): void {
    this.getApprovalFlowList();
    this.updateApprovalFlowList();
  }

  private updateApprovalFlowList(): void {
    EventEmitterService.get(EventEnum.approvalFlowModification).subscribe(result => {
      this.getApprovalFlowList();
    });
  }

  private getApprovalFlowList(): void {
    this.approvalFlowService.findLastApprovalFlowRegisters().valueChanges.subscribe(result => {
      this.approvalFlowList = result.data.findLastApprovalFlowRegisters;
    });
  }

  public openApprovalFlowRegisterForm(): void {
    EventEmitterService.get(EventEnum.openApprovalFlowRegisterForm).emit(null);
  }

  public deleteApprovalFlow(): void {
    this.approvalFlowService.deleteApprovalFlow(this.selected).subscribe(result => {
      this.getApprovalFlowList();
    });
  }

  public editApprovalFlow(): void {
    if (this.selected.length === 1) {
      EventEmitterService.get(EventEnum.openApprovalFlowRegisterForm).emit(this.selected[0].code);
    }
  }
}
