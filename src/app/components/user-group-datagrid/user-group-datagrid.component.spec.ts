import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupDatagridComponent } from './user-group-datagrid.component';

describe('UserGroupDatagridComponent', () => {
  let component: UserGroupDatagridComponent;
  let fixture: ComponentFixture<UserGroupDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
