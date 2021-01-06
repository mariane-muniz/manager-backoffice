import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatagridComponent } from './user-datagrid.component';

describe('UserDatagridComponent', () => {
  let component: UserDatagridComponent;
  let fixture: ComponentFixture<UserDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
