// this class aim to implement the chain of responsibility pattern
// in order to execute on function in a chain and forward it to
// the next executor in case the function threw error
class Executor {
  constructor(func) {
    this.func = func;
  }

  run() {
    try {
      return this.func();
    } catch (error) {
      if (this.hasOwnProperty("child")) {
        return this.child.run();
      } else {
        return null;
      }
    }
  }
}

module.exports = { Executor };
