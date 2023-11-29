import { Injectable } from '@angular/core';
import {TaskModel} from "../models/task.model";
import {UserModel} from "../models/user.model";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private nextTaskId: number = 128;
  private tasks: TaskModel[] = [
    { id: 123, title: 'Se présenter aux consultations', description: 'Rattraper les 8h de consultation de la semaine dernière.', assignedTo: { id: 1, firstName: 'Gregory', lastName: 'House' } },
    { id: 124, title: 'Fouiller appartement de Mme Thomson', description: 'Rechercher des traces de moisissures.', assignedTo: { id: 3, firstName: 'Eric', lastName: 'Foreman' } },
    { id: 125, title: 'Remplacer la vicodin par des placebo ', description: 'Voir avec le pharmacien comment procéder exactement.', assignedTo: { id: 2, firstName: 'Lisa', lastName: 'Cuddy' } },
    { id: 126, title: 'Faire la prise de sang à Mme Thomson au labo', description: 'Chambre 706, puis l\'envoyer au labo', assignedTo: { id: 3, firstName: 'Eric', lastName: 'Foreman' } },
    { id: 127, title: 'Faire le test pour la chorée de huntington', description: 'Qu\'on soit fixer une fois pour toute !', assignedTo: { id: 4, firstName: 'Numéro 13', lastName: '' } }
  ];

  constructor() { }

  getTasks(): TaskModel[] {
    return this.tasks;
  }

  getTask(taskId: number): TaskModel|undefined {
    return this.tasks.find((task: TaskModel) => task.id === taskId);
  }

  createTask(title: string, description?: string, dueDate?: moment.Moment, assignedTo?: UserModel): TaskModel {
    const id: number = this.getNextTaskId();
    const task: TaskModel = {
      id,
      title,
      description,
      dueDate,
      assignedTo
    };
    this.tasks.push(task);
    
    return task;
  }

  deleteTask(task: TaskModel): void {
    this.tasks = this.tasks.filter((item: TaskModel) => item.id !== task.id);
  }

  saveTask(task: TaskModel): void {
    const taskIndex: number = this.tasks.findIndex(t => t.id == task.id);
    taskIndex >= 0 ?
      this.tasks[taskIndex] = task :  // on la met à jour
      this.tasks.push(task);          // sinon on l'ajoute
  }

  private getNextTaskId(): number {
    const id = this.nextTaskId;
    this.nextTaskId++;
    return id;
  }
}

