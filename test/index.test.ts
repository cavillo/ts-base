import { expect } from 'chai';
import 'mocha';

// TODO
describe('Tests', async () => {
  it('Tests are running', async () => {

    expect(() => { }).to.not.throw();
    expect({ a: 1 }).to.not.have.property('b');
    expect([1, 2]).to.be.an('array').that.does.not.include(3);

    expect(2).to.equal(2);

    expect('foo').to.be.a('string');
    expect({ a: 1 }).to.be.an('object');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
    expect(new Error).to.be.an('error');
    expect(Promise.resolve()).to.be.a('promise');
    expect(new Float32Array).to.be.a('float32array');
    expect(Symbol()).to.be.a('symbol');

    const myObj = {
      [Symbol.toStringTag]: 'myCustomType',
    };

    expect(myObj).to.be.a('myCustomType').but.not.an('object');

    expect([1, 2, 3]).to.be.an('array').that.includes(2);
    expect([]).to.be.an('array').that.is.empty;

    expect({ b: 2 }).to.have.property('b');

    expect('foobar').to.include('foo');
    expect([1, 2, 3]).to.include(2);
    expect({ a: 1, b: 2, c: 3 }).to.include({ a: 1, b: 2 });

    expect(false).to.be.false;

    expect(null).to.be.null;
    expect(undefined).to.be.undefined;
  });
});

