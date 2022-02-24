import { BaseComponent } from '../core/Component';

export type Route = {
  path: string;
  component: BaseComponent;
};

export default class Router {
  lastPath: string;
  history: string[];

  constructor(public $target: HTMLElement, public routes: Route[]) {
    this.$target = $target;
    this.routes = routes;
    this.history = [];
    this.lastPath = '';

    this.setup();
    this.navigate('/');
  }

  setup() {
    window.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target as Element;

      if (!target.matches('button[data-route]')) return;

      const path = (target.parentNode as HTMLAnchorElement).pathname;

      this.history.push(path);
      this.navigate(path);
    });

    window.addEventListener('popstate', () => {
      this.history.pop();

      if (this.history) {
        this.navigate(this.history[this.history.length - 1]);
      }
    });
  }

  navigate(path: string) {
    if (this.lastPath === path) return;
    this.lastPath = path;
    window.history.pushState(null, '', path);

    const matched = this.routes.find(route => route.path === path);

    matched?.component.render();
  }
}
