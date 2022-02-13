export default class Store {
  state;
  reduce: Function;
  subscribers: Array<Function>;

  constructor() {
    this.state = {};
    this.reduce = () => {};
    this.subscribers = [];
  }

  public setup(reduce: Function) {
    reduce ? (this.reduce = reduce) : '';
    this.state = this.reduce(this.state, {});
  }

  public subscribe(fn: Function) {
    this.subscribers.push(fn);
  }

  get getState() {
    return this.state;
  }

  notifyToSubScribers() {
    this.subscribers.forEach(fn => fn());
  }

  dispatch(action: String) {
    this.state = this.reduce(this.state, action);
    this.notifyToSubScribers();
  }
}
