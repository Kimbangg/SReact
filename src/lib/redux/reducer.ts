// import { Action } from '@/types/Store';
// import { DECREASE_NUMBER, INCREASE_NUMBER } from './actionTypes';

// const calculatorReducer = (state: any, { type = '', payload = {} }) => {
//   switch (type) {
//     case INCREASE_NUMBER:
//       return state.countNumber + 1;
//     case DECREASE_NUMBER:
//       return state.countNumber - 1;
//     default:
//       return state;
//   }
// };

// const combineReducers = <S>(state: S, action: Action) => {
//   리듀서가 설정이 되면, 아래와 같이 return 값에 담아서 Store에게 전달한다.
//   return {
//     countNumber: calculatorReducer(state, action),
//   };

//
//   CAUTION: 최초에 Reducer가 없는 상태라면 state를 리턴해줘야한다.
//   return {
//     state
//   }
// };

// export default combineReducers;
