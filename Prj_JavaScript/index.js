/**
  * 测试备注: 针对题目中的四种情况,分别引用以下文件:
  * 第一种: var preftData = require('./data/preft.json');
           var buyData = require('./data/buy.json');
    第二种: var preftData = require('./data/preft1.json');
           var buyData = require('./data/buy.json');
    第三种: var preftData = require('./data/preft2.json');
           var buyData = require('./data/buy.json');
    第四种: var preftData = require('./data/preft3.json');
           var buyData = require('./data/buy1.json');
  */
var goods = require('./goods');
var preft = require('./preft');
var goodsData = require('./data/goods.json');
var preftData = require('./data/preft.json');
var buyData = require('./data/buy.json');

// 读取商品数据
goodsData.forEach(function(good) {
  goods.addarr(good);
});
// 获取优惠信息
preftData.TwoFreeOne.forEach(function(item) {
  preft.addTwoFO(item);
});
preftData.NineFiveDiscount.forEach(function(item) {
  preft.addNineFD(item);
});

// 整理所获取购买的商品信息
var buyCodeNum = {};
buyData.forEach(function(item) {
  var arr = item.split("-");
  if (1 !== arr.length && 2 !== arr.length) {
    return;
  }
  if (1 === arr.length) {
    arr.push(1);
  }
  if (undefined === buyCodeNum[arr[0]]) {
    buyCodeNum[arr[0]] = parseInt(arr[1], 10);
  } else {
    buyCodeNum[arr[0]] += parseInt(arr[1], 10);
  }
});

// 输出小票信息
var hasTwoFreeOne = false;  // 判断是否有买二赠一的商品
var hasNineFiveDiscount = false;  // 判断是否有95折的商品
var saveMoney = 0;  //节省多少钱
var useMoney = 0;   //花费多少钱
console.log("\n***<没钱赚商店>购物清单***");
for (var code in buyCodeNum) {
  var good = goods.get(code);
  var num = buyCodeNum[code]; //数量
  var money = 0;
  if (good) {
    if (-1 !== preft.TwoFreeOne.indexOf(code)) {
      hasTwoFreeOne = true;
      money = good[2] * (num - parseInt(num / 3));
      saveMoney += good[2] * parseInt(num / 3);
    } else if (-1 !== preft.NineFiveDiscount.indexOf(code)) {
      hasNineFiveDiscount = true;
      money = good[2] * num * 0.95;
      saveMoney += good[2] * num * 0.05;
    } else {
      money = good[2] * num;
    }
    useMoney += money;
    console.log("名称: " + good[0] + ", 数量: " + num + good[1] + ", 单价: " + good[2].toFixed(2) + "(元), 小计:" + money.toFixed(2) + "(元)");
  }
}

if (hasTwoFreeOne) {
  console.log("----------------------\n买二赠一商品:");
  for (var code in buyCodeNum) {
    var good = goods.get(code);
    var num = buyCodeNum[code];
    if (good && -1 !== preft.TwoFreeOne.indexOf(code)) {
      console.log("名称: " + good[0] + ", 数量: " + parseInt(num / 3, 10) + good[1]);
    }
  }
}

if (hasNineFiveDiscount) {
  console.log("----------------------\n95折商品:");
  for (var code in buyCodeNum) {
    var good = goods.get(code);
    var num = buyCodeNum[code];
    if(good && -1 !== preft.NineFiveDiscount.indexOf(code) && -1 === preft.TwoFreeOne.indexOf(code)) {
      console.log("名称: " + good[0] + ", 数量: " + num + good[1]);
    }
  }
}

console.log("----------------------");
console.log("总计: " + useMoney.toFixed(2) + "(元)");
if (0 !== saveMoney) {
  console.log("节省: " + saveMoney.toFixed(2) + "(元)");
}
console.log("**********************");
