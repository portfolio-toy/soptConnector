
# WHY? Typescript?

여러 사람이나 회사에서의 팀에서 협력하면서 하나의 제품을 개발합니다.

이런 상황에서는 항상 코드를 작성한 쪽과 사용하는 쪽 사이에 커뮤니케이션이 중요합니다.

예를 들어, A라는 개발자가 다음과 같은 코드를 만들었다고 생각해봅시다.

```jsx
function makePerson(name, age) {}
```

B라는 개발자가 다음 밑의 코드를 이용하려고 다음 코드를 만들어 실행했을 때 오류가 발생했다면, B 개발자는 오류의 원인이 무엇인지 찾기가 어렵습니다.

```jsx
makePerson(32, "Jack")
```

<br>

## 하지만 Typescript라면?

```tsx
function makePerson(age : number, name : string) {}
```

처음 코드를 다음처럼 Typescript의 타입 기능을 이용해 구현했다면 위와 같은 문제는 발생하지 않았을 것입니다.