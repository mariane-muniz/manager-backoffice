import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFlowCreateComponent } from './action-flow-create.component';

describe('ActionFlowCreateComponent', () => {
  let component: ActionFlowCreateComponent;
  let fixture: ComponentFixture<ActionFlowCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionFlowCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFlowCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
