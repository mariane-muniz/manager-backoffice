import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFlowDatagridComponent } from './action-flow-datagrid.component';

describe('ActionFlowDatagridComponent', () => {
  let component: ActionFlowDatagridComponent;
  let fixture: ComponentFixture<ActionFlowDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionFlowDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFlowDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
