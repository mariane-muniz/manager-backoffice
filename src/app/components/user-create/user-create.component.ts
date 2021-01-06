import { UserEntity } from './../../entities/user.entity';
import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEnum } from 'src/app/enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create-component',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent  implements OnInit {
  public isModalVisible: string;

  public code: string;
  public form: FormGroup;
  public user: UserEntity;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.openModal();
    this.setNewForm(null);
  }

  submit(): void {
    if (this.form.valid) {
      const user: UserEntity = new UserEntity();
      user.name = this.form.value.name;
      user.code = this.code;

      this.userService.createUser(user).subscribe(() => {
        EventEmitterService.get(EventEnum.userModification).emit(null);
        this.isModalVisible = '';
      });
    }
  }

  private setNewForm(code: string): void {
    this.code = code;

    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    if (code !== null) {
      this.fillNewFormWithEntityData(code);
    }
  }

  private fillNewFormWithEntityData(code: string): void {
    this.userService.findOneUserByCode(code).valueChanges.subscribe(result => {
      const json = JSON.parse(JSON.stringify(result.data.findOneUserByCode));
      this.form = this.formBuilder.group({
        name: [json.name, [Validators.required]],
      });
    });
  }

  private openModal(): void {
    EventEmitterService.get(EventEnum.openUserRegisterForm).subscribe(code => {
      this.isModalVisible = 'open';
      this.setNewForm(code);
    });
  }
}
