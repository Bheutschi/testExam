import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {TaskModel} from "../../models/task.model";
import {TasksService} from "../../services/tasks.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {

  public form: FormGroup<any> = new FormGroup<any>({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(),
    dueDate: new FormControl(),
    assignedTo: new FormControl()
  });
  public is404 = false;
  public taskId?: number;

  private subscriptions: Subscription[] = [];

  constructor(
      public usersService: UsersService,
      public tasksService: TasksService,
      private route: ActivatedRoute,
      public router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
        this.route.paramMap.subscribe((map: ParamMap) => {
          this.taskId = parseInt(map.get('taskId') || '');

          // S'il y a un taskId, c'est qu'on édite une tâche, on initialise donc le form en fonction.
          if (this.taskId) {
            this.is404 = !this.initFormEditionForm(this.taskId);
            return;
          }

          // S'il n'y a pas de taskId, c'est qu'on et en mode création de tâche.
          this.is404 = false;
        })
    );
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public onSaveClicked(): void {
    const data = this.form.value;
    if (this.taskId) {
      data.id = this.taskId;
      this.tasksService.saveTask(data);
    }
    else {
      const task: TaskModel = this.tasksService.createTask(
        data.title,
        data.description,
        data.dueDate,
        data.assignedTo
    );
      this.taskId = task.id;
    }

    this.router.navigate(['/tasks', this.taskId]);
  }

  private initFormEditionForm(taskId: number): boolean {
    const task = this.tasksService.getTask(taskId);
    if (task) {
      this.form.patchValue(task);
      return true;
    }

    return false;
  }

}
