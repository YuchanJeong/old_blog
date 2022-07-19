---
title: "[React-query] React Query와 상태관리 (feat. 2월 우아한테크세미나)"
date: 2022-07-18
categories:
  - <Studies>
tags:
  - React-query
---

{{< alert >}}
정리 필요
{{< /alert >}}

# 상태관리

상태란?
주어진 시간에 대해 시스템을 나타내는 것으로 언제든지 변경될 수 있음 - 개발자 입장에서는 관리해야 하는 데이터

모던 웹프론트엔드 개발
UI/UX 중요성과 함께 FE에서 수행하는 역할이 늘어남 -> 관리하는 상태가 많아짐

상태관리란?
상태를 관리하는 방법에 대한 것
리액트는 단반향 바인딩이라 Props Drilling 이슈가 존재
Redux나 MobX같은 라이브러리로 이 문제를 해결하기도 함

# 주문 FE 프로덕트를 보며 가진 고민

너무 세분화 되어있었음 각각 레포가 다 달랐음 2021년 여름
이왕 할꺼 Repo 합치고 레거시도 치우고 신기술 검토도 하면서 주문 FE 아키텍처 통합해보자
Store는 전역 상태가 저장되고 관리되는 공간인데 상태 관리보다는 API 통신 코드로 보인다

여기서 다 관리하는게 맞나?
반복되는 API 관련 상태
반복되는 비슷한 구조의 API 통신 코드

서버에서 받아야하는 상태들에 특성
Client에서 제어하거나 소유되지 않은 원격의 공간에서 관리되고 유지됨
Fetching이나 Updating에 비동기 API가 필요함
다은 사람들과 공유되는 것으로 사용가자 모르는 사이에 변경될 수 있음
신경 쓰지 않는다면 잠재적으로 "out of data"가 될 가능성을 지님

사실상 FE에서 이 값이 저장되어있는 state들은 일종의 캐시

어쩌면 다른 관리방법이 있으면 좋을지도

상태를 두가지로 나눔 Client State vs Server state

Ownership이 클라이언트에 있냐 Server에 있냐 차이

주문에서는 React Query 사용

# React Query 살펴보기

## Overview

데이터 가져오기, 캐시, 동기화, 데이터 업데이트를 다룬다.

세가지 컨셉 퀙 스타트에 잘 나와있음

### Use Query

Queries

데이터 패칭용 Reading에만 사용
Query Key
Query Function 프로미스를 반환하는 함수

반환하는거 많음

data, error, isLoading, refetch, onSuccess, onError

config 커스텀은? 뒤에 옵션

enabled, refetchInterval, keepPreviousData, refetchInterval

쿼리즈 파일 분리 추천 (스샷있음)

Q. enabled 옵션을 state로 관리할지 아님 false로 두고 refetch()를 사용할지? refetch 쓰다가 ㅈㄴ 복잡한 컨디션 일때만 useState 사용

### Mutation

쿼리 키를 넣어주면 devtools에서 볼 수 있음 없어도 됨

반환, mutate, mutateAsync

옵션 onMutate 본격적인 뮤테이선 동작전에 실행 Optimistic update 적용할 때 유용!!! Ex. facebook 좋아요 UI 실패하면 롤백

### Invalidation

메서드 호출하면 끝
해당 키를 가진 쿼리는 stale 취급되고 현재 랜더링 되는 쿼리들은 백그에서 리패치됨 키 없으면 전체

---

자기소개 자랑에 비해서 부족하지 않음??

# Cashing과 Synchronization

cacheTime 메모리에 얼마나 있을 지 (def 5분)
staleTime (def 0)

기본값들 저기 있음!!!

똑같은 쿼리 가지 컴포가 생기면 다시 생성함!

# 어디에서 값을 관리할까요?

전역 상태처럼 관리되는 데이터들!!!

Context API

---

이거 좋아요

서버상태 관리 용이하며 직관적이 API 호출 코드

API 처리에 관한 각종 인터페이스 및 옵션 제공

Client Store가 FE에서 정말 필요한 전역 상태만 남아 Store 답게 사용 (Boilerplate 코드 매우 감소)

devtools 제공으로 원할한 디버깅

cache 전략 필요할 떄

---

고민 필요?

컴포넌트가 비대해지는 문제 난이도가 높아짐 컴포넌트 유착 최소화

---

트랜드 보다는 Why가 중요!!!!!
