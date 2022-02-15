import '@/styles/index.scss';
// import { store } from '.';
// import { increaseNumber } from './lib/redux/action';
import { BaseComponent } from './lib/core/Component';

export default class App extends BaseComponent<HTMLElement> {
  // $minusBtn: HTMLButtonElement;
  // $plusBtn: HTMLButtonElement;
  // setup() {
  //   this.state = 1;
  //   store.subscribe(this.render.bind(this));
  // }
  // template() {
  //   return `
  //     <div>
  //       <p>현재 state 값은 ${store.getState().countNumber ?? this.state}</p>
  //     <div>
  //     <div>
  //       <button id="plus-btn">플러스</button>
  //       <button id="minus-btn">마이너스</button>
  //     </div>
  //   `;
  // }
  // selectDom() {
  //   this.$plusBtn = document.querySelector('#plus-btn')! as HTMLButtonElement;
  //   this.$minusBtn = document.querySelector('#minus-btn')! as HTMLButtonElement;
  // }
  // setEvent() {
  //   this.$plusBtn.addEventListener('click', () => {
  //     store.dispatch(increaseNumber());
  //   });
  // }
}
