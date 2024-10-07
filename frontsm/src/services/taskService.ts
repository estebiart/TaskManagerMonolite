import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export const fetchTasks = () => {
  return ajax.getJSON('/api/tasks').pipe(
    map(response => response),
    catchError(error => {
      console.error('Failed to fetch tasks', error);
      return throwError(error);
    })
  );
};

export const createTask = (task: any) => {
  return ajax.post('/api/tasks', task).pipe(
    map(response => response.response),
    catchError(error => {
      console.error('Failed to create task', error);
      return throwError(error);
    })
  );
};


