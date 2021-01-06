import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPlayComponent } from './project-play.component';

describe('ProjectPlayComponent', () => {
  let component: ProjectPlayComponent;
  let fixture: ComponentFixture<ProjectPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
