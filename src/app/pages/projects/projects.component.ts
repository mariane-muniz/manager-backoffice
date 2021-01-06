import { ProjectEntity } from './../../entities/project.entity';
import { EventEnum } from './../../enums/eventEnum';
import { EventEmitterService } from './../../service/event-emitter.service';
import { ProjectService } from './../../service/project.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent {
}
