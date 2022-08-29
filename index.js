export default class CustomPromise {
  constructor(executor) {
    this.PromiseResult = null;
    executor(this.resolve.bind(this));
  }

  resolve(value) {
    this.PromiseResult = value;
  }

  then(callback) {
    return new CustomPromise((resolve) => {
      resolve(callback(this.PromiseResult));
    });
  }
}
