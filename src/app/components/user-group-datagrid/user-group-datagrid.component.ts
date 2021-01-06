import { UserGroupService } from './../../service/user-group.service';
import { Component, OnInit } from '@angular/core';
import { UserGroupEntity } from 'src/app/entities/user-group.entity';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { EventEnum } from 'src/app/enums/eventEnum';

@Component({
  selector: 'app-user-group-datagrid-component',
  templateUrl: './user-group-datagrid.component.html',
  styleUrls: ['./user-group-datagrid.component.sass']
})
export class UserGroupDatagridComponent implements OnInit {

  public columns: string[] = ['name', 'active'];
  public selected: UserGroupEntity[] = [];
  public userGroupList: UserGroupEntity[] = [];

  public constructor(
    private userGroupService: UserGroupService
  ) { }

  public ngOnInit(): void {
    this.getUserGroupList();
    this.updateUserGroupList();
  }

  private updateUserGroupList(): void {
    EventEmitterService.get(EventEnum.userGroupModification).subscribe(() => {
      this.getUserGroupList();
    });
  }

  private getUserGroupList(): void {
    this.userGroupService.findLastRegisters().valueChanges.subscribe(result => {
      this.userGroupList = result.data.findLastUserGroupRegisters;
    });
  }

  public openUserGroupRegisterForm(): void {
    EventEmitterService.get(EventEnum.openUserGroupRegisterForm).emit(null);
  }

  public openEditUserGroupRegisterForm(): void {
    EventEmitterService.get(EventEnum.openUserGroupRegisterForm).emit(this.selected[0].code);
  }

  public deleteUserGroup(): void {
    this.userGroupService.deleteUserGroups(this.selected).subscribe(() => {
      this.getUserGroupList();
    });
  }
}
