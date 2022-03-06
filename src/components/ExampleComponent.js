import BaseComponent from '../core/Component.js';
export default class ExampleComponent extends BaseComponent {
  setup() {
    this.state = {
      isInit: false,
    };
  }

  template() {
    return `
      <h1>Example Page</h1>
    `;
  }
}
