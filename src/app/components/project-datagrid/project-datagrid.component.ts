import { EventEnum } from './../../enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ProjectService } from './../../service/project.service';
import { ProjectEntity } from './../../entities/project.entity';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-datagrid',
  templateUrl: './project-datagrid.component.html',
  styleUrls: ['./project-datagrid.component.sass']
})
export class ProjectDatagridComponent implements OnInit {

  public selected: ProjectEntity[] = [];
  public projectList: ProjectEntity[] = [];
  public columns: string[] = ['name', 'status', 'priority'];

  public constructor(
    private projectService: ProjectService,
    private route: Router
  ) { }

  public ngOnInit(): void {
    this.updateLastProjects();
    EventEmitterService
      .get(EventEnum.projectModification)
      .subscribe(() => {
        this.updateLastProjects();
      });
  }

  public openProjectRegisterForm(): void {
    EventEmitterService.get(EventEnum.openProjectRegisterForm).emit(null);
  }

  public openProjectEditForm(): void {
    EventEmitterService.get(EventEnum.openProjectRegisterForm).emit(this.selected[0].code);
  }

  private updateLastProjects(): void {
    this.projectService.findLastProjectRegisters().valueChanges.subscribe(result => {
      this.projectList = result.data.findLastProjectRegisters;
    });
  }

  public deleteProject(): void {
    if (this.selected.length > 0) {
      this.projectService.delete(this.selected).subscribe(result => {
        EventEmitterService.get(EventEnum.projectModification).emit();
      });
    }
  }

  public playProject(): void {
    this.route.navigate(['project-play/' + this.selected.shift().code]);
  }
}
