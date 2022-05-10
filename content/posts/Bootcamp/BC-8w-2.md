---
title: "BC-8w-2 / [JS/Node] 중급"
date: 2021-10-13
categories:
  - <Bootcamp>
tags:
  - JavaScript
---

## Today I learned

<!-- ## Algorithm Test 05 타일링(효율적인 피보나치) ☆

```js
let func = function (n) {
  const listOfResult = [1, 1];

  // memoization
  // 함수로 따로 만드는 이유는 위에 리스트를 계속 기억하기 위해
  const pushFib = (n) => {
    if (listOfResult[n] !== undefined) {
      return listOfResult[n];
    } else {
      listOfResult.push(pushFib(n - 1) + pushFib(n - 2));
      return listOfResult[n];
    }
  };

  return pushFib(n);
};
/*
# n=1, 2x1
2|a
1|a

# n=2, 2x2
2|ab
1|ab
-
2|aa
1|bb

# n=3, 2x3
2|abc
1|abc
-
2|aac
1|bbc
-!
2|abb
1|acc

# n=4, 2x4
2|abcd
1|abcd
-
2|aacd
1|bbcd
-
2|abbd
1|accd
-!
2|abcc
1|abdd
-
2|aacc
1|bbdd

# n=5, 2x5
2|abcde
1|abcde
-
2|abcce
1|abdde
-
2|abbde
1|accde
-
2|aacde
1|bbcde
-
2|aacce
1|bbdde
-!
2|aacdd
1|bbcee
|
2|abbdd
1|accee
|
2|abcdd
1|abcee
*/
``` -->

### Sprint - Underbar

#### Bare minimum

```js
_.slice = function (arr, start, end) {
  let _start = start || 0, _end = end;

  if (start < 0) _start = Math.max(0, arr.length + start);
  if (end < 0) _end = Math.max(0, arr.length + end);

  if (_end === undefined || _end > arr.length) _end = arr.length;

  let result = [];
  for (let i = _start; i < _end; i++) {
    result.push(arr[i]);
  }

   return result;
```

```js
_.each = function (collection, iteratee) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee(collection[i], i, collection);
    }
  } else if (typeof collection === "object") {
    for (let key in collection) {
      iteratee(collection[key], key, collection);
    }
  }
};
```

```js
_.map = function (arr, iteratee) {
  let result = [];

  _.each(arr, function (item) {
    result.push(iteratee(item));
  });

  return result;
};
```

```js
_.reduce = function (arr, iteratee, initVal) {
  let acc = initVal;

  _.each(arr, function (item, idx, src) {
    if (initVal === undefined && idx === 0) {
      acc = item;
    } else {
      acc = iteratee(acc, item, idx, src);
    }
  });

  return acc;
};
```

```js
_.filter = function (arr, test) {
  let result = [];

  _.each(arr, function (item) {
    if (test(item)) {
      result.push(item);
    }
  });

  return result;
};
```

```js
_.indexOf = function (arr, target) {
  let result = -1;

  _.each(arr, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};
```

```js
_.uniq = function (arr) {
  let result = [];

  _.each(arr, function (item) {
    if (_.indexOf(result, item) === -1) {
      result.push(item);
    }
  });

  return result;
};
```

#### Advanced

```js
_.once = function (func) {
  let result;
  let alreadyCalled = false;

  // ...arg -> arg === [...]
  return function (...args) {
    if (!alreadyCalled) {
      alreadyCalled = true;
      result = func(...args);
    }

    return result;
  };
};
```

```js
_.includes = function (arr, target) {
  let result = false;

  _.each(arr, function (item) {
    if (item === target) {
      result = true;
    }
  });

  return result;
};
```

```js
_.every = function (arr, iteratee) {
  if (iteratee === undefined) {
    iteratee = _.identity;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!iteratee(arr[i])) {
      return false;
    }
  }

  return true;
};
```

```js
_.defaults = function (base, ...rest) {
  _.each(rest, function (item) {
    _.each(item, function (val, key) {
      if (base[key] === undefined) {
        base[key] = val;
      }
    });
  });
  return base;
};
```

```js
_.intersection = function (base, ...rest) {
  let result = [];

  _.each(base, function (bItem) {
    const intersected = _.every(rest, function (arr) {
      return _.includes(arr, bItem);
    });

    if (intersected) {
      result.push(bItem);
    }
  });

  return result;
};
```

#### Nightmare

```js
_.memoize = function (func) {
  const cache = {};

  return function (...args) {
    const problemName = JSON.stringify(args);
    if (!cache.hasOwnProperty(problemName)) {
      cache[problemName] = func(...args);
    }
    return cache[problemName];
  };
};
```

## Today's takeaway

- 내장 메소드들이 어떤 원리로 작동하는지 직접 함수로 만들어 보았다.
- 단순히 외워서 사용할 때보다 훨씬 높은 이해도를 가질 수 있었다.
- 특히 전개 구문(...)에 대한 이해도가 많이 늘었다.
