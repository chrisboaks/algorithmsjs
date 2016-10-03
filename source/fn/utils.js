function curry(fn) {
  if (typeof fn !== 'function') {
    throw new Error('must pass a function');
  }

  let passedArgs = [];
  return function rv(...args) {
    passedArgs = passedArgs.concat(args);
    if (passedArgs.length >= fn.length) {
      const funcResult = fn.apply(null, passedArgs);
      passedArgs = [];
      return funcResult;
    } else {
      return rv;
    }
  };
}

function flip(fn) {
  if (typeof fn !== 'function') {
    throw new Error('must pass a function');
  }
  return function rv(...args) {
    return fn.apply(null, args.reverse());
  };
}

function once(fn) {
  if (typeof fn !== 'function') {
    throw new Error('must pass a function');
  }

  let hasRun = false;
  return function rv(...args) {
    if (hasRun) return;
    hasRun = true;
    return fn.apply(null, args);
  };
}

function throttle(fn, waitTime) {
  if (typeof fn !== 'function' || typeof waitTime !== 'number') {
    throw new Error('must pass a function and a wait time');
  }

  let inCooldown = false;
  return function rv(...args) {
    if (!inCooldown) {
      inCooldown = true;
      setTimeout(() => inCooldown = false, waitTime);
      return fn.apply(null, args);
    } else {
      return null;
    }
  };
}

export {curry, flip, once, throttle};
