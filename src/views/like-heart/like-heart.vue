<!--
 * @Author: your name
 * @Date: 2020-04-01 16:50:41
 * @LastEditTime: 2020-04-01 17:19:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\views\like-heart\like-heart.vue
 -->
<template>
  <div>
    <div @click="makeHeart">makeHeart</div>
    <img src="./icon_flower.png" alt />
    <canvas id="cvs"></canvas>
  </div>
</template>
<script>
import LikeHeart from "./like-heart.js";
export default {
  data() {
    return {
      width: 175, //初始宽度
      height: 400, //初始高度
      heartList: [], //初始数组
      heartCount: 0 //累加计数初始值
    };
  },
  methods: {
    getRandomDis() {
      if (Math.random() > 0.5) {
        return -(Math.random() * 43);
      } else {
        return +(Math.random() * 43);
      }
    },
    createHeart() {
      this.heartCount++;
      let positionArray = [
        {
          x: 100,
          y: 400,
          endX: 100,
          endY: 300
        }
      ];
      let img = new Image();
      img.src = require("./icon_flower.png");
      let p1 = {
        x: 100 + this.getRandomDis(),
        y: 300 + this.getRandomDis()
      };
      let p2 = {
        x: 100 + this.getRandomDis(),
        y: 200 + this.getRandomDis()
      };
      return new LikeHeart({
        id: this.heartCount,
        x: positionArray[0].x,
        y: positionArray[0].y,
        endX: positionArray[0].endX,
        endY: positionArray[0].endY,
        onFadeOut: this.removeItem,
        noAngel: true, //决定是否从小到大
        // noScale: true,//决定是否左右摆动
        width: 30, //决定心的大小
        height: 30,
        image: img,
        bezierPoint: {
          p0: {
            x: positionArray[0].x,
            y: positionArray[0].y
          },
          p1: p1,
          p2: p2,
          p3: {
            x: positionArray[0].endX,
            y: positionArray[0].endY
          }
        }
      });
    },
    removeItem(item) {
      var array = [];
      for (var i = 0; i < this.heartList.length; i++) {
        if (this.heartList[i].id !== item.id) {
          array.push(this.heartList[i]);
        }
      }
      this.heartList = array;
    }
  },

  mounted() {
    // 飘心
    var _this = this;
    var ctx = document.getElementById("cvs").getContext("2d");
    (ctx.canvas.width = _this.width),
      (ctx.canvas.height = _this.height),
      (function loop() {
        ctx.clearRect(0, 0, _this.width, _this.height);
        _this.heartList.forEach(function(item) {
          item && item.move(ctx);
        });
        requestAnimationFrame(loop);
      })();
    setInterval(function() {
      //   _this.heartList.push(_this.createHeart());
    }, 700);
    document.getElementById("cvs").addEventListener(
      "click",
      function() {
        _this.heartList.push(_this.createHeart());
      },
      false
    );
  }
};
</script>

