// 存储优惠
function Preft() {
  this.TwoFreeOne = [];
  this.NineFiveDiscount = [];
}

Preft.prototype = {
  addTwoFO: function(code) {
    if (-1 === this.TwoFreeOne.indexOf(code)) {
      this.TwoFreeOne.push(code);
    }
  },
  addNineFD: function(code) {
    if (-1 === this.NineFiveDiscount.indexOf(code)) {
      this.NineFiveDiscount.push(code);
    }
  },
  removeTwoFO: function(code) {
    var index = this.TwoFreeOne.indexOf(code);
    if (-1 !== index) this.TwoFreeOne.splice(index, 1);
  },
  removeNineFD: function(code) {
    var index = this.NineFiveDiscount.indexOf(code);
    if (-1 !== index) this.NineFiveDiscount.splice(index, 1);
  },
  removeAll: function() {
    this.TwoFreeOne = [];
    this.NineFiveDiscount = [];
  }
}

// 测试代码
var assert = require('assert');
function Test() {
  var preft = new Preft();
  preft.addTwoFO("ITEM000001");
  preft.addTwoFO("ITEM000002");
  preft.addTwoFO("ITEM000003");
  preft.addTwoFO("ITEM000001");
  assert.equal(preft.TwoFreeOne.length, 3, "买二赠一商品应该为三个!");
  preft.removeTwoFO("ITEM000001");
  assert.equal(preft.TwoFreeOne.length, 2, "买二赠一商品应该为两个!");

  preft.addNineFD("ITEM000001");
  preft.addNineFD("ITEM000002");
  preft.addNineFD("ITEM000003");
  preft.addNineFD("ITEM000001");
  assert.equal(preft.NineFiveDiscount.length, 3, "95折商品应该为三个!");
  preft.removeNineFD("ITEM000001");
  assert.equal(preft.NineFiveDiscount.length, 2, "95折商品应该为两个!");

  // console.log('测试通过!');
}
Test();

var preft = new Preft();
module.exports = preft;
