import { checkSame } from '@/utils/json';

export interface Props {}
export interface State {}

export abstract class BaseComponent<T extends HTMLElement = HTMLElement, P = Props, S = State> {
  props: P;
  state: S;
  $target: T;

  constructor($target: T, props?: P) {
    this.state = {} as S;
    this.props = props! as P;
    this.$target = $target;

    this.setup();
    this.setEvent();
    this.initialState();
  }

  protected initialState() {
    this.render();
  }

  protected setup() {}

  protected selectDom() {}

  protected template() {
    return '';
  }

  // useEffect no Deps
  protected componentDidMount() {}

  // useEffect Deps
  protected componentDidUpdate() {}

  protected render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  protected setEvent() {}

  protected setState(newState: S) {
    const nextState = { ...this.state, ...newState };

    if (checkSame(this.state, nextState)) return;

    this.state = { ...this.state, ...newState };

    this.render();
  }

  protected addEvent($target: T, eventType: string, selector: string, cbFn: (event: any) => void) {
    const children = [...$target.querySelectorAll(selector)];

    const isTarget = (target: any) => children.includes(target) || target.closest(selector);

    $target.addEventListener(eventType, event => {
      event.preventDefault();
      if (!isTarget(event.target)) return false;
      cbFn(event);
    });
  }
}
