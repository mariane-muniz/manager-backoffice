import { UserGroupEntity } from './../../entities/user-group.entity';
import { UserService } from './../../service/user.service';
import { UserEntity } from './../../entities/user.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEnum } from './../../enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { UserGroupService } from './../../service/user-group.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-group-create-component',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.sass']
})
export class UserGroupCreateComponent implements OnInit{

  public isModalVisible: string;
  public form: FormGroup;
  public selected: UserEntity[] = [];
  public columns: string[] = ['name'];
  public users: UserEntity[] = [];
  public userGroup: UserGroupEntity;

  constructor(
    private userGroupService: UserGroupService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.openModal();
    this.setNewForm(null);
    this.getUsers();
  }

  submit(): void {
    if (this.form.valid) {
      this.userGroup.name = this.form.value.name;
      this.userGroup.activity = true; // TODO adjust the form for active attribute
      this.userGroup.userCodes = this.getSelectedUserCodes();

      this.userGroupService.createUserGroup(this.userGroup).subscribe(() => {
        EventEmitterService.get(EventEnum.userGroupModification).emit();
        this.isModalVisible = '';
      });
    }
  }

  private getSelectedUserCodes(): string[] {
    const codes: string[] = [];
    this.selected.forEach(user => codes.push(user.code));
    return codes;
  }

  private setNewForm(code: string): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (code !== null) {
      this.populateUserGroupInformation(code);
    }
  }

  private populateUserGroupInformation(code: string): void {
    this.userGroupService.findOneUserGroupByCode(code).valueChanges.subscribe(result => {
      const json = JSON.parse(JSON.stringify(result.data.findOneUserGroupByCode));

      this.form = this.formBuilder.group({
        name: [json.name, [Validators.required]],
      });

      json.users.forEach(jsonUser => {
        this.users.forEach(user => {
          if (jsonUser.code === user.code) {
            this.selected.push(user);
          }
        });
      });
    });
  }

  private openModal(): void {
    EventEmitterService.get(EventEnum.openUserGroupRegisterForm).subscribe(code => {
      this.userGroup = new UserGroupEntity();
      this.userGroup.code = code;
      this.isModalVisible = 'open';
      this.selected = [];
      this.setNewForm(code);
    });
    EventEmitterService.get(EventEnum.userGroupModification).emit(null);
  }

  private getUsers(): void {
    this.userService.findLastUserRegisters().valueChanges.subscribe(result => {
      this.users = result.data.findLastUserRegisters;
    });
  }
}
