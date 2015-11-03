var expect = require('expect.js');
var sinon = require('sinon');
var timeout = require('../lib/timeout');

describe('Timeout', function(){

    var spy;
    var MAX_INT = 2147483647;
    var dummy = sinon.spy();
    var clock = sinon.useFakeTimers();

    beforeEach(function(){
        spy = sinon.spy();
    });

    describe('#set', function(){
        it('should return incrementing id', function(){
            expect(timeout.set(dummy, MAX_INT)).to.be(1);
            expect(timeout.set(dummy, MAX_INT)).to.be(2);
            expect(timeout.set(dummy, MAX_INT)).to.be(3);
        });

        it('should not execute on set with positive timeout', function(){
            timeout.set(spy, 100);
            clock.tick(1);
            expect(spy.callCount).to.be(0);
        });

        it('should execute on set with negative timeout', function(){
            timeout.set(spy, -100);
            clock.tick(1);
            expect(spy.callCount).to.be(1);
        });

        it('should not execute on set with big timeout', function(){
            timeout.set(spy, MAX_INT * 10);
            clock.tick(1);
            expect(spy.callCount).to.be(0);
        });

        it('should execute after delay with big timeout', function(){
            timeout.set(spy, MAX_INT * 10);
            clock.tick(1);
            expect(spy.callCount).to.be(0);
            clock.tick(MAX_INT);
            expect(spy.callCount).to.be(0);
            clock.tick(MAX_INT * 10);
            expect(spy.callCount).to.be(1);
        });
    });

    describe('#clear', function(){
        it('should accept any value', function(){
            timeout.clear();
            timeout.clear(null);
            timeout.clear(undefined);
            timeout.clear([]);
            timeout.clear({});
            timeout.clear(1);
            timeout.clear('id');
        });

        it('should clear a scheduled timeout', function(){
            var id = timeout.set(spy, 100);
            timeout.clear(id);
            clock.tick(100);
            expect(spy.callCount).to.be(0);
        });

        it('should clear a scheduled timeout with big timeout', function(){
            var id = timeout.set(spy, MAX_INT * 10);
            timeout.clear(id);
            clock.tick(MAX_INT * 10);
            expect(spy.callCount).to.be(0);
        });
    });

    describe('internals', function(){
        it('should keep track of scheduled timeouts', function(){
            var id = timeout.set(spy, 100);
            expect(timeout._timeouts[id]).not.to.be(undefined);
        });

        it('should remove reference to executed timeouts', function(){
            var id = timeout.set(spy, 100);
            clock.tick(100);
            expect(timeout._timeouts[id]).to.be(undefined);
        });

        it('should remove reference to cancelled timeouts', function(){
            var id = timeout.set(spy, 100);
            timeout.clear(id);
            expect(timeout._timeouts[id]).to.be(undefined);
        });
    });
});