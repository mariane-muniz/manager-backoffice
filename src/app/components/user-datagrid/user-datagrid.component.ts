import { UserEntity } from './../../entities/user.entity';
import { UserService } from './../../service/user.service';
import { EventEnum } from './../../enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-datagrid-component',
  templateUrl: './user-datagrid.component.html',
  styleUrls: ['./user-datagrid.component.sass']
})
export class UserDatagridComponent implements OnInit {

  public selected: UserEntity[] = [];
  public userList: UserEntity[] = [];
  public columns: string[] = ['name'];

  public constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.updateLastProjects();
    EventEmitterService
      .get(EventEnum.userModification)
      .subscribe(() => {
        this.updateLastProjects();
      });
  }

  public openUserRegisterForm(): void {
    EventEmitterService.get(EventEnum.openUserRegisterForm).emit(null);
  }

  public openProjectEditForm(): void {
    EventEmitterService.get(EventEnum.openUserRegisterForm).emit(this.selected[0].code);
  }

  private updateLastProjects(): void {
    this.userService.findLastUserRegisters().valueChanges.subscribe(result => {
      this.userList = result.data.findLastUserRegisters;
    });
  }

  public deleteUser(): void {
    if (this.selected.length > 0) {
      this.userService.deleteUsers(this.selected).subscribe(result => {
        EventEmitterService.get(EventEnum.userModification).emit();
      });
    }
  }
}
