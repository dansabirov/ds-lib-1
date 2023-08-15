import Observable from 'core-js/features/observable';

import { TasksStore } from './store.interface';
import { BehaviorSubject } from './behavior-subject';

class TaskService {
  private readonly store$ = new BehaviorSubject<TasksStore>({
    task: null,
    tasks: [],
    actionFilter: 'all',
    statusFilter: 'all',
    showErrorMsg: false,
    body: null,
  });

  listenStore(): Observable {
    return this.store$.asObservable();
  }

  getStore(): TasksStore {
    return this.store$.getValue();
  }

  updateStore(newStoreValue: Partial<TasksStore>): void {
    const store = this.getStore();
    this.store$.next({ ...store, ...newStoreValue });
  }
}

export default new TaskService();
