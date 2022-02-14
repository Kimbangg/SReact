import { Action } from '@/types/Store';
import { BaseComponent } from '@/lib/core/Component';

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
    // subscribe Fn = Component.render.bind(this);
    this.subscribers.push(fn);
  }

  public getState() {
    return this.state;
  }

  private notifySubScribers() {
    this.subscribers.forEach(fn => fn());
  }

  // dispatch에게 필요한 action을 넘겨준다.
  public dispatch(action: Action) {
    // dispatch는 action과 state를 reducer에게 넘겨준다.
    this.state = this.reduce(this.state, action);
    this.notifySubScribers();
  }
}
