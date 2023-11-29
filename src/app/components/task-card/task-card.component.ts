import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import {TaskModel} from "../../models/task.model";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit, OnDestroy {

  @Input() task: TaskModel|undefined;
  @Output() onRemoveClicked: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();

  constructor(
    private tasksService: TasksService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
