import BaseComponent from '@/lib/core/Component';
// import ChildComponent from '@/components/ChildComponent.js';

interface Props {}

interface State {
  isInit: boolean;
  routeChange: Function;
}

export default class ExamplePage extends BaseComponent<
  HTMLElement,
  Props,
  State
> {
  setup() {
    const { routeChange } = this.props;

    this.state = {
      isInit: false,
      routeChange,
    };
  }

  template() {
    return `
            <div class="exmample"></div>
        `;
  }

  selectDom() {
    // this.$example = qs('.exmaple', this.$target);
  }

  render() {
    // 하위 컴포넌트를 render 메서드에서 선언합니다.
    // 하위 컴포넌트에서 사용할 상태 및 상태 업데이트에 필요한 메서드를 Props로 전달할 수 있습니다.
    // this.SubComponent = new SubComponent(this.$example,
    //   {
    //     prop1,
    //     prop2,
    //     exampleMethod: this.exampleMethod.bind(this),
    //     routeChange,
    //   }
    // );
    // this.componentDidMount();
  }

  async componentDidMount() {
    // 마운트 시에

    if (!this.state.isInit) {
      // do Something
    }

    // this.state.isInit = true;
  }

  componentDidUpdate() {
    // 컴포넌트 업데이트 시, 호출이 되는 메서드입니다.
    // this.SubComponent.setState({
    //   ...this.state,
    //   prop1,
    //   prop2,
    // })
  }

  exampleMethod() {
    // ..do Something
  }
}
