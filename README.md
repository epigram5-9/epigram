```
# NPM을 사용하고 node 버전은 20.15.0로 고정합니다.

`nvm`을 활용해보세요!

# Branch Convention

핵심이되는 `develop` , `main`, `epic/*` 브랜치 등에는 직접적으로 commit, push등을 진행할 수 없습니다.
(local husky, repository branch setting 등 에서 위 행동을 할 수 없게 강제합니다.)

> `main` , `master`, `develop`, `feat/*`, `hotfix/*`, `epic/*`, `setting/*`, `fix/*`, `refactor/*` 브랜치들의 PR이 오픈되면 build 테스트를 진행하며 빌드실패 시 PR을 머지할 수 없습니다.

## main / develop
위 브랜치들에게 머지를 진행할때는 깔끔한 Git 이력을 위해 꼭 squash merge가 될 수 있도록 합니다.
(PR에서 머지버튼을 누르기 전에 한번더 확인하기)

## epic
epic 브랜치는 큰 갈래의 업무 태스크를 뜻합니다. ex) 00 page 작업 / 프로젝트 전반에 걸친 공통 작업 (공용 컴포넌트, 공용 api 컨트롤러 등)

그렇기 때문에 epic브랜치에서 직접적으로 작업을 진행하기보다는 epic브랜치에서 `feat/` feature 브랜치, `refactor/` 리팩토링 브랜치 등을 만들어서 작업을 진행합니다.

**`epic/` 브랜치에는 직접적으로 commit, push등을 진행할 수 없습니다.**

## feat
feature 브랜치는 작은 갈래의 업무 태스크를 뜻합니다. ex) 00 page의 특정 컴포넌트 작업 / 00 page의 특정 모듈 작업 / 공통 컴포넌트 중 00 컴포넌트 작업 등

그렇기 때문에 feature브랜치는 명확히 브랜치의 목적에 맞는 작업만을 가지고 있어야 하며 사이즈는 작아야 합니다
(팀원들이 부담없이 리뷰할 수 있게)
>권장되는 사이즈는 file changes 기준으로 10개 미만의 파일이 변경되어야 합니다

## merge
위 브랜치 컨벤션을 기준으로 하면 `epic`브랜치는 생성된 시점에서부터 꽤나 오랜시간동안 살아있는 브랜치가 됩니다.
이는 `epic`브랜치를 `develop`에 머지할 때 conflict가 날 가능성도 그만큼 높다는 이야기가 됩니다. 
때문에 그러한 병합 위험속에서 안전하게 병합을 진행하기 위해 **`merge/*`** 브랜치를 생성하는걸 추천드립니다. 

1. `merge/` 브랜치  는 `epic/` 브랜치로 부터 생성하며 생성한 즉시 `develop`을 pull받습니다.
    > epic/main-page -> merge/main-page 생성

    > merge/main-page 브랜치로 이동하고 `develop` 브랜치를 pull 받기
2. `develop`을 pull 받는 순간 `merge/` 브랜치는 `epic/`의 변경사항과 `develop`의 변경사항을 함께 가지게 됩니다.
3. 높은 확률로 conflict가 발생할태니 잘 해결해주세요
4. conflict를 해결하고 나면 `merge/` 브랜치를 `epic/` 브랜치에 merge할 수 있게 PR을 생성합니다.
    > merge/main-page -> epic/main-page PR 생성

    > epic/main-page 에  merge/main-page 병합
5. PR을 머지하고 나면 `develop`브랜치에 다른 변경사항이 push되기 전까지는 `epic/`는 `develop` 브랜치에 안전하게 merge할 수 있는 상태가 됩니다.
6.  `epic/` 브랜치를 `develop/` 브랜치에 merge할 수 있는 PR을 생성합니다.
7. PR에서 conflict가 발생하지 않는것이 확인되면 해당 PR을 머지시킵니다.

## 주의사항
위에서 정의한 `main` , `master`, `develop`, `feat/*`, `hotfix/*`, `epic/*`, `setting/*`, `fix/*`, `refactor/` 브랜치 외에 다른 형식의 브랜치 생성을 금지합니다.


# PR
모든 브랜치의 병합과정에선 PR이 필요합니다.
PR를 병합하는데에는 몇가지 규칙이 존재합니다.
1. PR이 올라올 시 build test를 진행함. `build`가 실패한다면 PR을 머지 할 수 없음
2. PR은 무조건 1명 이상의 reviwer에게 `approve`를 받아야함 그렇지 않으면 PR을 머지 할 수 없음
3. PR에는 꼭 label을 붙혀야 함
4. PR은 Assignee 및 Reviewer 지정이 필수임
5. PR의 제목은 `[Epic] OO` 에픽, `[Feat] OO` 피쳐, `[Fix] OO` 버그 수정, `[Refactor] OO` 개선 와 같은 convention을 꼭 지켜야 함


## Label
현재 레포지토리에 존재하는 모든 `label`을 삭제하고 
아래의 Label로 세팅하는걸 권장합니다. 

### Label 목록
```tsx
{ name: "Priority: High 🔥", description: '우선순위 높음', color: "F9D0C4" },
{ name: "Priority: Low 🐢", description: '우선순위 낮음', color: "C2E0C6" },
{ name: "Priority: Medium :bookmark:", description: '우선순위 보통', color: "FEF2C0" },
{ name: "Type: Doc :memo:", description: '문서 추가 / 수정', color: "0075ca" },
{ name: "Type: Bug :bug:", description: '버그', color: "d73a4a" },
{ name: "Type: Epic :rocket:", description: '큰 단위의 브랜치', color: "051C35" },
{ name: "Type: Feature :sparkles:", description: '신규 기능', color: "AB5D19" },
{ name: "Type: Improve UX :arrow_up:", description: 'UX 개선', color: "2CE151" },
{ name: "Type: Merge :truck:", description: '머지', color: "4A7A8F" },
{ name: "Type: Refactor :recycle:", description: '리팩토링', color: "027B6B" }
```

### Label 사용법
먼저 `Priority` 라벨은 필수적으로 설정해야합니다. 
또한 팀원들은 `Priority: High 🔥` PR이 올라왔다는 알림을 받으면 하던 작업을 최대한 빠르게 끝마치고, 해당 PR에 대한 리뷰를 진행해야합니다.

브랜치에 따라 `Feature` `Improve UX` `Refactor` `Merge` `Epic` `Bug`등의 타입을 꼭 지정해주세요


# Husky 
husky는 local git hook 사용을 도와주는 라이브러리입니다.
현재 프로젝트에는 크게 2가지 규직이 존재합니다.

## pre-commit
`pre-commit.yaml` 파일은 commit을 남기기 전 scipt를 정의합니다.

현 프로젝트에서는 `npm run lint` 를 통해 lint를 실행시키고 만약 실패 시 commit이 남지 못하게 합니다.

또한 

```yaml
current_branch=$(git branch --show-current)

restricted_branches="^(main|master|develop|epic/.+)$"

if [[ $current_branch =~ $restricted_branches ]]; then
  echo ":construction: You are on a restricted branch: $current_branch."
  echo "Commits to this branch are not allowed via pre-commit hook."
  exit 1
fi
```
을 통해 `main|master|develop|epic/` 브랜치에서의 commit을 탐지하고, 해당 브랜치에선 commit을 남길 수 없게 합니다.


## pre-push
`pre-push.yaml` 파일은 push하기 전 scipt를 정의합니다.

```yaml
current_branch=$(git branch --show-current)

restricted_branches="^(main|master|develop|epic/.+)$"

if [[ $current_branch =~ $restricted_branches ]]; then
  echo ":construction: You are on a restricted branch: $current_branch."
  echo "Commits to this branch are not allowed via pre-commit hook."
  exit 1
fi
```
을 통해 `main|master|develop|epic/` 브랜치에서의 push를 탐지하고, 해당 브랜치에선 push를 할 수 없게 합니다.


# 기본 세팅되어있는 라이브러리들

해당 프로젝트는 `Next.js page router`, `Tanstack Query`, `query-key-factory`, `axios`, `qs`, `react-hook-form`, `zod`, `tailwind`, `typescript` 등이 설치되어 있습니다. 

사용하지 않으셔도 좋지만 대부분 현업에서 굉장히 많이, 표준적으로 사용하는 셋업들이니 사용하시는 방향을 좀 더 추천드립니다. 
```

