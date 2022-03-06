import { checkSame } from '@/utils/json';

export interface Props {}
export interface State {}

export abstract class BaseComponent<
  T extends HTMLElement = HTMLElement,
  P = Props,
  S = State
> {
  props: P;
  state: S;
  $target: T;

  constructor($target: T, props?: P) {
    this.state = {} as S;
    this.props = props! as P;
    this.$target = $target;

    this.setup();
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

  // useEffect no Deps => 최초 렌더링 시에만 작동합니다.
  // 그렇기 때문에 Page는 isInit이라는 값을 가지고 최초 렌더링할 때만 작동하는 로직의 추가가 필요합니다.
  // ExampleComponent에 구현이 되어있습니다.
  protected componentDidMount() {}

  // useEffect Deps
  // state가 변경될 때(=setState) 마다 호출이 되는 메서드입니다.
  protected componentDidUpdate() {}

  public render() {
    this.$target.innerHTML = this.template();

    this.selectDom();
    requestAnimationFrame(() => this.setEvent());

    this.componentDidMount();
  }

  protected setEvent() {}

  protected setState(newState: S) {
    const nextState = { ...this.state, ...newState };

    if (checkSame(this.state, nextState)) return;

    this.state = { ...this.state, ...newState };

    this.render();
    this.componentDidUpdate();
  }

  protected addEvent(
    $target: T,
    eventType: string,
    selector: string,
    cbFn: (event: any) => void
  ) {
    const children = [...$target.querySelectorAll(selector)];

    const isTarget = (target: any) =>
      children.includes(target) || target.closest(selector);

    $target.addEventListener(eventType, event => {
      event.preventDefault();
      if (!isTarget(event.target)) return false;
      cbFn(event);
    });
  }
}
