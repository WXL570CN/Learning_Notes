const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('hi')
    resolve();
  }, 1000);
  // clearTimeout(time);
});

// eslint-disable-next-line
console.log(promise);
