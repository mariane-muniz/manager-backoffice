import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowDatagridComponent } from './approval-flow-datagrid.component';

describe('ApprovalFlowDatagridComponent', () => {
  let component: ApprovalFlowDatagridComponent;
  let fixture: ComponentFixture<ApprovalFlowDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
