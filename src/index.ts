import App from './App';
import Store from './lib/redux/Store';
// import reduce from '@/lib/redux/reducer';

export interface State {}

// Store 내부에서 사용 될 State가 결정되면 Generic으로 넘겨줄 것
export const store = new Store<State>();

document.addEventListener('DOMContentLoaded', () => {
  const $app = document.querySelector('#app')! as HTMLElement;
  const app = new App($app);
  // store.setup(app.state, reduce);
});
