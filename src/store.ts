export type State = {
  count: number;
  name?: string;
};

let currentState: State = {
  count: 0
};

export function setState(newState: State): void {
  currentState = newState;
}

export function getState(): State {
  return currentState;
}
