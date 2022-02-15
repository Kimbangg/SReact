import { Action } from '@/types/Store';

export interface State {}

export default class Store<S = State> {
  state: S;
  reduce: Function;
  subscribers: Array<Function>;

  constructor() {
    this.state = {} as S;
    this.reduce = () => {};
    this.subscribers = [];
  }

  public setup(state: any, reduce: Function) {
    this.reduce = reduce ?? function () {};
    this.state = this.reduce(state, {});
  }

  public subscribe(fn: Function) {
    this.subscribers.push(fn);
  }

  public getState() {
    return this.state;
  }

  private notifySubScribers() {
    this.subscribers.forEach(fn => fn());
  }

  public dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.notifySubScribers();
  }
}
