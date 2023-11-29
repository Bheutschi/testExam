import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TasksService} from "../../services/tasks.service";
import {Observable, Subscription} from "rxjs";
import {TaskModel} from "../../models/task.model";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {

  public task?: TaskModel;

  private subscriptions: Subscription[] = [];

  constructor(
      private route: ActivatedRoute,
      private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
        this.route.paramMap.subscribe((map: ParamMap) => {
          const taskId: number = parseInt(map.get('taskId') || '');
          this.task = this.tasksService.getTask(taskId);
        })
    );
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
