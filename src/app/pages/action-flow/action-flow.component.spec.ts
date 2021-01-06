import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionFlowComponent } from './action-flow.component';

describe('ActionFlowComponent', () => {
  let component: ActionFlowComponent;
  let fixture: ComponentFixture<ActionFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
