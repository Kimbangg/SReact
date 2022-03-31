import BaseComponent from '@/lib/core/Component';

export default class ExampleComponent extends BaseComponent {
  setup() {
    // const { prop1, prop2 } = this.props;
    // this.state = {
    //   prop1,
    //   prop2,
    //   isInit: false,
    // };
  }

  template() {
    return `
      <h1>Example Component</h1>
    `;
  }

  componentDidUpdate() {
    // TODO: 상위 컴포넌트가 하위 컴포넌트의 상태를 업데이트할 때 "어떤 작업"이 일어나면 좋을지 componentDidUpdat에 명시 해줄 것.
  }
}
