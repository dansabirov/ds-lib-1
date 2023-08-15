import { Observable } from 'core-js/features/observable';

export type TasksStore = {
  task: any;
  tasks: any[];
  actionFilter: string;
  statusFilter: string;
  showErrorMsg: boolean;
  body: any | null;
};

class BehaviorSubject<T> {
  private observers: Array<(value: T) => void> = [];
  constructor(private _value: T) {}

  asObservable(): Observable<T> {
    return new Observable<T>(subscriber => {
      subscriber.next(this._value);
      const observer = (value: T) => subscriber.next(value);
      this.observers.push(observer);
      return () => {
        // Cleanup on unsubscribe
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.observers.splice(index, 1);
        }
      };
    });
  }

  getValue(): T {
    return this._value;
  }

  next(value: T): void {
    this._value = value;
    this.observers.forEach(observer => observer(value));
  }
}

export class TaskService {
  private readonly store$ = new BehaviorSubject<TasksStore>({
    task: null,
    tasks: [],
    actionFilter: 'all',
    statusFilter: 'all',
    showErrorMsg: false,
    body: null,
  });

  listenStore(): Observable<TasksStore> {
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
