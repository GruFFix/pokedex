import BPromise from 'bluebird';

BPromise.config({
  warnings: true,
  longStackTraces: true,
  cancellation: true
});
