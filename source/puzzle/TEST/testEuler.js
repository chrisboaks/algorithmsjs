// NOTE: these tests are disabled, as some of these functions
// take a long time to run.

import {E} from '../exports';

const assert = require('chai').assert;

describe.skip('Project Euler', () => {

  it('solves euler001', () => {
    assert.equal(E.euler001(), 233168);
  });

  it('solves euler002', () => {
    assert.equal(E.euler002(), 4613732);
  });

  it('solves euler003', () => {
    assert.equal(E.euler003(), 6857);
  });

  it('solves euler004', () => {
    assert.equal(E.euler004(), 906609);
  });

  it('solves euler005', () => {
    assert.equal(E.euler005(), 232792560);
  });

  it('solves euler006', () => {
    assert.equal(E.euler006(), 25164150);
  });

  it('solves euler007', () => {
    assert.equal(E.euler007(), 104743);
  });

  it('solves euler008', () => {
    assert.equal(E.euler008(), 23514624000);
  });

  it('solves euler009', () => {
    assert.equal(E.euler009(), 31875000);
  });

  it('solves euler010', () => {
    assert.equal(E.euler010(), 142913828922);
  });

  it('solves euler011', () => {
    assert.equal(E.euler011(), 70600674);
  });

  it('solves euler012', () => {
    assert.equal(E.euler012(), 76576500);
  });

  it('solves euler013', () => {
    assert.equal(E.euler013(), '5537376230');
  });

  it('solves euler014', () => {
    assert.equal(E.euler014(), 837799);
  });

  it('solves euler015', () => {
    assert.equal(E.euler015(), 137846528820);
  });

  it('solves euler016', () => {
    assert.equal(E.euler016(), 1366);
  });

  it('solves euler017', () => {
    assert.equal(E.euler017(), 21124);
  });

  it('solves euler018', () => {
    assert.equal(E.euler018(), 1074);
  });

  it('solves euler019', () => {
    assert.equal(E.euler019(), 171);
  });

  it('solves euler020', () => {
    assert.equal(E.euler020(), 648);
  });

  it('solves euler021', () => {
    assert.equal(E.euler021(), 31626);
  });

  it('solves euler022', () => {
    assert.equal(E.euler022(), 871198282);
  });

  it('solves euler023', () => {
    assert.equal(E.euler023(), 4179871);
  });

  it('solves euler024', () => {
    assert.equal(E.euler024(), 2783915460);
  });

  it('solves euler025', () => {
    assert.equal(E.euler025(), 4782);
  });

  it('solves euler026', () => {
    assert.equal(E.euler026(), 983);
  });

  it('solves euler027', () => {
    assert.equal(E.euler027(), -59231);
  });

  it('solves euler028', () => {
    assert.equal(E.euler028(), 669171001);
  });

  it('solves euler029', () => {
    assert.equal(E.euler029(), 9183);
  });

  it('solves euler030', () => {
    assert.equal(E.euler030(), 443839);
  });

  it('solves euler031', () => {
    assert.equal(E.euler031(), 73682);
  });

  it('solves euler032', () => {
    assert.equal(E.euler032(), 45228);
  });

  it('solves euler033', () => {
    assert.equal(E.euler033(), 100);
  });

});

// empty workspace for a simpler workflow
describe('Project Euler workspace', () => {

});
