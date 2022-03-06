import '@/styles/index.scss';
import BrowserRouter from './lib/Router';

interface State {}

export default class App<State> {
  $target: HTMLElement;
  browserRouter: BrowserRouter;

  constructor($target: HTMLElement) {
    this.$target = $target;

    this.browserRouter = new BrowserRouter('');
    this.switchRender();
    this.browserRouter.setup(this.switchRender.bind(this));
  }
  switchRender() {
    const { pathname } = window.location;
    const { routeChange } = this.browserRouter;

    // switch (pathname) {
    //   case A_PAGE:
    //     new A_PAGE(this.$target, {
    //       routeChange,
    //     });
    //     break;

    //   case B_PAGE:
    //     new B_PAGE(this.$target, {
    //       routeChange,
    //     });
    //     break;

    //   case C_PAGE:
    //     new C_PAGE(this.$target, {
    //       routeChange,
    //     });
    //     break;
    //  }
    // }
  }
}
