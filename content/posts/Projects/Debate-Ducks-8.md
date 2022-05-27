---
title: "[Debate-Ducks] WebSocket - Debate"
date: 2022-05-27
categories:
  - <Projects>
tags:
  - "'Debate-Ducks'"
  - (Devlog)
---

## Summary

추가 작성 예정

## Details

### 토론 시작

준비 버튼을 누르면 해당 정보가 서버의 `roomDebates` 객체에 저장되고, 찬반 양측이 모두 준비 상태가 되면 토론이 시작된다. 이전에는 한쪽의 연결이 끊기면 토론을 종료 시켰으나 이번에는 토론이 한번 시작되면 재연결을 해도 토론이 계속 진행되게 하고 싶었기 때문에 토론이 시작되는 시점에 서버에 토론의 시작 여부를 저장해서 재연결을 해도 토론과 녹화가 계속 진행될 수 있게 했다.

![debate-start](https://user-images.githubusercontent.com/84524514/170584346-b2296711-7778-433f-81c1-1abba46f8fb6.gif)
