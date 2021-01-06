import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTabPlayComponent } from './project-tab-play.component';

describe('ProjectTabPlayComponent', () => {
  let component: ProjectTabPlayComponent;
  let fixture: ComponentFixture<ProjectTabPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTabPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTabPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
