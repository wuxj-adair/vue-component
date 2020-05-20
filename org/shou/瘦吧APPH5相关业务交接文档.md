##                                                           							                                                    瘦吧APPH5相关业务交接文档

[TOC]



### 一.  资源

#### 1.源码地址

  git：[shouba-h5-project](http://shoubagit.shouba.cn/H5/shouba-h5-project)

#### 2.UI与API

##### 2.1  饮食打卡 

UI    ： [蓝湖饮食打卡 ](https://lanhuapp.com/web/#/item/project/board?pid=e55fd8ae-fa42-4600-a761-4b6bb2ed599c)

API  ： [打卡记录](http://yapi.shouba.cn/project/17/interface/api/cat_155)

##### 2.2  减脂案例详情

UI    ： [案例详情](https://lanhuapp.com/web/#/item/project/board?pid=a59be673-c218-49fd-91f1-a0ed0b28dcda)

API  ： [减脂案例](http://yapi.shouba.cn/project/17/interface/api/cat_243) 

### 二.  技术框架

​	 vue+ mint-ui+webpack

### 三.  主要流程

#### 3.1饮食打卡 

##### 1.饮食打卡主页    

views/daily/home.vue 

```html
 <div class="tab-navbar">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" @click.native.prevent="changeView('foodDaily')" class="tab-item">三餐打卡</mt-tab-item>
          <mt-tab-item id="2" @click.native.prevent="changeView('waterDaily')" class="tab-item">饮水打卡</mt-tab-item>
        </mt-navbar>
 </div>
```

##### 2.三餐打卡    

   views/daily/foodDaily.vue 

```js
    /**
     * @description: 获取当日三餐饮食
     * @param {type}
     * @return:
     */
    getMealDaily() {
      let params = { userId: this.userId };
      $http
        .get(apiUrl.mealDaily, params, {
          Authorization: this.token
        })
        .then(
          data => {
            let { code, data: resdata } = data;
            if (code == 200) {
              this.mealDailyIds =
                resdata == null ? [null, null, null] : resdata.ids;
            } else {
              Toast(utils.toastconfig(data.msg));
            }
          },
          err => {
            Toast(utils.toastconfig(err.msg));
          }
        );
    },
```

![image-20200520151014069](.\image-20200520151014069.png)

##### 3.添加打卡   

   views/daily/mealAdd.vue 

```js
    mealAdd() {
      let params = {
        userId: this.userId,
        recordType: this.recordType,
        imagePath: this.photoList.join(","),
        content: this.apply_text
      };
      $http
        .post(apiUrl.mealAdd, params, {
          "Content-Type": "application/json",
          Authorization: this.token
        })
        .then(
          data => {
            let { code } = data;
            if (code === "200") {
              this.afterMealAdd({
                userId: this.userId,
                recordType: this.recordType
              });
            }
          },
          err => {
            Toast(utils.toastconfig(err.msg));
          }
        );
    },
```

##### 4.饮水打卡    

​    views/daily/waterDaily.vue 

```js
	/**
     * @description: 获取饮水list
     * @param {type}
     * @return:
     */
    getWaterList(state) {
      if (state != "pullBotStatus" && this.userType == 2) {
        this.$store.commit("setValue", [{ key: "loadingShow", value: false }]);
      }
      if (state != "pullBotStatus") {
        this.currPage = 1;
      } else {
        this.currPage = ++this.currPage;
      }
      let params = {
        dateTime: this.dateToString(
          new Date(this.dateShow.getFullYear(), this.dateShow.getMonth() + 1, 0)
        ),
        currPage: this.currPage,
        pageSize: 10,
        userId: this.userType === 2 ? this.studentsId : this.userId,
        type: this.userType
      };
      $http
        .get(apiUrl.waterList, params, {
          "Content-Type": "application/json",
          Authorization: this.token
        })
        .then(
          data => {
            let { code, data: resdata } = data;
            if (code == 200) {
              this.allLoaded = false;
              this.pullNoData = false;
              this.$store.commit("setValue", [
                { key: "loadingShow", value: true }
              ]);
              let listData = resdata.records;
              if (listData.length != 0) {
                //剩余页等于当前页，说明数据全部加载完
                if (resdata.current === resdata.pages) {
                  this.allLoaded = true;
                }
                if (state == "pullBotStatus") {
                  this.list.push(...listData);
                } else {
                  this.list = listData;
                }
              } else {
                this.list = [];
                this.pullNoData = true;
              }
              this.updateLoadState(state);
            } else {
              Toast(utils.toastconfig(data.msg));
            }
          },
          err => {
            Toast(utils.toastconfig(err.msg));
          }
        );
    },
```

![image-20200520152350616](.\image-20200520152350616.png)

#### 3.2减脂案例详情  

​     views/caseDetail/caseDetail.vue 

```js
    /**
     * @description: 获取案例详情
     * @param {type}
     * @return:
     */
    getCaseDetail() {
      let that = this;
      let params = this.share
        ? { coaStuCaseId: this.caseId, shareUserId: this.shareUserId }
        : { coaStuCaseId: this.caseId };
      let url = this.share ? apiUrl.shareDetailCoaStuCase : apiUrl.caseDetail;
      $http
        .get(url, params, {
          "Content-Type": "application/json",
          Authorization: this.token
        })
        .then(
          data => {
            ...
          },
          err => {
            Toast(utils.toastconfig(err.msg));
          }
        );
    },
```

![image-20200520153729790](.\image-20200520153729790.png)