
export abstract class BaseTask {
  abstract prePerform(): Promise<boolean>;
  abstract perform(): void;
  abstract postPerform(): void;
  abstract handleError(): void;
  // prePerform(): boolean {
  //   console.log(`prePerform called @${new Date}`);
  //   return true;
  // };
  // perform(): void {
  //   console.log(`perform called @${new Date}`);
  // };
  // postPerform(): void {
  //   console.log(`postPerform called @${new Date}`);
  // };
  // handleError(): void {
  //   console.log(`handleError called @${new Date}`);
  // };

  run() {
    try {
      // console.log("running every minute to 1 from 5");
      if (this.prePerform() /*pass or access db inside*/) {
        this.perform(); // pass or access db inside
      } else {
        throw new Error("prePerform got unexpected error");
      }
    } catch (error) {
      this.handleError(); // pass or access db inside
    } finally {
      this.postPerform(); // pass or access db inside
      console.log(`====================================`);
    }
  }
}
