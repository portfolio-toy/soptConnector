<div align="center">

  <img height="50" width="120" src="https://user-images.githubusercontent.com/59385491/99065767-39ab4500-25eb-11eb-9490-9d2a4202dd96.png">

  # 대학생 연합 IT벤처 창업 동아리 SOPT

  <img height="500" width="500" src="https://user-images.githubusercontent.com/59385491/99067842-bb50a200-25ee-11eb-9252-4a4ae3644e8d.png">

  <h2> 👨‍💻 SOPT 27기 서버파트원 박상수입니다. </h2>

<p>누구에겐 쉬운 공부일지라도, 나에겐 크고 작은 어려움에 맞서 해답을 찾으려고 노력했던 시간들의 흔적.</p>
<p>무던히 포기하지 않고 견디고 견뎠던 그 시간들이 변함없는 단 하나의 해답임을 믿습니다.</p>

</div>

<br>

## 소개

이 레포지토리는 [ON-SOPT](http://sopt.org/wp/?page_id=2519) 28기 서버파트에서 활동하며 공부한 내용을 정리하고자 만들어졌습니다. 

-   일정 : 2021년 04월 10일(토) 과제

<br>

## 과제 설명

<br>


<div align="center">

|               과제 설명             |                과제                 |           
| :-------------------------------: | :-------------------------------: |
| 1. Profile 인터페이스 짜보기  | [☝🏻](https://github.com/BE-SOPT-SERVER-28th/Parksangsu/tree/develop/parksangsu/Seminar2/back/src/interfaces)    | 


</div>

<br>


### 1. 참고

- 아래 코드는 User의 인터페이스 IUser.ts입니다.

```typescript
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
```

위 인터페이스(IUser)는 models/User.ts를 참고해서 짭니다.

Profile 인터페이스는 models/Profile.ts를 보고 짜봅시다.

아래 코드는 models/Profile.ts입니다. 

```typescript
import mongoose from "mongoose";
import { IProfile } from "../interfaces/IProfile";

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  company: { // 회사
    type: String,
    required: true,
  },
  website: { // 자신의 웹사이트
    type: String,
  },
  location: { // 사는 지역
    type: String,
    required: true,
  },
  status: { // 상태
    type: String,
  },
  skills: { // 기술 스택
    type: [String], // 배열이라는 의미에요. skills 배열의 값으로 들어갑니다.
  },
  bio: { // 자신의 설명
    type: String,
  },
  githubusername: { // 깃허브 아이디
    type: String,
  },
  experience: [ // 경력 
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: { //언제부터
        type: Date,
        required: true,
      }, 
      to: { // 언제까지
        type: Date,
      },
      current: { // 지금 일하는 직장인지?
        type: Boolean,
        default: false,
      },
      description: { // 자신이 어떤일은 설명
        type: String,
      },
    },
  ],
  education: [ // 학력
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: [
    {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IProfile & mongoose.Document>(
  "Profile",
  ProfileSchema
);
```


<details><summary><b>정답 코드</b></summary>

<p>

## IExperience.ts

```typescript
export interface IExperience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: Boolean;
  description: string;
}
```

## IEducation.ts

```typescript
export interface IEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}
```

## ISocial.ts

```typescript
export interface ISocial {
  youtube: String;
  twitter: String;
  facebook: String;
  linkedin: String;
  instagram: String;
}
```

## IProfile.ts

```typescript
import mongoose from "mongoose";
import { IExperience } from "./IExperience";
import { IEducation } from "./IEducation";
import { ISocial } from "./ISocial";

export interface IProfile {
  user: mongoose.Types.ObjectId;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: [IExperience];
  education: [IEducation];
  social: [ISocial];
  date: Date;
}

export interface IProfileInputDTO {
  user: string;
  user: mongoose.Types.ObjectId;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: [string];
  bio: string;
  githubusername: string;
  experience: [IExperience];
  education: [IEducation];
  social: [ISocial];
  date: Date;
}
```


</p>
</details>