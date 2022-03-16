---
title: "BC-First / First Project 기능 회고"
date: 2022-02-03
categories:
  - "'Bootcamp'"
tags:
  - Memoirs
---

### 1. Custom Hooks & Utils

#### useDetectOutsideClick

> 범위 밖을 클릭하면 닫히는 모달

```js
import { useState, useEffect } from "react";

export default function useDetectOutsideClick(target, initialState) {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (target.current !== null && !target.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, target]);

  return [isActive, setIsActive];
}
```

```js
const [isActive, setIsActive] = useDetectOutsideClick(refNavbar, false);
const click = useCallback(() => {
  setIsActive(!isActive);
}, [isActive, setIsActive]);
```

#### useQuery

> 쿼리 값 불러오기

```js
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
```

```js
const query = useQuery();

const queryPage = query.get("page");
const querySearch = query.get("search") || "";
```

#### getByteLength

> 바이트 계산

```js
export default function getByteLength(s, b, i, c) {
  for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
}

/*
c에 s의 현재 위치(i)의 유니코드값을 charCodeAt() 함수를 사용해서 가져옴.
2048(2^11)로 나누었을 때 몫이 있으면 3바이트, 
그보다 작은데 123(2^7)로 나누었을 때 몫이 있으면 2바이트, 
나머지 경우에는 1바이트를 b에 할당.
*/
```

```js
getByteLength(name);
```

#### useBoardCheck

- 유효한 게시판인지 확인

```js
import { useSelector } from "react-redux";

export default function useBoardCheck(boardId) {
  const publicBoards = useSelector((state) => state.publicBoards);
  const privateBoards = useSelector((state) => state.privateBoards);
  // 처음에 undefined라서 초깃값을 따로 할당해서 length나 filter()를 사용 가능하게 만듦
  const publicBoardsData = publicBoards.data.data || [];
  const privateBoardsData = privateBoards.data.data || [];
  const publicBoard = publicBoardsData.filter((board) => String(board.id) === boardId);
  const privateBoard = privateBoardsData.filter((board) => String(board.id) === boardId);
  const board = publicBoard.length !== 0 ? publicBoard[0] : privateBoard[0];
  const isLoading = publicBoards.loading && privateBoards.loading;

  return { board, isLoading };
}
```

```js
import { useParams } from "react-router-dom";

const boardId = useParams();

const { board, isLoading } = useBoardCheck(boardId);
```

### 2. Redux-toolkit

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrivateBoards = createAsyncThunk("privateBoards/getPrivateBoards", async (couple_id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/${couple_id}`);
  return response.data;
});

const privateBoardsSlice = createSlice({
  name: "privateBoardsSlice",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrivateBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrivateBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPrivateBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default privateBoardsSlice.reducer;
```

```js
import { createSlice } from "@reduxjs/toolkit";

const privateBoardEditModalSlice = createSlice({
  name: "privateBoardEditModal",
  initialState: { isOpen: false },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default privateBoardEditModalSlice.reducer;
export const { openModal, closeModal } = privateBoardEditModalSlice.actions;
```

### 3. Dynamic Routing

```js
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mypage" element={<MyPage />} />
        <Route exact path="/post/:boardId/*" element={<PostBoard />} />
        <Route exact path="/chat/:boardId" element={<ChatBoard />} />
        <Route exact path="/todolist/:boardId" element={<TodolistBoard />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer className="absolute z-40" />
    </BrowserRouter>
  );
}

// '/post/:boardId/*' 부분 때문에 일일이 boardId를 checking 하는 과정이 필요했음
```

### 4. Header

#### D-day 계산

```jsx
let d_day = null;
if (started_at) {
  const today = new Date();
  const gap = started_at.getTime() - today.getTime();
  d_day = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
}
```

#### Navbar 토글 기능

```jsx
<GiHamburgerMenu className={`text-3xl absolute left-4 cursor-pointer hover:text-hibye-60 ${isActive ? "text-hibye-60" : "text-hibye-80"}`} onClick={click} />
  <div ref={navRef} className="absolute top-16">
    {isActive ? <Navbar click={click} publicBoards={publicBoards} privateBoards={privateBoards} couple_id={couple_id} is_matching={is_matching} /> : null}
  </div>
```

#### 로그인 시 Logout과 MyPage 표시

```jsx
{
  id ? (
    <>
      {d_day ? (
        <div className="pt-1">
          <span className="text-hibye-60 text-base font-bold mr-1">♡</span>
          <span className="text-hibye-60 text-base">{d_day}</span>
          <span className="text-hibye-60 text-sm font-bold ml-1">Days</span>
        </div>
      ) : null}
      <button className="button--pink ml-6" onClick={signOut}>
        Sign Out
      </button>
      <Link to="./mypage" className="button--pink ml-4">
        My Page
      </Link>
    </>
  ) : (
    <Link to="./signin" className="button--pink">
      Sign In
    </Link>
  );
}
```

### 5. Navbar

#### 게시판 타입 별로 아이콘 선택

```jsx
const choseIcon = (category) => {
  if (category === "post") return <BsPencilSquare className="inline mr-2 mb-1" />;
  if (category === "chat") {
    return (
      <BsChatDots
        style={{
          transform: "scaleX(-1)",
        }}
        className="inline mr-2 mb-1"
      />
    );
  }
  if (category === "todolist") return <BsListUl className="inline mr-2 mb-1" />;
};
```

#### 게시판 목록 불러오기

```jsx
{
  boards.loading || boards.error ? (
    <div className="flex justify-center">
      <Spinner />
    </div>
  ) : boards.data.data.length === 0 ? (
    <div className="border-hibye-60">There is no board.</div>
  ) : (
    boards.data.data.map((board) => (
      <Link to={`/${board.category}/${board.id}?page=1&search=`} key={board.id} className="mb-4 truncate block hover:text-hibye-80 duration-300" onClick={click}>
        {choseIcon(board.category)} {board.name}
      </Link>
    ))
  );
}
```

### 6. PrivateBoardCreateModal

#### input 기본 상태관리

```jsx
const [name, setName] = useState("");
const onChangeName = (e) => {
  setName(e.target.value);
};

// --- //

<input type="text" value={name} placeholder="Enter board name" onChange={onChangeName} className={inputStyle} ref={refName} />;
```

#### 게시판 생성 시 유효성 검사

```jsx
const nameByte = getByteLength(name);
if (nameByte < 1 || nameByte > 36 || /\s{2,}|^\s|\s$|[^\w가-힣\x20\s]/g.test(name)) {
  setValid((state) => ({ ...state, isValid: false, reason: "name" }));
  refName.current.focus();
  return;
}
```

### 7. ChatBoard

#### Top 버튼

```jsx
const onClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const [ScrollY, setScrollY] = useState(0);
const [isOverScrollY, setIsOverScrollY] = useState(false);

const handleShowButton = () => {
  setScrollY(window.pageYOffset);
  if (ScrollY > 100) {
    setIsOverScrollY(true);
  } else {
    setIsOverScrollY(false);
  }
};

useEffect(() => {
  const watch = () => {
    window.addEventListener("scroll", handleShowButton);
  };
  watch();
  return () => {
    window.removeEventListener("scroll", handleShowButton);
  };
});

// --- //

{
  isOverScrollY ? <TopBtn /> : null;
}
```

#### 로딩 혹은 에러

```jsx
// 2초 이내에 데이터를 못 받아오면 Error로 간주 그 이전에는 Loading으로 간주
const [checkTwoSec, setCheckTwoSec] = useState(false);
useEffect(() => {
  setTimeout(() => {
    setCheckTwoSec(true);
  }, 2000);
});

// --- //

{isLoading ? (
  <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
    <Spinner />
      </div>
  ) : !board ? (
    checkTwoSec ? (
      <Error />
    ) : (
      <div className="w-screen h-screen flex justify-center items-center bg-hibye-10">
        <Spinner />
      </div>
    )
  ) : (...)
}
```

#### 무한 스크롤

```jsx
import { useInView } from "react-intersection-observer";

const [refView, inView] = useInView({
  threshold: 0.5,
});
const [chats, setChats] = useState([]);
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(1);
const [loading, setLoading] = useState(false);

const getChats = useCallback(async () => {
  setLoading(true);
  await axios.get(`${process.env.REACT_APP_API_URL}/posts/${boardId}?page=${page}`).then((res) => {
    setChats((state) => [...state, ...res.data.data]);
    setLastPage(res.data.lastPage);
  });
  setLoading(false);
}, [page, boardId]);

useEffect(() => {
  if (page <= lastPage) getChats();
}, [getChats, page, lastPage]);

useEffect(() => {
  if (inView && !loading) {
    setPage((state) => state + 1);
  }
}, [inView, loading]);

// --- //

<div className="p-5">
  <Chats chats={chats} user_id={user_id} />
  <div ref={refView} className="text-center mt-4">
    {loading ? <Spinner /> : null}
  </div>
</div>;
```

#### 내용과 input창 전환

```jsx
{
  edit.isEdit && edit.post_id === post.id ? (
    <>
      <input className="w-full rounded-2xl border bg-gray-10 pl-3 pr-3 text-gray-80" type="text" onChange={onChangeEditContents} placeholder="Enter Chat here" value={editContents} ref={refInput} />
      {valid.isValid ? null : <div className="text-hibye-80 text-sm text-center mb-2 mt-2">Invalid chat. Please check again.</div>}
    </>
  ) : (
    <div className="text-xm text-gray-80">{post.contents}</div>
  );
}
```

### 8. PostBoard

#### Nested routing

```jsx
<Routes>
  <Route exact path="/" element={<PostBoardMain board={board} boardId={boardId} />} />
  <Route exact path="/:postId" element={<Post />} />
</Routes>
```

#### 게시물 목록 불러오기(페이지네이션)

```jsx
import { useNavigate } from "react-router-dom";
import { useQuery } from "../utils/useQuery";

const navigate = useNavigate();
const query = useQuery();
const queryPage = query.get("page");
const querySearch = query.get("search") || "";

const [posts, setPosts] = useState([]);
const [page, setPage] = useState(1);
const [lastPage, setLastPage] = useState(Number.MAX_SAFE_INTEGER);
const getPosts = useCallback(async () => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/posts/${boardId}?page=${queryPage}&search=${querySearch}`)
    .then((res) => {
      setPosts(() => [...res.data.data]);
      setLastPage(res.data.lastPage);
    })
    .catch((err) => {
      alert(err)
}, [queryPage, boardId, querySearch]);

useEffect(() => {
  if (queryPage <= lastPage) {
    getPosts();
  }
}, [getPosts, queryPage, lastPage]);

// 입력 후 enter를 했을 때, 숫자일 경우 해당 페이지로 이동
const onKeyPress = (e) => {
    if (e.key === "Enter") {
      const number = parseInt(e.target.value);
      if (!e.target.value) return;
      if (typeof number === "number") {
        setPage(number);
        navigate(`/post/${boardId}?page=${number}&search=${querySearch}`);
      }
    }
  };
```

#### 검색

```jsx
const refSearch = useRef(null);
const [search, setSearch] = useState("");
const [inputSearch, setInputSearch] = useState("");
const onChangeSearch = (e) => {
  setInputSearch(e.target.value);
};

const onKeyPressSearch = (e) => {
  if (e.key === "Enter") {
    if (e.target.value.length !== 0 && e.target.value.length < 2) {
      swal.fire({
        title: "Search failed",
        text: "Please type more than 2 letters",
        icon: "error",
        confirmButtonColor: "#D70569",
      });
      return;
    } else {
      setSearch(e.target.value);
      setInputSearch("");
      setPage(1);
      setInputNum(1);
      navigate(`/post/${boardId}?page=${1}&search=${e.target.value}`);
      refSearch.current.blur();
    }
  }
};

const searchCancel = () => {
  setSearch("");
  setInputSearch("");
  navigate(`/post/${boardId}?page=${1}&search=${""}`);
};

// --- //

// 검색 버튼과 input 창을 겹쳐둬서 버튼에 호버하면 input 창이 배경색과 넓이를 가짐
<div className="relative">
  <input
    type="text"
    ref={refSearch}
    onChange={onChangeSearch}
    onKeyPress={onKeyPressSearch}
    value={inputSearch}
    className="absolute w-6 pl-2 text-transparent pr-2 bg-transparent duration-300 focus:bg-hibye-20 focus:w-40 focus:border-hibye-80 focus:text-hibye-100"
  />
  <div className="flex">
    <SearchBtn className="absolute" />
    {search ? (
      <div className="flex items-center gap-1">
        <div className="ml-2 text-hibye-80">{querySearch}</div>
        <div onClick={searchCancel}>
          <CancelBtnSmall className="self-center" />
        </div>
      </div>
    ) : null}
  </div>
</div>;
```

### 9. MyPage

```jsx
// 유저의 현재 상태별로 다양한 화면을 렌더링 해줘야 했음
<>
  {!userInfo.id ? (
    <Navigate to="/signin" />
  ) : (
    <div className="bg-hibye-10">
      <div className="inner flex justify-center items-center">
        <div className="mt-24 mb-24 p-10">
          <div className="flex items-center mb-12">
            {!isEditName ? (
              <div className="text-hibye-80 text-lg mr-3 font-bold">{userInfo.username}</div>
            ) : (
              <input
                className="self-center text-hibye-100 text-base rounded-2xl border bg-gray-10 pl-3 pr-3 w-56 mr-3"
                placeholder="Enter username"
                ref={refUsername}
                value={inputUsername}
                onChange={changeUsernameInput}
              />
            )}
            {!isEditName ? (
              <div onClick={onEditName}>
                <EditBtn className="self-center text-2xl text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300" />
              </div>
            ) : (
              <div className="flex gap-1">
                <div onClick={changeUsername}>
                  <CheckBtn />
                </div>
                <div onClick={offEditName}>
                  <CancelBtn2 />
                </div>
              </div>
            )}
          </div>
          <div className="flex bb-12 mb-8">
            <div className="text-hibye-60 text-sm font-bold w-28 mr-8">Email address</div>
            <div className="text-gray-80 text-sm">{userInfo.email}</div>
          </div>

          <div className="flex mb-2">
            <div className="text-hibye-60 text-sm font-bold w-28 mr-8">Lover</div>
            {!userInfo.couple_id ? (
              <>
                <input
                  className="text-hibye-100 text-sm rounded-2xl border bg-gray-10 pl-3 pr-3 mb-3 w-56"
                  placeholder="Enter username"
                  onChange={changeLoverInput}
                  value={inputLover}
                  ref={refLover}
                />
                <div onClick={addLover}>
                  <FiArrowRightCircle className="text-2xl text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300 ml-2" ref={refLover} />
                </div>
              </>
            ) : !userInfo.is_matching ? (
              <div className="text-hibye-80 text-sm">Please wait for reply.</div>
            ) : (
              <input type="date" className="text-hibye-100 text-sm rounded-2xl border bg-gray-10 pl-3 pr-3" placeholder="YYYY-MM-DD" />
            )}
          </div>

          {isUsernameValid ? <div className="mb-10" /> : <div className="text-hibye-80 text-xs text-center mb-10">Invalid username, Please check again.</div>}
          <div className="text-gray-80 text-sm underline cursor-pointer w-max" onClick={changePassword}>
            Change password
          </div>
          <div className="text-gray-80 text-sm underline cursor-pointer w-max" onClick={deleteId}>
            Delete account
          </div>
        </div>
      </div>
    </div>
  )}
</>
```

### \*Error Handling

```bash
TypeError: Cannot read properties of undefined (reading 'name')

react-dom.development.js:13231 Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead. at
```

- state의 data에 배열 형태가 아닌 객체 형태의 데이터를 받아올 때,  
  useSelector의 state.리듀서.data.data로 바로 불러왔을 경우 이상이 없지만  
  '리듀서.isLoading'과 '리듀서.error'를 사용하기 위해 리듀서 자체를 불러왔을 경우  
  그다음 '리듀서.data.data.키'로 호출을 하였을 때 에러 발생
- 초깃값에 미리 키들도 입력해 두어야 함

### \*느낀점

- 중복 로직 혹은 스타일이 많았는데 이를 효율적으로 처리하지 못하고 반복 작성하였음
- 유저의 상태(로그인 여부, 커플 여부, 매칭 중 여부 등) 별로 다양한 화면을 렌더링 해줘야 했는데 이 상태를 어떻게 처리할지 깊이 고려하지 않았었음
- 쿼리의 사용이 미숙했음
- 한 컴포넌트에서 기능적인 부분과 디자인적인 부분을 같이 처리하다 보니 가독성이 떨어졌음(Container Component와 View Component 구분 고려)
- 주석을 좀 더 적극적으로 활용해서 보기 쉽게 만들 필요성을 느낌(어떤 부분이 어떤 기능을 하는지 구분이 잘 안 돼있음)
- 최적화를 고려하지 못했음(Profile 진행 후 memo, useCallback 등으로 처리해 주어야 함)
- 새로고침 후에도 지니고 있어야하는 상태와 아닌 상태를 구분하지 않았었음
- 안정성을 기본이로 효율성과 가독성도 고려하면서 코딩을 하자!
