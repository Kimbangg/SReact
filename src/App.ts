import '@/styles/index.scss';
import BrowserRouter from './lib/Router';
// import { store } from '.';
// import { increaseNumber } from './lib/redux/action';

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

    const pathURL =
      pathname.indexOf('/web/products') === 0 ? '/web/products' : pathname;

    // switch (pathURL) {
    //   case PRODUCT_LIST_PAGE:
    //     new ProductListPage(this.$target, {
    //       routeChange,
    //     });
    //     break;

    //   case PRODUCT_LIST_PAGE:
    //     const [, , , productId] = pathname.split('/');
    //     new ProductDetailPage(this.$target, {
    //       productId,
    //       routeChange,
    //     });
    //     break;

    //   case CART_PAGE:
    //     new Cart(this.$target, {
    //       routeChange,
    //     });
    //     break;
    //  }
    // }
  }
}
