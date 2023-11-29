import {UserModel} from "./user.model";
import * as moment from 'moment';

export interface TaskModel {
    id: number;
    title: string;
    description?: string;
    assignedTo?: UserModel;
    dueDate?: moment.Moment;
}