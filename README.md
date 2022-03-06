## 🔍 Description

- 기획 의도
    - 직접 리액트와 유사한 라이브러리를 만들면서 사이프 사이클 및 V-DOM에 대한 이해를 하고자 프로젝트를 진행하였습니다.
- 리액트
    - BaseComponent ( Class )
        - `setup()`
            - 각 페이지의 상태를 지정하는 메서드입니다.
        
        - `template()`
            - 렌더링 될 뷰를 선언 및 Return 해주는 함수입니다.
            
            ```jsx
            private template() {
                return `
                      <div class="example"></div>
                    `;
             }
            ```
            
        
        - `render()`
            - template에서 전달받은 HTML을 target Element에게 전달함으로써 렌더링 합니다.
            - DOM의 업데이트에 맞춰 이벤트 및 DOM 선택을 할 수 있도록 [selectDom, setEvent] 함수를 호출합니다.
            - 상황에 따라, 추가적인 작업이 필요하다면 componentDidMount를 호출합니다.
                - componentDidMount의 기본 값은 비어있고 필요한 경우 하위컴포넌트에서 오버 라이딩 할 수 있습니다.
            
            ```jsx
            public render() {
                this.$target.innerHTML = this.template();
            
                this.selectDom();
                this.setEvent();
            
                this.componentDidMount();
              }
            ```
            
        
        - `setState()`
            - 변화된 상태가 있을 때만 업데이트를 해주는 메서드입니다.
            - 이 메서드는 render 및 componentDidUpdate 를 호출합니다.
                - Render를 다시 호출하는 이유
                    - 기존의 DOM이 남아있는 상태에서, 이벤트 등록이 존재하는 하위 컴포넌트가 존재한다면 똑같은 이벤트가 DOM에 붙는 에러가 발생할 수 있습니다.
                    - 이Render를 호출하여 기존의 DOM을 없애고 새로 만들어진 $target을 내려주면 이벤트 중복 등록 문제를 해결할 수 있습니다.
            
            ```jsx
            protected setState(newState: S) {
                const nextState = { ...this.state, ...newState };
            
                if (checkSame(this.state, nextState)) return;
            
                this.state = { ...this.state, ...newState };
            
                this.render();
                this.componentDidUpdate();
              }
            ```
            
        - `componentDidMount ( 1.5 업데이트 )`
            - 최초 렌더링 시에만 작동하는 `no deps useEffect`와 비슷한 동작을 수행합니다.
                - 이를 위해서 하위 컴포넌트들의 부모인 Page는 isInit이라는 값을 false로 가지고 있게 됩니다.
                - 이후에, state가 변경되는 시점에 isInit을 ture로 바꿔주면 setState로 인하여 상태가 변하더라도 componentDidMount는 호출되지 않습니다.
                
                ```jsx
                componentDidMount() {
                    if (!this.state.isInit) {
                	  // do Something
                    }
                  }
                ```
                
        
        - `componentDidupdate ( 1.5 업데이트 )`
            - state가 변할 때마다 작동하는 `deps useEffect`와 비슷한 동작을 수행합니다.
            - State의 값을 하위 컴포넌트에 내려주면서 하위 컴포넌트의 상태 및 뷰를 변경시킵니다.
            
            ```jsx
             componentDidUpdate() {
            	new ChildComponent(this.$target, {
            		someState,
            		otherState,
            	})
             }
            ```
            
    
    - App 컴포넌트
        - 역할
            - App 컴포넌트는 URL에 맞는하위 컴포넌트를 렌더링 하는 역할 만을 수행합니다.
            
            ```jsx
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
            
            		switch (pathname) {
                  case A_PAGE:
                    new A_PAGE(this.$target, {
                      routeChange,
                    });
                    break;
            
                  case B_PAGE:
                    new B_PAGE(this.$target, {
                      routeChange,
                    });
                    break;
            
                  case C_PAGE:
                    new C_PAGE(this.$target, {
                      routeChange,
                    });
                    break;
                 }
                }
            
              }
            }
            ```
            
    - 페이지(Page)
        - 역할
            - 각 페이지는 하위 컴포넌트에서 사용될 State를 가지고 있습니다.
                - 상태는 setup 함수를 통해 초기화 됩니다.
                - Page와 하위 컴포넌트의 소통은 Page에서 만든 메서드를 하위 컴포넌트에게 Props로 내려줌으로써 가능합니다.
            
            ```jsx
            import BaseComponent from "../core/Component.js";
            import ChildComponent from "../components/ChildComponent.js";
            
            export default class Page extends BaseComponent {
                setup() {
                    this.state = {
                        isInit: false,
            			data: null,
                    }
                }
            
                template() {
                    return `
                        <nav class="exmample"></nav>
                    `
                }
            
                selectDom() {
            	   // qs(selector, scope)
                   this.$example = qs('.exmaple', this.$target);
                }
            
                async componentDidMount() {
                    if ( !this.state.isInit) {
            		  // do Something
                    }
                }
            
                componentDidUpdate() {
                    new ChildComponent(this.$example, {
                        filePaths,
                        updateSomething: this.updateSomething.bind(this),
                    })
            
                }
            		
                async updateSomething(id) {
            	    const { isError, data } = await request(`/${id}`);
            
            		this.setState({
            		    ...this.state,
            			data,
            		})
            	}
            
           }
            ```
            

- 리덕스
    - 구현 목적
        - 상태를 중앙 관리 함으로써 아래의 목적을 달성 할 수 있도록 하였습니다.
            1.   State의 응집성을 높인다.
            2. Props 드릴링을 최소화한다.
    - Store
        - subsribe()
            - 하위 컴포넌트가 Store에게 render 함수를 전달합니다.
        - notifySubscribers()
            - 상태의 변화가 생기면, subscribe를 통해 전달받은 render 함수를 호출 함으로써 컴포넌트의 뷰를 업데이트 해줍니다.
        - dispatch()
            - 하위 컴포넌트가 Store의 상태를 변화 시키고 싶은 경우, 원하는 Action 과 필요한 Parameter를 전달합니다.
            - Store는 Reducer에게 이 요청을 넘긴 뒤, 처리된 상태를 저장합니다.
            - 이 후 notifySubscribers 함수를 호출하여 컴포넌트의 뷰를 업데이트합니다.
    - Reducer
        - combineReducer
            - 여러 개의 Reducer로 반환된 값을 묶어서 Store에게 전달합니다.

- 라우터
    - 구현 목적
        - 바닐라 자바스크립트에서도 SPA처럼 작동할 수 있도록 구현하였습니다.
    - 역할
        - 라우터는 리액트의 Browser Router와 같이 URL 변경 만을 수행합니다.
        - 단, URL이 변경될 때 App에게 이 상황을 알려서, App이 URL에 맞는 컴포넌트를 렌더링 할 수 있도록 합니다.
