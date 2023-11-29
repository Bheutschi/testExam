import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {TaskModel} from "../../models/task.model";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: TaskModel[] = [];
  @Output() onRemoveTaskClicked: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();

  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
  }

}
