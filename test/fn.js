require("./common/bootstrap");

exports["Fn"] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {
    done();
  },

  map: function(test) {
    test.expect(3);
    test.equal(Fn.map(1009, 300, 1009, 0, 255), 255);
    test.equal(Fn.map(300, 300, 1009, 0, 255), 0);
    test.equal(Fn.map(500, 0, 1000, 0, 255), 127);
    test.done();
  },

  fmap: function(test) {
    test.expect(2);
    test.equal(Fn.fmap(500, 0, 1000, 0, 255), 127.5);
    test.equal(Fn.fmap(512, 0, 1023, 0, 255), 127.6246337890625);
    test.done();
  },

  constrain: function(test) {
    test.expect(6);

    test.equal(Fn.constrain(100, 0, 255), 100);
    test.equal(Fn.constrain(-1, 0, 255), 0);
    test.equal(Fn.constrain(0, 0, 255), 0);
    test.equal(Fn.constrain(256, 0, 255), 255);
    test.equal(Fn.constrain(255, 0, 255), 255);
    test.ok(isNaN(Fn.constrain("finger", 0, 255)));

    test.done();
  },

  inRange: function(test) {
    test.expect(10);

    var a = Fn.inRange(5, 4, 6);
    var b = Fn.inRange(5, 4.5, 5.5);
    var c = Fn.inRange(5, -1, 5);
    var d = Fn.inRange(0, -9, -1);
    var e = Fn.inRange(0, -9, -3);
    var f = Fn.inRange(0, -10, -2);
    var g = Fn.inRange(0, 5, 1);
    var h = Fn.inRange("finger", 0, 5);
    var i = Fn.inRange(1, "finger", 5);
    var j = Fn.inRange(1, 0, "finger");

    test.equal(a, true);
    test.equal(b, true);
    test.equal(c, true);
    test.equal(d, false);
    test.equal(e, false);
    test.equal(f, false);
    test.equal(g, false);
    test.equal(h, false);
    test.equal(i, false);
    test.equal(j, false);


    test.done();
  },

  range: function(test) {
    test.expect(7);

    var a = Fn.range(5);
    var b = Fn.range(5, 10);
    var c = Fn.range(3, 27, 3);
    var d = Fn.range(0, -9, -1);
    var e = Fn.range(0, -9, -3);
    var f = Fn.range(0, -10, -2);
    var g = Fn.range();

    test.deepEqual(a, [0, 1, 2, 3, 4]);
    test.deepEqual(b, [5, 6, 7, 8, 9, 10]);
    test.deepEqual(c, [3, 6, 9, 12, 15, 18, 21, 24, 27]);

    // Negative Range
    test.deepEqual(d, [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]);
    test.deepEqual(e, [0, -3, -6, -9]);
    test.deepEqual(f, [0, -2, -4, -6, -8, -10]);

    // Weird Range
    test.deepEqual(g, [0]);


    test.done();
  },

  prefixed: function(test) {
    test.expect(6);

    test.deepEqual(Fn.range.prefixed("A", 3), ["A0", "A1", "A2"]);
    test.deepEqual(Fn.range.prefixed("A", 0, 3), ["A0", "A1", "A2", "A3"]);
    test.deepEqual(Fn.range.prefixed("A", 0, 10, 2), ["A0", "A2", "A4", "A6", "A8", "A10"]);
    test.deepEqual(Fn.range.prefixed("A", 0, 9, 3), ["A0", "A3", "A6", "A9"]);
    test.deepEqual(Fn.range.prefixed(1, 3), [1, 2, 3]);
    test.deepEqual(Fn.range.prefixed({foo: "bar"}, 2), ["[object Object]0", "[object Object]1"]);

    test.done();
  },

  uid: function(test) {
    test.expect(2);

    var unique = 0;
    var uids = [];
    var uid;

    for (var i = 0; i < 1000; i++) {
      uid = Fn.uid();

      if (uids.indexOf(uid) === -1) {
        unique++;
      }

      uids.push(uid);
    }

    test.equal(unique, 1000);
    test.equal(uids[0].length, 36);
    test.done();
  },

  square: function(test) {
    test.expect(3);

    test.equal(Fn.square(2), 4);
    test.equal(Fn.square(-2), 4);
    test.ok(isNaN(Fn.square("finger")));

    test.done();
  },

  sum: function(test) {
    test.expect(6);

    var a = 0,
      b = 1,
      c = [],
      d = [0, 1],
      e = ["finger", 3, 4],
      f = [{foo: "bar"}, 2, 3];

    test.equal(Fn.sum(a), 0);
    test.equal(Fn.sum(b), 1);
    test.equal(Fn.sum(c), 0);
    test.equal(Fn.sum(d), 1);
    test.equal(Fn.sum(e), "0finger34");
    test.equal(Fn.sum(f), "0[object Object]23");

    test.done();
  },

  bitValue: function(test) {
    test.expect(5);

    var a = Fn.bitValue(0);
    var b = Fn.bitValue(2);
    var c = Fn.bitValue(7);
    var d = Fn.bitValue(8);
    var e = Fn.bitValue("finger");

    test.equal(a, 1);
    test.equal(b, 4);
    test.equal(c, 128);
    test.equal(d, 256);
    test.equal(e, 1);

    test.done();
  },

  int16fromtwobytes: function(test) {
    test.expect(6);

    test.equal(Fn.int16(0, 0), 0);
    test.equal(Fn.int16(0, 1), 1);
    test.equal(Fn.int16(1, 4), 260);
    test.equal(Fn.int16(8, 0), 2048);
    test.equal(Fn.int16(255, 255), -1);
    test.equal(Fn.int16(240, 240), -3856);

    test.done();
  },

  uint16fromtwobytes: function(test) {
    test.expect(6);

    test.equal(Fn.uint16(0, 0), 0);
    test.equal(Fn.uint16(0, 1), 1);
    test.equal(Fn.uint16(1, 4), 260);
    test.equal(Fn.uint16(8, 0), 2048);
    test.equal(Fn.uint16(255, 255), 65535);
    test.equal(Fn.uint16(240, 240), 61680);

    test.done();
  },

  int24fromthreebytes: function(test) {
    test.expect(5);

    test.equal(Fn.int24(0, 0, 0), 0);
    test.equal(Fn.int24(0, 0, 1), 1);
    test.equal(Fn.int24(255, 255, 255), -1);
    test.equal(Fn.int24(127, 255, 255), 8388607);
    test.equal(Fn.int24(0, 255, 255), 65535);

    test.done();
  },

  uint24fromthreebytes: function(test) {
    test.expect(5);

    test.equal(Fn.uint24(0, 0, 0), 0);
    test.equal(Fn.uint24(0, 0, 1), 1);
    test.equal(Fn.uint24(255, 255, 255), 16777215);
    test.equal(Fn.uint24(127, 255, 255), 8388607);
    test.equal(Fn.uint24(0, 255, 255), 65535);

    test.done();
  },

  int32fromfourbytes: function(test) {
    test.expect(7);

    test.equal(Fn.int32(0, 0, 0, 0), 0);
    test.equal(Fn.int32(0, 0, 0, 1), 1);
    test.equal(Fn.int32(255, 0, 0, 0), -16777216);
    test.equal(Fn.int32(255, 255, 255, 255), -1);
    test.equal(Fn.int32(200, 255, 255, 255), -922746881);
    test.equal(Fn.int32(127, 255, 255, 255), 2147483647);
    test.equal(Fn.int32(0, 255, 255, 255), 16777215);

    test.done();
  },

  uint32fromfourbytes: function(test) {
    test.expect(7);

    test.equal(Fn.uint32(0, 0, 0, 0), 0);
    test.equal(Fn.uint32(0, 0, 0, 1), 1);
    test.equal(Fn.uint32(255, 0, 0, 0), 4278190080);
    test.equal(Fn.uint32(255, 255, 255, 255), 4294967295);
    test.equal(Fn.uint32(200, 255, 255, 255), 3372220415);
    test.equal(Fn.uint32(127, 255, 255, 255), 2147483647);
    test.equal(Fn.uint32(0, 255, 255, 255), 16777215);

    test.done();
  },

  bitSize: function(test) {
    test.expect(5);

    test.equal(Fn.bitSize(1000), 10);
    test.equal(Fn.bitSize(1024), 10);
    test.equal(Fn.bitSize(Number.MAX_SAFE_INTEGER), 53);
    test.equal(Fn.bitSize(Number.MAX_VALUE), 1024);
    test.equal(Fn.bitSize(8), 3);

    test.done();
  },

  toFixed: function(test) {
    test.expect(6);

    test.equal(typeof Fn.toFixed(0.123456789), "number");
    test.equal(Fn.toFixed(0.123456789), 0);
    test.equal(Fn.toFixed(0.123456789, 2), 0.12);
    test.equal(Fn.toFixed(3 / 7, 1), 0.4);
    test.equal(Fn.toFixed(1, 2), 1);
    test.equal(Fn.toFixed(1.5, 2), 1.5);
    test.done();
  },
  toFixedDoesNotThrow: function(test) {
    test.expect(2);

    test.doesNotThrow(function() {
      Fn.toFixed(null);
    });
    test.doesNotThrow(function() {
      Fn.toFixed(undefined);
    });
    test.done();
  },
};

exports["Fn.* Consts"] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {
    done();
  },

  RAD_TO_DEG: function(test) {
    test.expect(1);
    test.equal(Fn.RAD_TO_DEG, 180 / Math.PI);
    test.done();
  },

  DEG_TO_RAD: function(test) {
    test.expect(1);
    test.equal(Fn.DEG_TO_RAD, Math.PI / 180);
    test.done();
  },

  TAU: function(test) {
    test.expect(1);
    test.equal(Fn.TAU, 2 * Math.PI);
    test.done();
  },
};

var bitSizes = [ 4, 8, 10, 12, 16, 20, 24, 32 ];


exports["Fn.s*"] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {
    done();
  },

  cast: function(test) {
    test.expect(bitSizes.length * 4);

    bitSizes.forEach(function(bits) {
      var decimal = Fn["POW_2_" + bits];
      var half = decimal / 2 >>> 0;
      test.equal(Fn["s" + bits](decimal - 1), -1);
      test.equal(Fn["s" + bits](half), -half);
      test.equal(Fn["s" + bits](half -1), half - 1);
      test.equal(Fn["s" + bits](half + 1), -half + 1);
    });

    test.done();
  },
};


exports["Fn.u*"] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {
    done();
  },

  cast: function(test) {
    test.expect(bitSizes.length * 7);

    bitSizes.forEach(function(bits) {
      var decimal = Fn["POW_2_" + bits];
      test.equal(Fn["u" + bits](decimal), decimal - 1);
      test.equal(Fn["u" + bits](decimal - 1), decimal - 1);
      test.equal(Fn["u" + bits](-1), decimal - 1);
      test.equal(Fn["u" + bits](decimal + 1), decimal - 1);
      test.equal(Fn["u" + bits](-1 * decimal), 0);
      test.equal(Fn["u" + bits](-1 * decimal + 1), 1);
      test.equal(Fn["u" + bits](0), 0);
    });

    test.done();
  },
};

exports["Fn.POW_2_*"] = {
  setUp: function(done) {
    done();
  },

  tearDown: function(done) {

    done();
  },

  maxSafeIntegerBits: function(test) {
    var MAX = Fn.bitSize(Number.MAX_SAFE_INTEGER);

    test.expect(MAX);

    for (var i = 0; i < MAX; i++) {
      test.equal(Fn["POW_2_" + i], Math.pow(2, i));
    }

    test.done();
  }

};
