console.log('Start'); // 1. 동기 코드

setTimeout(() => console.log('Timeout'), 0); // 4. 매크로 태스크

Promise.resolve()
  .then(() => console.log('Promise 1')) // 3. 마이크로 태스크
  .then(() => console.log('Promise 2')); // 3. 마이크로 태스크

console.log('End'); // 2. 동기 코드
