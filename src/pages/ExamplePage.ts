import BaseComponent from '@/lib/core/Component';
// import ChildComponent from '@/components/ChildComponent.js';

interface Props {}

interface State {
  isInit: boolean;
  data: [] | null;
}

export default class ExamplePage extends BaseComponent<
  HTMLElement,
  Props,
  State
> {
  setup() {
    this.state = {
      isInit: false,
      data: null,
    };
  }

  template() {
    return `
            <nav class="exmample"></nav>
        `;
  }

  selectDom() {
    // qs(selector, scope)
    // this.$example = qs('.exmaple', this.$target);
  }

  async componentDidMount() {
    if (!this.state.isInit) {
      // do Something
    }
  }

  componentDidUpdate() {
    // new ChildComponent(this.$example, {
    //   updateSomething: this.updateSomething.bind(this),
    // });
  }

  async updateSomething(id: string) {
    // const { isError, data } = await request(`/${id}`);
    // this.setState({
    //   ...this.state,
    //   data,
    // });
  }
}
