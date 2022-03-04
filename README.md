## 🔍 Description

- 기획 의도
  - 직접 리액트와 유사한 라이브러리를 만들면서 사이프 사이클 및 V-DOM에 대한 이해를 하고자 프로젝트를 진행하였습니다.
- 리액트

  - BaseComponent ( Class )
    - setup()
      - 각 페이지의 상태를 지정하는 메서드입니다.
    - template()
      - 렌더링 될 뷰를 선언 및 Return 해주는 함수입니다.
    - render()
      - template에서 전달받은 HTML을 target Element에게 전달함으로써 렌더링 합니다.
      - DOM의 업데이트에 맞춰 이벤트 및 DOM 선택을 할 수 있도록 [selectDom, setEvent] 함수를 호출합니다.
      - 상황에 따라, 추가적인 작업이 필요하다면 componentDidMount를 호출합니다.
        - componentDidMount의 기본 값은 비어있고 필요한 경우 하위컴포넌트에서 오버 라이딩 할 수 있습니다.
  - App 컴포넌트
    - 역할
      - App 컴포넌트는 URL에 맞는하위 컴포넌트를 렌더링 하는 역할 만을 수행합니다.
  - 하위 페이지
    - 역할
      - 각각의 페이지는 하위 컴포넌트를 위한 상태를 가지고 있습니다.
        - 상태는 setup 함수를 통해 초기화 하고, state를 변경시키는 메서드는 페이지에서 구현한 뒤 하위 컴포넌트에게 전달합니다.

- 리덕스

  - 구현 목적
    - 상태를 중앙 관리 함으로써 아래의 목적을 달성 할 수 있도록 하였습니다.
      1.  State의 응집성을 높인다.
      2.  Props 드릴링을 최소화한다.
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
