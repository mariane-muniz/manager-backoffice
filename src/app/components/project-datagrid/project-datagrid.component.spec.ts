import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDatagridComponent } from './project-datagrid.component';

describe('ProjectDatagridComponent', () => {
  let component: ProjectDatagridComponent;
  let fixture: ComponentFixture<ProjectDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
