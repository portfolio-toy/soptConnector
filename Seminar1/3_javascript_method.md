# 기본 자료형(원시 타입)

원시 타입 데이터는 변수에 할당될 때 메모리 상에 고정된 크기로 저장되고 해당 변수가 원시 데이터 값을 보관한다.

### 원시 타입의 종류

- Number(숫자)
- String(문자)
- Boolean(참/거짓) true/false
- Null
- Undefined
- (심화) Null vs Undefined

    null 과 undefined 는 **등록, 저장** 여부이다.

    `null` 은 값은 값이지만 값으로써 의미없는 특별한 값이 등록되어 있는 것

    `undefined` 는 등록이 되어있지 않기 때문에 초기화도 정의되지도 않은 것


    - 0은 휴지꽂이에 휴지는 있지만 휴지를 다 쓴 상태
    - null은 휴지꽂이에 휴지가 없는 상태
    - undefiend는 휴지꽂이가 없는 상태
  
- Symbol
    - 설명

        `Symbol()` 함수는 **심볼(symbol)** 형식의 값을 반환하는데, 이 심볼은 내장 객체(built-in objects)의 여러 멤버를 가리키는 정적 프로퍼티와 전역 심볼 레지스트리(global symbol registry)를 가리키는 정적 메서드를 가지며, "`new Symbol()`" 문법을 지원하지 않아 생성자 측면에서는 불완전한 내장 객체 클래스(built-in object class)와 유사합니다.

        `Symbol()`로부터 반환되는 모든 심볼 값은 고유합니다. 심볼 값은 객체 프로퍼티(object properties)에 대한 식별자로 사용될 수 있습니다; 이것이 심볼 데이터 형식의 유일한 목적입니다.

- (심화) Null, Undefined, 0, ''

    위에 Null, Undefined, 0, '' 이 네 가지는 모두 false로 간주합니다.

<br>

# 참조 자료형(참조 타입)

참조 타입 데이터는 크기가 정해져 있지 않고 변수에 할당될 때 값이 직접 해당 변수에 저장될 수 없으며, 변수에는 데이터에 대한 참조만 저장된다.

참조는 참조 타입 데이터의 주소이지 해당 데이터의 값이 아니다.

### 참조 타입의 종류

- Function(화살표 함수 때 설명!)
- Array

    배열

    - 실습 코드

        ```jsx
        let arr1 = [];
        console.log(arr1);
        console.log(typeof arr1);

        let arr2 = [1, 2, 3, 4, 5];
        console.log(arr2);
        console.log(typeof arr2);

        let arr3 = ["남궁권", 3, 4.5, false, { name: "kkoon9", part: "server" }];
        console.log(arr3);
        console.log(typeof arr3);

        // array 기본 함수
        console.log("[array 기본 함수]");
        let arr = [1, 2, 3, 4, 5];
        let tmp = [];
        // 1. length 함수
        console.log("length: " + arr.length);

        // 2. shift 함수
        arr.unshift(0);
        console.log("after unshift: " + arr);
        arr = [1, 2, 3, 4, 5];
        arr.shift();
        console.log("after shift: " + arr);
        arr = [1, 2, 3, 4, 5];

        // 3. push & pop 함수
        arr.push("new Item");
        console.log("after push: " + arr);
        arr.pop();
        console.log("after pop: " + arr);

        // 4. includes 함수
        console.log("includes(4): " + arr.includes(4));

        // 5. indexOf 함수
        console.log("indexOf: " + arr.indexOf(4));

        // 6. concat 함수
        let arr4 = [1, 2, 3];
        let arr5 = [4, 5];
        console.log("after concat" + arr4.concat(arr5));

        // 7. join 함수
        let arrStation = ["온수", "역곡", "소사", "부천", "중동", "송내"];
        console.log(arrStation.join("->"));

        // 8. reverse 함수
        console.log(arrStation.reverse().join("->"));

        // 9. sort 함수
        console.log(arrStation.sort());

        // 배열 순회
        arr = [1, 2, , 4, 5];
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
        }

        for (let idx in arr) {
          console.log(arr[idx]);
        }

        for (let data of arr) {
          console.log(data);
        }
        ```

- Object

    객체

    - 실습 코드

        ```jsx
        const empty = {};

        console.log("typeof empty:" + typeof empty);
        console.log("empty:" + empty);
        console.log(empty);

        const person = {
          name: ["Bob", "Smith"],
          age: 32,
          gender: "male",
          interests: ["music", "skiing"],
          bio: function () {
            console.log(
              this.name[0] +
                " " +
                this.name[1] +
                " is " +
                this.age +
                " years old. He likes " +
                this.interests[0] +
                " and " +
                this.interests[1] +
                "."
            );
          },
          greeting: function () {
            console.log("Hi! I'm " + this.name[0] + ".");
          },
        };

        console.log("typeof person:" + typeof person);
        console.log("person:" + person);
        console.log("person:" + JSON.stringify(person));
        console.log(person);

        // dot notation
        console.log("[Dot Notation]");
        console.log("person.name:" + person.name);
        console.log("person.age:" + person.age);
        console.log("person.gender:" + person.gender);
        console.log("person.interests:" + person.interests);
        person.bio();
        person.greeting();

        // bracket notation
        console.log("[Bracket Notation]");
        console.log("person[name]:" + person["name"]);
        console.log("person[age]:" + person["age"]);
        console.log("person[gender]:" + person["gender"]);
        console.log("person[interests]:" + person["interests"]);
        person["bio"]();
        person["greeting"]();

        // update object
        console.log("[Update Object]");
        person.name = "남궁권";
        person.age = 27;
        person.bark = function () {
          console.log("bark, bark!!");
        };
        console.log(person);
        person.bark();
        ```


<br>

# **원시 타입 변수 복사**

각 변수 간에 원시 타입 데이터를 복사할 경우 데이터의 값이 복사된다. 다음 예제를 보자.

```jsx
let x = 100;
let y = x;
x = 99;
console.log(y);
```

뭐가 나올까?

<br>

# **참조 타입 변수 복사**

각 변수 간에 참조 타입 데이터를 복사할 경우 데이터의 참조가 복사된다. 다음 예제를 보자.

```jsx
var x = {count: 100};   // 참조 타입 데이터를 선언
var y = x;              // 참조를 새 변수에 복사
x.count=99;             // 참조 타입 데이터를 변경
console.log(y.count);   // 99, 'x'와 'y'는 동일한 참조를 담고 있으며, 따라서 동일한 객체를 가리킴
```

뭐가 나올까?

<br>

# **문자열 변수 복사**

자바스크립트에서 문자열은 크기가 고정돼 있지 않지만 원시 타입처럼 동작한다. 각 변수 간에 문자열 데이터를 복사할 경우 **`문자열 값이 복사된 것으로 간주`**할 수 있다. 다음 예제를 보자.

```jsx
let x = "Hello";
let y = x;
x = "Hi";
console.log(x);
console.log(y);
```

뭐가 나올까?

<br>

# const, let

const, let은 블록 스코프입니다.

```jsx
if (true) {
  var x = 3;
}
console.log(x); // 3

if (true) {
  const y = 3;
}
console.log(y); // Uncaught ReferenceError: y is not defined
```

크롬 개발자 도구(F12)를 통해 테스트해봅시다!

var는 함수 스코프를 가지므로 if문의 블록과 관계없이 접근할 수 있습니다.

하지만 const와 let은 블록 스코프를 가지므로 블록 밖에서는 변수에 접근할 수 없습니다.

블록의 범위는 if, while, for, function 등의 중괄호입니다.

const는 한 번 대입하면 다른 값을 대입할 수 없습니다.

let은 여러 번 대입할 수 있습니다.

<br>

# 템플릿 문자열

백틱(`) ⇒ 물결 키

큰따옴표(")나 작은따옴표(')가 아닌 `백틱`으로도 문자열을 나타낼 수 있습니다.

특이한 점은 문자열 안에 변수를 넣을 수 있다는 것입니다.

```jsx
const num1 = 1;
const num2 = 2;
const result = 3;
const string1 = num1 + ' 더하기 ' + num2 + '는 \'' + result +'\'';
console.log(string1); // 1 더하기 2는 '3'`위 코드는 가독성이 매우 안좋습니다.
```

```jsx
const num1 = 1;
const num2 = 2;
const result = 3;
const string1 = `${num1} 더하기 ${num2}는 '${result}'`;
console.log(string1); // 1 더하기 2는 '3'
```

${변수} 형식으로 변수를 더하기 기호 없이 문자열에 넣을 수 있습니다.

<br>

# 화살표 함수

return 문을 줄일 수 있다.

this 바인드 방식이 다르다. ⇒ this 쓸 일이 적어서 모르셔도 됩니다. 진짜로

```jsx
function add(a, b) { return a + b };
const add2 = (a, b) => a + b; // 화살표 함수
```

<br>

# 비구조화 할당

비구조화 할당은 객체와 배열에 적용할 수 있습니다.

객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있습니다.

```jsx
let person = {
  name : "Jane", 
  age: 22
};
let {name , age} = person; // name = "Jane", age = 22

let array = [1,2,3,4];
let [head, ...rest] = array; // head = 1, rest = [2,3,4]

let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1
```

<br>

