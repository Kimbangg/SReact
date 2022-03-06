import BaseComponent from '../core/Component.js';
export default class CatPhotoPage extends BaseComponent {
  setup() {
    this.state = {
      isInit: false,
    };
  }

  template() {
    return `
          <div class="example"></div>
        `;
  }

  selectDom() {}

  async componentDidMount() {
    // componentDidmount는 deps가 빈 useEffect와 같습니다.
    // 그렇기 때문에, rendering이 되는 최초에만 한 번 작동하는 로직을 이 곳에 담아줍니다.
    if (!this.state.isInit) {
    }
  }

  componentDidUpdate() {}
}
