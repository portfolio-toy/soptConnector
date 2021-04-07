# 1. 타입 주석과 타입 추론

**콜론(:)과 타입 이름**을 '타입 주석(type annotation)'이라고 합니다.

```tsx
let n **: number** = 1; // 타입 주석
let m = 2; // 생략 가능(타입 추론)
```

`**Typscript**`는 타입 부분을 생략할 수 있습니다.

타입 부분이 생략되면 **대입 연산자(=)의 오른쪽 값을 분석**해 왼쪽 변수의 타입을 결정합니다.

이것을 '타입 추론(type inference)'이라고 합니다.

타입 추론 기능은 자바스크립트 소스코드와 호환성을 보장하는 데 큰 역할을 합니다.

타입 추론 덕분에 자바스크립트로 작성된 `.js` 파일을 확장자만 `.ts`로 바꾸면 타입스크립트 환경에서도 바로 동작합니다.

<br>

# 2. 인터페이스(interface)

```tsx
interface hangout(나갈때) {
  바지: string
  티셔츠: string
  신발: string
  시계? : number
  가방? : number
  모자? : number
}

let person : Person = {name : "Jane"}
```

나갈 때 꼭 입어야하는거 : 바지, 티셔츠, 신발

나갈 때 입지 않아도 되는거 : 시계, 모자, 가방

<br>


# 3. 튜플(tuple)

튜플은 배열과 같지만 배열에 저장되는 아이템의 데이터 타입을 다르게 지정할 수 있습니다.

즉, 데이터 타입이 모두 같으면 배열, 다르면 튜플입니다.

```tsx
let numberArray: number[] = [1,2,3]; // 배열
let tuple : [boolean, number, string] = [true, 1, 'Ok']; // 튜플
```

<br>

# 4. 제너릭 타입(Generic Type)

제너릭 타입은 다양한 타입을 한꺼번에 취급할 수 있게 해줍니다.

```tsx
class Container<T> {
  constructor(public value: T) { }
}
let numberContainer : Container<number> = new Container<number>(1);
let stringContainer : Container<string> = new Container<string>('Hello world');
```

위 Container 클래스는 value 속성을 포함합니다.

이 클래스는 `**Container<number>**`, `**Container<string>**`, `**Container<boolean>**`처럼 여러 타입을 대상으로 동작할 수 있습니다.

이것을 제너릭 타입이라고 합니다.

<br>

# 5. 대수 타입(algebraic data type)

`**ADT**`란, 추상 데이터 타입(abstarct data type)을 의미하기도 하지만 **대수 타입**이라는 의미로도 사용됩니다.

**대수 타입**이란, **다른 자료형의 값을 가지는 자료형**을 의미합니다.

합집합 타입(union, sum type , `**|**`), 교집합 타입(intersection, product type, `**&**`)이 있습니다.

```tsx
type NumberOrString = number | string; // 합집합 타입 예
type AnimalAndPerson = Animal & Person; // 교집합 타입 예
```