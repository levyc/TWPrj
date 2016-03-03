// 存储商品信息
function Goods() {
  this.codes = [];  // 存储商品的条形码, 用于快速检索和判断商品是否重复
  this.goods = [];  // 存储所有的商品信息
}

Goods.prototype = {
  get: function(code) {
    var index = this.codes.indexOf(code);
    if (-1 !== index) {
      return this.goods[index];
    }
  },
  addarr: function(arr) {
    if (!Array.isArray(arr)) {
      console.error("参数必须为数组格式!");
      return false;
    }
    if (5 !== arr.length) {
      console.error("数组元素个数必须为5个!");
      return false;
    }
    arr.forEach(function(item) {
      if (!item) {
        console.error("商品名称,单位,单价,类别和条形码均不能为空!");
        return false;
      }
    });
    this.codes.push(arr[4]);
    this.goods.push(arr);
  },
  add: function(name, unit, price, style, code) {
    if (!name || !unit || !price || !style || !code) {
      console.error("商品名称,单位,单价,类别和条形码均不能为空!");
      return false;
    }
    if (-1 !== this.codes.indexOf(code)) {
      console.error("商品的条形码不可重复!");
      return false;
    }
    this.codes.push(code);
    this.goods.push(['' + name, '' + unit, parseFloat(price), '' + style, '' + code]);
  },
  remove: function(code) {
    var index = this.codes.indexOf(code);
    if (-1 === index) {
      console.error("不存在此条形码的商品!");
      return false;
    }
    this.codes.splice(index, 1);
    this.goods.splice(index, 1);
  },
  removeAll: function() {
    this.codes = [];
    this.goods = [];
  },
  show: function() {
    this.goods.forEach(function(good){
      console.log("名称: " + (good[0] || ''), "单位: " + (good[1] || ''), "单价: " + (good[2] || ''), "类别: " + (good[3] + ''), "条形码: " + (good[4] || ''));
    });
  }
};

// 测试代码
var assert = require('assert');
function Test() {
  var goods = new Goods();
  goods.add("可口可乐", "个", 3.00, "饮料类", "ITEM000001");
  goods.add("羽毛球", "个", 1.00, "运动类", "ITEM000002");
  goods.add("苹果", "斤", 5.5, "水果类", "ITEM000003");
  assert.equal(goods.goods.length, 3, "应该存在三个商品");
  // assert.equal(goods.add("百事可乐", "个", 3.00, "饮料类", "ITEM000001"), false, "条形码ITEM000001不可重复!");
  goods.remove("ITEM000001");
  assert.equal(goods.goods.length, 2, "应该存在两个商品");
  // assert.equal(goods.remove("ITEM000001"), false, "不可删除不存在的商品(ITEM000001)");
  // goods.show();
  // console.log('测试通过!');
}
Test();

var goods = new Goods();
module.exports = goods;
