const ROUTE_CHANGE = 'ROUTE_CHANGE';
const POP_STATE = 'popstate';

// Browser 라우터는 URL을 이동 시킨 뒤 App에게 뷰(=Component)를 바꾸라는 요청을 하는 객체이다.
export default class BrowserRouter {
  switchRender: Function;

  constructor(switchRender: Function) {
    this.switchRender = this.switchRender;

    this.setEvent();
  }

  setEvent() {
    // URL의 변화가 생겼을 때, App에게 알리는 역할을 수행
    window.addEventListener(ROUTE_CHANGE, () => {
      this.switchRender && this.switchRender();
    });

    // URL의 이동을 확인했을 때, App에게 알리는 역할을 수행
    window.addEventListener(POP_STATE, () => {
      this.switchRender && this.switchRender();
    });
  }

  routeChange(url: string, params?: string) {
    history.pushState(null, '', url);

    window.dispatchEvent(
      new CustomEvent(ROUTE_CHANGE, {
        detail: {
          params,
        },
      })
    );
  }
}
