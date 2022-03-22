---
title: "BC-Final / Final Project 기능 회고"
date: 2022-03-21
categories:
  - "'Bootcamp'"
tags:
  - Retrospect
---

> 실시간 토론 기능 구현 회고

\*전체적인 회고는 따로 [회고록](https://yuchanjeong.github.io/posts/bootcamp/bc-final-1/)에 작성

# Debate Ducks

![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/84524514/157165010-9eb69e44-fe59-4738-9c00-b288b16eb62b.gif)

- [Notion](https://codestates.notion.site/2-SuSang-YuHee-Debate-Ducks-142843d8e3524de2ae72fa2b66fc54f2)
- [Github](https://github.com/codestates/debate-ducks)
- [Demo](https://debate-ducks.click/)

## 1. Socket.io [\*](https://socket.io/)

### a. Init

- Server

  ```js
  const options = {
    key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
    cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
  };
  const https = require("https");
  const server = https.createServer(options, app);
  const { Server } = require("socket.io");
  // socket 서버를 따로 사용하지 않고, https 서버와 공유
  const io = new Server(server, { cors: { origin: "*" } });
  ```

- Client

  ```jsx
  import io from "socket.io-client";
  import { useState, useEffect } from "react";
  ...

  export default function DebateRoom() {
    const [socket, setSocket] = useState({});

    useEffect(() => {
      setSocket(io(`${process.env.REACT_APP_API_URL}`));
    }, []);

    // 정보를 받아오기 전에는 로딩 페이지를 보여줌
    return <div>{Object.keys(socket).length !== 0 ? <RealtimeDebate socket={socket} /> : <Loading />}</div>;
  }
  ```

### b. Enter

- Server

  ```js
  // 연결 시 액션
  io.on("connection", (socket) => {
    // 연결이 잠시라도 끊길 시 액션 (disconnect: 완전히 끊길 시 액션)
    socket.on("disconnecting", () => {
      ...
    });

    ...

    socket.on("enter", (data, done) => {
      const userCount = io.sockets.adapter.rooms.get(data.debateId)?.size;

      // 이미 두 명 이상이 방에 있으면 입장 거절
      if (userCount >= 2) {
        done("rejected");
      } else {
        socket.join(data.debateId);
        socket.to(data.debateId).emit("guest_enter");
        done("fulfilled");
      }
    });
  };
  ```

- Client

  ```jsx
  socket.emit("enter", { debateId }, (status) => {
    switch (status) {
      case "rejected":
        setIsExceedModalOn(true);
        setNotice({ ...notice, ...{ turn: "pre", text: "Entry is not allowed. The room is currently full." } });
        break;
      case "fulfilled":
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
          setStream(stream);
          if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
          }
        });
        setNotice({ ...notice, ...{ turn: "pre", text: "Waiting for another debater to join." } });
        break;
    }
  });

  ...

  function disconnect() {
    myVideoRef?.current?.srcObject.getTracks().forEach((track) => {
      track.stop();
    });

    peerVideoRef?.current?.srcObject?.getTracks().forEach((track) => {
      track.stop();
    });

    myPeer?.current?.destroy();

    socket.emit("leave", { debateId });
    socket.disconnect();
  }
  ```

### c. Connect

\*[simple-peer](https://github.com/feross/simple-peer)

```jsx
// <두 번째 사람 입장 시 첫 번째 사람에게 발생하는 액션>
socket.on("guest_enter", () => {
  setNotice({ ...notice, ...{ turn: "pre", text: "To start the debate, press the start button in the upper right corner." } });

  // 사용자 미디어 획득
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      setStream(stream);
      setIsConnected(true);

      // Video 재생
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // Peer 생성
      const peer = new Peer({
        // Host
        initiator: true,
        trickle: false,
        config: {
          iceServers: [
            { url: "stun:stun.l.google.com:19302" },
            { url: "stun:stun1.l.google.com:19302" },
            { url: "stun:stun2.l.google.com:19302" },
            { url: "stun:stun3.l.google.com:19302" },
            { url: "stun:stun4.l.google.com:19302" },
            { url: "stun:stun.nextcloud.com:443" },
          ],
        },
        // Stream 전달
        stream,
      });

      myPeer.current = peer;

      // Signal 발생
      peer.on("signal", (signal) => {
        socket.emit("host_signal", { debateId, signal });
      });

      // Stream 발생
      peer.on("stream", (stream) => {
        setPeerStream(stream);

        if (peerVideoRef.current) {
          peerVideoRef.current.srcObject = stream;
        }
      });

      // Error 발생
      peer.on("error", () => {
        setIsConnected(false);
        setIsErrorModalOn(true);
      });

      socket.on("guest_signal", (data) => {
        // Signal 전달
        peer.signal(data.signal);
      });
    })
    .catch(() => {
      setIsConnected(false);
      setIsErrorModalOn(true);
    });
});

// <두 번째 사람 입장 시 두 번째 사람에게 발생하는 액션>
socket.on("host_signal", (data) => {
  setNotice({ ...notice, ...{ turn: "pre", text: "To start the debate, press the start button in the upper right corner." } });

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          setIsConnected(true);

          if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
          }

          const peer = new Peer({
            // Guest
            initiator: false,
            trickle: false,
            stream,
          });

          myPeer.current = peer;

          peer.on("signal", (signal) => {
            socket.emit("guest_signal", { debateId, signal });
          });

          peer.on("stream", (stream) => {
            setPeerStream(stream);

            if (peerVideoRef.current) {
              peerVideoRef.current.srcObject = stream;
            }
          });

          peer.on("error", () => {
            setIsConnected(false);
            setIsErrorModalOn(true);
          });

          // Signal 전달
          peer.signal(data.signal);
        })
        .catch(() => {
          setIsConnected(false);
          setIsErrorModalOn(true);
        });
}
```

## 2. Mute & Screen Share

- Mute

  ```jsx
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  function toggleMuteAudio(boolean) {
    if (stream) {
      setIsAudioMuted(boolean);
      stream.getAudioTracks()[0].enabled = !boolean;
    }
  }

  function toggleMuteVideo(boolean) {
    if (stream) {
      setIsVideoMuted(boolean);
      stream.getVideoTracks()[0].enabled = !boolean;
    }
  }
  ```

- Screen Share

  ```jsx
  function shareScreen() {
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((screenStream) => {
      // Screen Share On
      // 얻은 공유 화면 스트림의 비디오 트랙으로 기존 스트림의 비디오 트랙 대체
      myPeer?.current?.replaceTrack(stream?.getVideoTracks()[0], screenStream?.getVideoTracks()[0], stream);

      if (myVideoRef?.current) {
        // 비디오 스트림 대체
        myVideoRef.current.srcObject = screenStream;

        if (isPro) {
          setIsProScreenOn(true);
        } else if (!isPro) {
          setIsConScreenOn(true);
        }

        socket.emit("screen_on", { debateId, isPro });
      }

      // Screen Share Off
      // 기존 스트림의 비디오 트랙으로 공유 화면의 스트림의 비디오 트랙 대체
      screenStream.getTracks()[0].onended = () => {
        myPeer?.current?.replaceTrack(screenStream?.getVideoTracks()[0], stream?.getVideoTracks()[0], stream);

        if (myVideoRef?.current) {
          // 비디오 스트림 대체
          myVideoRef.current.srcObject = stream;

          if (isPro) {
            setIsProScreenOn(false);
          } else if (!isPro) {
            setIsConScreenOn(false);
          }

          socket.emit("screen_off", { debateId, isPro });
        }
      };
    });
  }
  ```

## 3. Canvas [\*](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

- Video

  ```jsx
  function drawVideo() {
    // Eraser : 이미 그려진 부분 지우기
    const EraserCtx = canvasRef?.current?.getContext("2d");
    if (EraserCtx) {
      EraserCtx.fillStyle = "White";
      EraserCtx.fillRect(0, 40, 1280, 620);
    }

    // Pro : 찬성 측 그릴 요소들
    const proCtx = canvasRef?.current?.getContext("2d");
    if (proCtx) {
      proCtx.fillStyle = "#ff9425";
      proCtx.fillRect(10, 90, 620, 470);
    }

    const proBgCtx = canvasRef?.current?.getContext("2d");
    if (proBgCtx) {
      proBgCtx.fillStyle = "White";
      proBgCtx.fillRect(20, 580, 600, 60);
    }

    const proTextCtx = canvasRef?.current?.getContext("2d");
    if (proTextCtx) {
      proTextCtx.font = "32px poppins";
      proTextCtx.fillStyle = "#ff9425";
      proTextCtx.textAlign = "center";
      proTextCtx.fillText(`${debateInfo.proName}`, 320, 620);
    }

    // Con : 반대 측 그릴 요소들
    ...

    // Draw : 실제로 그리기
    if (isPro) {
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 660, 100, 600, 450);
    } else if (!isPro) {
      canvasRef?.current?.getContext("2d").drawImage(peerVideoRef?.current, 20, 100, 600, 450);
      canvasRef?.current?.getContext("2d").drawImage(myVideoRef?.current, 660, 100, 600, 450);
    }
  }
  ```

- Notice

  ```jsx
  useEffect(() => {
    let color;
    switch (notice?.turn) {
      case "pre":
        color = "black";
        break;
      case "pro":
        color = "#ff9425";
        break;
      case "con":
        color = "#6667ab";
        break;
    }

    // Eraser
    const backgroundCtx = canvasRef?.current?.getContext("2d");
    if (backgroundCtx) {
      backgroundCtx.fillStyle = color;
      backgroundCtx.fillRect(0, 0, canvasRef?.current?.width, 40);
    }

    // Notice & Draw
    const noticeCtx = canvasRef?.current?.getContext("2d");
    if (noticeCtx) {
      noticeCtx.font = "18px poppins";
      noticeCtx.fillStyle = "White";
      noticeCtx.textAlign = "center";

      if (notice?.turn === "pre") {
        noticeCtx.fillText(`${notice?.text}`, canvasRef?.current?.width / 2, 25);
      } else if (notice?.turn === "pro" || notice?.turn === "con") {
        noticeCtx.fillText(`${notice?.text} ( ${notice?.time} sec )`, canvasRef?.current?.width / 2, 25);
      }
    }
  }, [notice.text, notice.time]);
  ```

## 4. Record

```jsx
const mergedAudioTracks = useRef({});
const canvasStream = useRef({});
const mergedStream = useRef({});
const mergedRecorder = useRef({});
const mergedBlobs = useRef([]);
const mergedBlob = useRef({});
const mergedUrl = useRef("");

// 토론 시작
socket.on("debate_start", () => {
  // 캔버스 스트림 얻음
  canvasStream.current = canvasRef?.current?.captureStream();

  // 캔버스 스트림의 비디오 트랙과 합쳐진 오디오 트랙 합침
  const mergeTracks = [...canvasStream.current.getVideoTracks(), ...mergedAudioTracks.current];

  // 합쳐진 트랙에서 스트림 생성
  mergedStream.current = new MediaStream(mergeTracks);

  // 레코더 생성
  mergedRecorder.current = new MediaRecorder(mergedStream?.current, { mimeType: "video/webm" });

  // Blobs에 얻은 데이터들 추가하기
  mergedRecorder.current.ondataavailable = (ev) => {
    mergedBlobs.current = [...mergedBlobs.current, ev.data];
  };

  // 녹화 종료 시 액션
  mergedRecorder.current.onstop = async () => {
    // blobs의 요소들을 합친 새로운 스트림 생성
    mergedBlob.current = new Blob(mergedBlobs?.current, { type: "video/webm" });

    // 저장 가능한 url 생성
    mergedUrl.current = window.URL.createObjectURL(mergedBlob?.current);

    // 저장 가능한 링크
    aRef.current.href = mergedUrl?.current;

    const videoUrl = await saveVideo(mergedBlob?.current, `${debateInfo.title}_${debateId}`);

    axios.patch(`${process.env.REACT_APP_API_URL}/debate/debate_room/${debateId}/video`, { videoUrl }, { withCredentials: true });
  };

  // 60프레임으로 녹화 시작
  mergedRecorder?.current?.start(1000 / 60);

  setNotice({ ...notice, ...{ turn: "pre", text: `Topic : ${debateInfo.title}` } });

  setTimeout(() => {
    setIsProTurn(true);
    setNotice({ ...notice, ...{ turn: "pre", text: "The debate will begin soon with the opening remarks of the pro. ( 60 sec )" } });
  }, 3000);

  setTimeout(() => {
    socket.emit("debate_opening_pro", { debateId });
  }, 6000);
});

// 오디오 트랙 합침
useEffect(() => {
  function mergeAudioTracks(myStream, peerStream) {
    const context = new AudioContext();
    const destination = context.createMediaStreamDestination();

    const source1 = context.createMediaStreamSource(myStream);
    const myStreamGain = context.createGain();
    source1.connect(myStreamGain).connect(destination);

    const source2 = context.createMediaStreamSource(peerStream);
    const peerStreamGain = context.createGain();
    source2.connect(peerStreamGain).connect(destination);

    return destination.stream.getAudioTracks();
  }

  if (stream && peerStream) {
    mergedAudioTracks.current = mergeAudioTracks(stream, peerStream);
  }
}, [stream, peerStream]);
```

## Ps. Problem Solving

### a. Backspace & Reload

- Problem
  - 뒤로 가기 후 앞으로 다시 왔을 때나 새로고침 후 20% 확률로 사용자가 서로 연결되지 않고 각자 연결만 기다림
- Solving

  - 뒤로 가기는 작동하지 않게 막고 새로고침은 한 쪽의 연결이 끊겼을 때 다른 측의 연결도 끊어서 해결

  - 뒤로가기 방지 Hook

    ```jsx
    import { useEffect } from "react";

    export default function usePrevent() {
      useEffect(() => {
        const preventGoBack = () => {
          history.pushState(null, "", location.href);
        };

        history.pushState(null, "", location.href);

        window.addEventListener("popstate", preventGoBack);

        return () => window.removeEventListener("popstate", preventGoBack);
      }, []);
    }
    ```

### b. Draw Video on Canvas

- Problem
  - 비디오를 캔버스에 그릴 때, 비디오가 사용자 뷰에서 벗어나면 더 이상 캔버스에 그려지지 않음
- Solving
  - 보이지 않는 비디오를 화면 가운데 고정해서 해결
    ```jsx
    <div className="w-screen h-screen flex justify-center items-center fixed">
      <video ref={myVideoRef} muted autoPlay playsInline width="0" height="0"></video>
      <video ref={peerVideoRef} autoPlay playsInline width="0" height="0"></video>
    </div>
    ```

### c. Screen Share

- Problem
  - 화면 공유 시 탭이나 앱을 공유할 경우 가로세로 비율이 달라서 캔버스에 적절한 비율로 그릴 수 없음
- Solving

  - 가로와 세로 중 더 긴 거에 맞춰서 같은 비율로 조정하고, 조정 후 짧은 게 캔버스의 크기보다 클 경우 다시 비율에 맞게 조정

    ```jsx
    function resize(video) {
      let width = 0;
      let height = 0;

      if (video.videoWidth >= video.videoHeight) {
        width = 1280;
        height = (1280 * video.videoHeight) / video.videoWidth;

        if (height > 620) {
          width = (1280 * 620) / height;
          height = 620;
        }
      } else if (video.videoWidth < video.videoHeight) {
        width = (620 * video.videoWidth) / video.videoHeight;
        height = 620;
      }

      return [width, height];
    }
    ```

### d. Timer

- Problem
  - 클라이언트에서 타이머를 사용할 경우 사용자 간에 1~2초의 차이가 있었음
- Solving

  - 서버에서 타이머를 사용해서 해결

  - Server

    ```js
    let isClear = false;

    function startTimer(data, sec, curAction, nextAction) {
      let time = sec;

      const timer = setInterval(() => {
        if (isClear) {
          clearInterval(timer);
        }

        socket.to(data.debateId).emit(curAction, { time });

        time--;

        if (time < 0) {
          clearInterval(timer);
          socket.to(data.debateId).emit(nextAction);
        }
      }, 1000);
    }

    ...

    socket.on("debate_opening_pro", (data) => {
      startTimer(data, 60, "debate_opening_pro", "debate_opening_con_pre");
    });

    socket.on("debate_opening_con", (data) => {
      startTimer(data, 60, "debate_opening_con", "debate_contention1_pro_pre");
    });

    ...
    ```

  - Client

    ```jsx
    ...

    socket.on("debate_opening_pro", (data) => {
      setNotice({ ...notice, ...{ turn: "pro", text: "The opening remarks of the pro", time: data.time } });
    });

    socket.on("debate_opening_con_pre", () => {
      setIsProTurn(false);

      setNotice({ ...notice, ...{ turn: "pre", text: "Next turn, the opening remarks of the con. ( 60 sec )" } });

      setTimeout(() => {
        socket.emit("debate_opening_con", { debateId });
      }, 3000);
    });

    socket.on("debate_opening_con", (data) => {
      setNotice({ ...notice, ...{ turn: "con", text: "The opening remarks of the con", time: data.time } });
    });

    ...
    ```

### e. Clear Interval

- Problem
  - setInterval로 캔버스에 그림을 그린 후 clearInterval로 더 이상 그려지지 않게 할 때 clearInterval이 제대로 작동하지 않음
- Solving

  - 재랜더링이 일어나지 않는 useRef를 활용해서 해결 (\*Ref: [The Iceberg of React Hooks](https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb))
  - Interval Hook

    ```js
    import { useRef, useCallback } from "react";

    export default function useSetInterval(callback, ms) {
      const intervalRef = useRef(null);

      const start = useCallback(() => {
        if (intervalRef.current !== null) {
          return;
        }
        intervalRef.current = setInterval(() => {
          callback();
        }, ms);
      }, []);

      const stop = useCallback(() => {
        if (intervalRef.current === null) {
          return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }, []);

      return [start, stop];
    }
    ```

> 리액트의 라이프 사이클과 재랜더링에 관해서 좀 더 많은 공부가 필요하다.
