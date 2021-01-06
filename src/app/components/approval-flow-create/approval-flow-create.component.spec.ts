import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalFlowCreateComponent } from './approval-flow-create.component';

describe('ApprovalFlowCreateComponent', () => {
  let component: ApprovalFlowCreateComponent;
  let fixture: ComponentFixture<ApprovalFlowCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalFlowCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalFlowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
