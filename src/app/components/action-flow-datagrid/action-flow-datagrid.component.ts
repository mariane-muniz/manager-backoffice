import { EventEnum } from 'src/app/enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ActionFlowService } from './../../service/action-flow.service';
import { ActionFlowEntity } from './../../entities/action-flow.entity';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-flow-datagrid-component',
  templateUrl: './action-flow-datagrid.component.html',
  styleUrls: ['./action-flow-datagrid.component.sass']
})
export class ActionFlowDatagridComponent implements OnInit {

  public selected: ActionFlowEntity[] = [];
  public projectList: ActionFlowEntity[] = [];
  public columns: string[] = ['name'];

  public constructor(
    private actionFlowService: ActionFlowService
  ) { }

  public ngOnInit(): void {
    this.updateLastActionFlows();
    EventEmitterService
      .get(EventEnum.actionFlowModification)
      .subscribe(() => {
        this.updateLastActionFlows();
      });
  }

  public openActionFlowRegisterForm(): void {
    EventEmitterService.get(EventEnum.openActionFlowRegisterForm).emit(null);
  }

  private updateLastActionFlows(): void {
    this.actionFlowService.findLastActionFlowRegisters().valueChanges.subscribe(result => {
      this.projectList = result.data.findLastActionFlowRegisters;
    });
  }

  public editActionFlow(): void {
    if (this.selected.length > 0) {
      EventEmitterService.get(EventEnum.openActionFlowRegisterForm).emit(this.selected.shift().code);
    }
  }

  public deleteActionFlow(): void {
    if (this.selected.length > 0) {
      this.actionFlowService.deleteActionFlow(this.selected).subscribe(result => {
        EventEmitterService.get(EventEnum.actionFlowModification).emit();
      });
    }
  }
}
