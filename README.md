## 기획의도

리액트와 유사한 라이브러리를 만들면서 라이프 사이클 및 V-DOM에 대한 이해를 하고자 프로젝트를 진행하였습니다.

## 라이프 사이클 메서드

- BaseComponent ( Class )
    - `setup()`
        - 각 페이지의 상태를 지정하는 메서드입니다.
    
    - `template()`
        - 렌더링 될 HTMLString을 선언 및 Return 해주는 함수입니다.
    
    - `render()`
        - template에서 전달받은 HTMLString을 Target Element에게 innerHTML 합니다.
        - DOM의 업데이트에 맞춰 이벤트 및 DOM 선택을 할 수 있도록 [selectDom, setEvent] 함수를 호출합니다.
            - target Element의 변화가 일어나지 않는 경우, 오버 라이딩을 통해 setEvent 호출을 1번만 이루어지도록 정정합니다.
            - 만약 event 호출이 렌더를 할 때마다 발생하면, 여러 개의 중복 이벤트가 DOM에 붙어있을 수 있습니다.
        - 렌더링이 된 이후의 실시할 작업을 수행할 수 있도록 componentDidMount()를 호출합니다.
            - BaseComponent의 componentDidMount는 빈 메서드로 선언이 되어있습니다.
            - 하위 컴포넌트에서 오버라이딩을 하여 상황에 맞게 사용할 수 있습니다.
        
        ```jsx
        public render() {
          this.$target.innerHTML = this.template();
        
          this.selectDom();
          this.setEvent();
        		
          this.componentDidMount();
        }
        ```
        
    
    - `setState(newState)`
        - 상태를 변화시키는 메서드입니다.
        - 이전 상태에서 변화가 없다면,`componentDidUpdate()` 메서드를 호출하지 않습니다.
        
        ```jsx
        protected setState(newState: S) {
          const nextState = { ...this.state, ...newState };
        
          if (checkSame(this.state, nextState)) return;
        
          this.state = { ...this.state, ...newState };
          
          this.componentDidUpdate();
        }
        ```
        
    - `componentDidMount()`
        - 최초 렌더링 시에 작동하는 `no deps useEffect` 와 같은 라이프 사이클입니다.
            - 1번만 작동시키기 위해 컴포넌트는 `isInit = false` 로 상태를 초기화 해줍니다.
            - 상태를 업데이트(=setState)  시점에서 `isInit = true` 로 변경하여 이후의 렌더링에서는 componentDidMount() 메서드 내부의 로직이 실행되지 않도록 합니다.
            
            ```jsx
            componentDidMount() {
               if (!this.state.isInit) {
            	   // do Something
               }
             }
            ```
            
    
    - `componentDidupdate()`
        - 최초 렌더링 이후, 감시하는 값이 변화 할 때만 리렌더링을 발생 시키는 `deps useEffect`와 같은 라이프 사이클 & 동작을 수행합니다.
        - componentDidUpdate()는 setState()에서 상태 변화가 있을 때만 실행이 되도록 구현하였습니다.
        - BaseComponent에서는 빈 로직으로 선언이 되어있고, 사용 시에 오버라이딩을 해야합니다.
        
        ```jsx
        componentDidUpdate() {
          new ChildComponent(this.$target, {
        	  someState,
        	  otherState,
          })
        }
        ```
        

## 리액트 구조 & 역할

- App 컴포넌트
    - URL에 맞는하위 컴포넌트를 렌더링 하는 역할을 수행합니다.

- 페이지(Page)
    - 여러 개의 컴포넌트를 호출하는 주체 역할을 수행합니다.
    - 하위 Component 에게 필요한 상태를 관리합니다.
    - Page 컴포넌트의 State는 하위 컴포넌트에서 변경할 수 없습니다. ( 단방향 바인딩 )

- 컴포넌트 ( Component )
    - Page 컴포넌트에게 호출이 되는 객체입니다. (수동)
    - 상위 컴포넌트에서 내려온 값을 가공하여, 렌더링하는 역할을 수행합니다.
    - 상태의 변화가 생기면, 부모 컴포넌트에서 내려준 메서드를 호출 함으로 이 사실을 알립니다.
        
        ( ⇒ 하위 컴포넌트에서 부모 컴포넌트를 직접 조작할 수 없습니다. )
        
    
    ```jsx
    src
    	pages
    		- page_A
    	components
    		- component_A
    	App.js
    ```
    

## 리덕스

- 구현 목적
    - 상태를 중앙 관리 함으로써 아래의 목적을 달성 할 수 있도록 하였습니다.
        1. State의 응집성을 높인다.
        2. Props 드릴링을 최소화한다.
- Store
    - `subsribe()`
        - 하위 컴포넌트가 Store에게 render 함수를 전달합니다.
        - render()를 전달하는 이유는 상태의 변화가 감지될 경우, 이에 맞게 본인(구독자)의 뷰를 업데이트 할 수 있도록 하기 위함입니다.
    - `notifySubscribers()`
        - 상태의 변화가 생기면, 구독자를 통해 전달받은 함수를 호출합니다.
    - `dispatch(action, params)`
        - 하위 컴포넌트에게 Store에게 상태 변화를 알리기 위해 사용되는 메서드입니다.
            - 동작 방식
                
                 1.   dispatch함수에 원하는 동작과 인자를 전달하여 호출합니다.
                
                1. Action이 처리되면서 반환된 `type, payload` 를 Reducer에게 넘겨 type에 맞는 상태 업데이트를 요청합니다.
                2. 상태 업데이트가 완룐되면,  notifySubscribers 함수를 호출하여 구독자들의 전달한 함수를 호출합니다.
- Reducer
    - `combineReducer(state, action)`
        - 여러 개의 Reducer를 효과적으로 관리하기 위하여 아래와 같은 구조로 구현하였습니다.
        
        ```jsx
        const combineReducers = <S>(state: S, action: Action) => {
           return {
             A_RESULT: A_REDUCER(state, action),
        		 B_RESULT: B_REDUCER(state, action),
        		 C_RESULT: C_REDUCER(state, action),
           };
        };
        ```
        

- 라우터
    - 구현 목적
        - 바닐라 자바스크립트에서도 새로고침없이 SPA와 비슷한 방식으로 페이지 이동이 가능하도록 구현하였습니다.
    - 역할
        - 라우터는 리액트의 Browser Router와 같이 URL 변경 만을 수행합니다.
        - URL의 변화가 있을 경우, App에게 전달받은 `SwitchRender()` 메서드를 호출하여 렌더링 업데이트가 필요하다는 것을 알립니다.
        
        - 동작원리
            - App 컴포넌트는 하위 컴포넌트에게Custom Event인 `ROUTE_CAHNGE` 를 발생시킬 수 있는 `this.browserRouter.routeChange()` 를 하위 컴포넌트에게 전달합니다.
            - URL 변경이 필요할 경우 하위 컴포넌트는 `routeChange(url)` 를 호출합니다.
            - 라우터의 `ROUTE_CHANGE`  리스너는 이벤트가 발생하면, App에게 전달받은 this.switchRouter를 호출함으로써 변경 사항이 있음을 App에게 알립니다.
            - App은 현재 pathname을 바탕으로 이에 맞는 컴포넌트를 렌더링합니다.
