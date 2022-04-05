---
title: "BC-5w-추석(3) / 5주 차 정리 + {FC} React(6)"
date: 2021-09-26
categories:
  - "'Bootcamp'"
tags:
  - React
  - Retrospect
---

## 5주 차 정리(추석 연휴)

- 19일은 외가, 20일은 산소, 21일은 친가를 방문하였다.
- 21일 친가를 다녀온 뒤 블로그 이전을 시작하였다. 기존의 티스토리 블로그에서 코드 블록이 자동으로 풀려있고, 맞춤법 검사 페이지에서 넘어갈 수 없고, 작성 도중 갑자기 글의 시작 부분에 삽입이 되는 문제와 리스트를 작성했을 때 간격이 재멋데로인 점 때문에 깃허브 블로그로 이전을 결심하였다.
- 깃허브 블로그를 만드는 여러 방법 중 가장 인기가 많은 Jekyll을 사용하기로 하였다. 하지만 M1 환경에서는 여러 에러가 있었다. 검색을 통해 하나씩 해결하면서 설치를 완료하였고, 테스트 결과도 성공적이었다. 그래서 이제 내가 원하는 형태로 커스터마이징을 하는데 도중에 다시 에러가 발생하였다. 해결법을 찾다가 실패하고 전부 지운 뒤 다시 다운을 받았다. 하지만 이제는 기본 설정을 전혀 건드리지 않은 상태에서도 로컬 서버 구축과 첫 포스트 외의 포스트 게시가 되지 않는 문제가 있었다. jekyll과 ruby까지 재설치하고
- 22일, 결국 대안으로 hugo를 선택하였다. jekyll은 처음부터 여러 에러가 발생하여 하나씩 고치면서 설치를 진행한데 반해, hugo는 M1 환경에서도 아무 에러가 나지 않으며 포스팅 속도가 더 빠르다는 장점도 있어서 매우 마음에 들었다. hugo를 통한 블로그 구축은 매우 쉽고 빠르게 진행되었으며, 커스터마이징도 내가 원하는 데로 할 수 있었다.
- 23일과 24일은 기존 티스토리 블로그의 포스팅을 깃허브 블로그로 옮기는 작업을 하였다. 동시에 작성 양식을 다듬으면서 복습도 진행하였다.
- 24일 오후부터는 패스트 캠퍼스 리액트 강의를 듣기 시작하였다.
- 22일 저녁부터 감기 기운이 있었다. 저녁에도 반팔 반바지로 외출한 게 원인인 것 같다. 다행히 기침과 열은 없었다. 목 통증, 가래, 두통, 근육통이 있었다. 최대한 따뜻한 물을 자주 마시며 휴식과 공부를 병행하였다. 조금 괜찮아져서 25일 저녁 가족과 외식을 다녀왔는데 26일 아침에 더 심해져 있었다. 몸이 아프니까 뇌의 처리능력도 떨어진 것 같다. 강의에 집중이 잘되지 않았다. 그래도 평소에 조금씩 운동을 해서 그런지 체력적으로는 버틸 수 있었다.
- 추석이 되기 전에 패스트 캠퍼스의 React 강의는 적어도 다 보는 것이 목표였다. 하지만 블로그 이전과 감기 이슈로 강의가 조금 남아서 아쉽다. 그래도 이전한 블로그는 매우 만족스럽고, 이전 도중에 자연스럽게 총 복습도 진행할 수 있었던 점은 좋았다.

## + React with FastCampus(6) Testing

- JavaScript Unit Test with JEST

  - npm i jest -D
  - "test": "jest"
  - npx jest --watchAll
  - it("test명", () => {})
    - expect().toBe()
  - describe("", () => {})
    - 함수 안에 여러개의 it를 넣어서 그룹화 가능
  - Ex.

    ```js
    describe("expect test", () => {
      it("1 + 2 = 3", () => {
        expect(1 + 2).toBe(3);
      });
      it("{age: 39} to equal {age: 39}", () => {
        expect({ age: 39 }).toEqual({ age: 39 });
      }); // fail
      it("{age: 39} to equal {age: 39}", () => {
        expect({ age: 39 }).toEqual({ age: 39 });
      }); // pass
      it(".toHaveLength", () => {
        expect("hello").toHaveLength(5);
      });
      it(".toHaveProperty", () => {
        expect({ name: "Yuchan" }).toHaveProperty("name", "Yuchan");
      });
      it(".toBeDefined", () => {
        expect({ name: "Yuchan" }.name).toBeDefined();
      });
      it(".toBeFalsy", () => {
        expect().toBeFalsy();
      });
      it(".toBeGreaterThan", () => {
        expect(10).toBeGreaterThan(9);
      });
      it(".toBeGreaterThanOrEqual", () => {
        expect(10).toBeGreaterThanOrEqual(10);
      });
      it(".toBeInstanceOf", () => {
        class Foo {}
        expect(new Foo()).toBeInstanceOf(Foo);
      });
    });
    ```

    - .not.to...도 가능

  - 비동기 테스트

    - async test with done callback
      ```js
      describe("use async test", () => {
        it("setTimeout with done", (done) => {
          setTimeout(() => {
            expect(37).toBe(36);
            done();
          }, 1000);
        });
      });
      ```
    - async test with promise

      ```js
      describe("use async test", () => {
        it("promise then", () => {
          function p() {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(37);
              }, 1000);
            });
          }
          return p().then((data) => expect(data).toBe(37));
        });

        it("promise catch", () => {
          function p() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error("error"));
              }, 1000);
            });
          }
          return p().catch((e) => expect(e).toBeInstanceOf(Error));
        });
      });
      ```

      ```js
      describe("use async test", () => {
        it("promise .resolves", () => {
          function p() {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(37);
              }, 1000);
            });
          }
          return expect(p()).resolves.toBe(37);
        });

        it("promise .rejects", () => {
          function p() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error("error"));
              }, 1000);
            });
          }
          return expect(p()).rejects.toBeInstanceOf(Error);
        });
      });
      ```

    - async test with async-await(Best way)

      ```js
      describe("use async test", () => {
        it("async-await", async () => {
          function p() {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(37);
              }, 1000);
            });
          }

          const data = await p();
          return expect(data).toBe(37);
        });
      });
      ```

      ```js
      describe("use async test", () => {
        it("async-await, catch", async () => {
          function p() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(new Error("error"));
              }, 1000);
            });
          }

          try {
            await p();
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
          }
        });
      });
      ```

- React Component Test

  - \_\_tests\_\_ 폴더 안의 .js 파일
  - .test.js 로 끝나는 파일
  - .spec.js 로 끝나는 파일

- testing-libraryreact 활용하기

  ```js
  // Button.test.js
  import { render, fireEvent, act } from "@testing-library/react";
  import Button from "./Button";

  describe("Button 컴포넌트 (@testing-library/react)", () => {
    it("컴포넌트가 정상적으로 생성된다.", () => {
      const button = render(<Button />);
      expect(button).not.toBeNull();
    });

    it('"button" 이라고 쓰여있는 엘리먼트는 HTMLButtonElement 이다.', () => {
      const { getByText } = render(<Button />);

      const buttonElement = getByText("button");
      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
    });

    it('버튼을 클릭하면, p 태그 안에 "버튼이 방금 눌렸다." 라고 쓰여진다.', () => {
      const { getByText } = render(<Button />);

      const buttonElement = getByText("button");

      fireEvent.click(buttonElement);

      const p = getByText("버튼이 방금 눌렸다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });

    it(`버튼을 클릭하기 전에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, () => {
      const { getByText } = render(<Button />);

      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });

    it(`버튼을 클릭하고 5초 뒤에는, p 태그 안에 "버튼이 눌리지 않았다." 라고 쓰여진다.`, async () => {
      jest.useFakeTimers();

      const { getByText } = render(<Button />);

      const buttonElement = getByText("button");
      fireEvent.click(buttonElement);
      // Arrange Act Assert
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      const p = getByText("버튼이 눌리지 않았다.");
      expect(p).not.toBeNull();
      expect(p).toBeInstanceOf(HTMLParagraphElement);
    });

    it(`버튼을 클릭하면, 5초 동안 버튼이 비활성화 된다.`, () => {
      jest.useFakeTimers();

      const { getByText } = render(<Button />);

      const buttonElement = getByText("button");
      fireEvent.click(buttonElement);

      expect(buttonElement).toBeDisabled();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(buttonElement).not.toBeDisabled();
    });
  });
  ```

  ```js
  // jsx
  import { useEffect, useRef, useState } from "react";

  const BUTTON_TEXT = {
    NORMAL: "버튼이 눌리지 않았다.",
    CLICKED: "버튼이 방금 눌렸다.",
  };

  const Button = () => {
    const [message, setMessage] = useState(BUTTON_TEXT.NORMAL);
    const timer = useRef();

    function click() {
      setMessage(BUTTON_TEXT.CLICKED);
      timer.current = setTimeout(() => {
        setMessage(BUTTON_TEXT.NORMAL);
      }, 5000);
    }

    useEffect(() => {
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, []);

    return (
      <>
        <button onClick={click} disabled={message === BUTTON_TEXT.CLICKED}>
          button
        </button>
        <p>{message}</p>
      </>
    );
  };

  export default Button;
  ```

  - [jest-dom](https://github.com/testing-library/jest-dom#table-of-contents)
  - [user-event](https://testing-library.com/docs/ecosystem-user-event/)
