import { Component, OnInit } from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {TaskModel} from "../../models/task.model";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  constructor(
      public tasksService: TasksService
  ) { }

  ngOnInit(): void {
  }

  onRemoveTaskClicked(task: TaskModel): void {
    this.tasksService.deleteTask(task);
  }

}
