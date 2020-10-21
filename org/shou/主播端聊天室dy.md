## 一.  聊天室初始化管理 utils/index.js 

### 1.    连接聊天室 

​      在home.vue中的getData中调用Utils.connectChatroom

```js
      //获取直播数据
      getData(){
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/theLiveDetails',
            method: 'POST',
            data: {}
          },
          successFun(res){
          ...
            util.connectChatroom
          },
        })
      },
```

### 2.    获取聊天室服务器地址 

​      nim.getChatroomAddress

```js
Utils.connectChatroom = function (roomObj) {
...
  if(roomObj.data && roomObj.data.chatroom_address){
    // 聊天室观看人数
    store.commit("updataWatchNum", roomObj.data.chatroom_address.onlineusercount||0)
  }
  // 获取聊天室服务器地址
  roomObj.nim.getChatroomAddress({
      ....
      that.initChatroomSDK(roomObj);
  });
}
```

###  3.    聊天室SDK初始化 

 SDK.Chatroom.getInstance  
 	此接口为单例模式, 对于同一个账号的同一个聊天室, 永远返回同一份实例, 即只有第一次调用会初始化一个实例, 后续	 调用此接口会直接返回初始化过的实例.
     后续调用此接口时, 如果连接已断开, 会自动建立连接
     当发生掉线时，SDK会自动进行重连

```js
Utils.initChatroomSDK = function (obj) {
  let that = this;
  window.windowChatroom = SDK.Chatroom.getInstance({
    appKey: obj.appKey, //在云信管理后台查看应用的 appKey
    account: obj.account,//帐号, 应用内唯一
    token: obj.token, //帐号的 token, 用于建立连接
    transports: ["websocket"],
    chatroomId: obj.roomid + "",//聊天室 id
    chatroomAddresses: obj.address, //聊天室地址列表
    onconnect: function onChatroomConnect(chatroomInfo) {
      ....
      //获取管理员
      that.applyManagerList() 
      window.windowChatroom.updateChatroom({
        chatroom: {
          name: store.state.chatRoomName,//更新聊天室名字
        },
        needNotify: true,
        done: function (error, obj) {
        }
      })
      //获取聊天室历史信息
      window.windowChatroom.getHistoryMsgs({
        timetag: new Date().getTime(),
        limit: 20,
        //reverse:true,
        msgTypes: ['text'],
        done: (error, obj) => {
          window.objMsgs = obj.msgs
          store.commit("addHistoryChatMsgs", obj.msgs);
        }
      });
    },
    onerror: function onChatroomError(error) {
      if (error) {
        alert("网络连接状态异常");
      }
    },
    ondisconnect: function onChatroomDisconnect(error) {
      // 此时说明 `SDK` 处于断开状态, 切换聊天室也会触发次回调
      if (error) {
        switch (error.code) {
          case 13003:
            alert("抱歉，你已被主播拉入了黑名单");
            break;
          // 被踢, 请提示错误后跳转到登录页面
          case "kicked":
            if (error.reason === "managerKick") {
              alert("你已被管理员移出聊天室");
            } else if (error.reason === "blacked") {
              alert("你已被管理员拉入黑名单");
            }
            break;
          default:
            console.log(error.message);
            break;
        }
      }
    },
    // 聊天室消息
    onmsgs: function (msgs) {
      //区分不同消息，加入不同数组
      msgs.forEach(msg => {
         ...
       }
        //超级管理员全员禁言与解禁
        if (msg.custom) {
          if (msg.custom.msg&&msg.custom.msg.includes('超级管理员')) {
            Vue.prototype.$confirm(msg.custom.msg, "", {
              cancelButtonText: "我知道了",
              showClose: false,
              center: true,
              roundButton: true,
              showConfirmButton: false,
              showCancelButton: true
            })
          } else if (JSON.parse(msg.custom)) {
          //打赏
            let custom=JSON.parse(msg.custom)
            if(custom.msg&&custom.msg.includes('打赏成功')){
              if(custom.isFlower){
                store.commit("addFreeGiftChatMsg", msg)
              }else{
                giftChatMsgsArr.push(custom)
              }          
            }       
          }
        }
      })
      ....
      //有礼物消息时处理
      if (giftChatMsgsArr.length > 0) {
        store.commit("addGiftChatMsg", giftChatMsgsArr)
      }
    },
  });
}

```

## 二 .  主要组件

主要分为三块：聊天室，成员列表，礼物打赏
1. chatroom.vue：聊天室与成员列表总入口
2. RoomGift.vue：礼物打赏总入口

### 1 .    chatroom.vue

聊天室与在线学员管理员列表 组件总入口

```vue
<span
        class="u-tab"
        :class="{active:roomType===2}"
        @click="changeRoomType(2)"
      >在线观看({{watchNum}})</span>
```

```vue
<div v-show="roomType===2" class="chat-editor-top-absolute" >
      <div class="editor-send" :class="{mute:!mute}" @click="setMute(mute)">{{mute?"解除禁言": "全体禁言"}}</div>
</div>
```

```js
import RoomChatList from "./RoomChatList";
import RoomChatMember from "./RoomChatMember";
```

### 1 .1    RoomChatList.vue

聊天室组件

```js
import ChatList from './ChatList'
import ChatEditor from './ChatEditor'
```

### 1 .1.1    ChatList.vue

聊天室列表组件

```vue
  <ul id="chat-list" class="chat-list" @scroll="showScroll()">
    <div v-if="announcement" class="chat-item">
      ...
        <div class="manager-label owner-label">系统公告</div>
      ...
    <chat-item v-for="(msg, index) in msglist" :rawMsg="msg" :key="(msg.idClient || index)"></chat-item>
    <div v-show="mute" class="banned-post">
      <div>------ 全员禁言中 ------</div>
      <div class="banned-info">可在【在线观看】列表解除禁言</div>
    </div>
  </ul>
```

```js
import ChatItem from "./ChatItem";
```

### 1.1.1.1  ChatItem.vue

聊天信息项   显示聊天信息、成员进入聊天室信息

```js
    if (item.type === "text") {
      // 文本消息
      item.showText = util.escape(item.text);
      if (/\[[^\]]+\]/.test(item.showText)) {
        let emojiItems = item.showText.match(/\[[^\]]+\]/g);
        emojiItems.forEach(text => {
          let emojiCnt = emojiObj.emojiList.emoji;
          // 转换为emoji
          if (emojiCnt[text]) {
            item.showText = item.showText.replace(
              text,
              `<img class="chat-item-emoji-small" src="${emojiCnt[text].img}">`
            );
          }
        });
      }
    }
```

### 1 .1.2     ChatEditor.vue

聊天室编辑区域组件

```vue
<div class="chat-editor">
    <chat-emoji></chat-emoji>
    <div class="chat-editor-top">
      <img @click.stop="showEmoji" src="../../static/imgs/room_chat/emoji.png" alt />
      <div class="editor-send" @click="sendTextMsg">发送</div>
    </div>
    <textarea v-model="msgToSent" placeholder="说点儿什么吧......" @keyup.enter="sendTextMsg">          	</textarea>
</div>
```

引入emoji

```js
import ChatEmoji from "./ChatEmoji";
```

### 1.2.     RoomChatMember

成员组件

```vue
<div class="room-chat-member">
    ...
    <input
          type="text"
          placeholder="请输入学员昵称/ID号"
          v-model="msgToSent"
          @keyup.enter="search(msgToSent,true)"
        />
    ...
    ...
      <div v-for="(member, index) in membersSearch">
        <member-item :member="member"></member-item>
      </div>
    ...
    <div
      v-show="!isSearch||msgToSent.length==0"
      class="member-container-base"
      ref="member1"
      v-resize="resize"
    > 
    </div>
    ...
    <div
      v-show="!isSearch||msgToSent.length==0"
      class="member-container-base member-container"
      ref="member2"
    >
      <div class="u-list-item">
        <div>在线学员({{onlineMemberNum}})</div>
      </div>
      <div v-for="(member, index) in chatRoomMembers">
        <member-item :member="member"></member-item>
      </div>
    </div>
  </div>
```

处理增加删除管理员人数变化时，在线学员列表高度的自适应

```vue
  v-resize="resize"
```

```js
  directives: {
    // 使用局部注册指令的方式
    resize: {
      // 指令的名称
      bind(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = "",
          height = "";
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value(); // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      }
    }
  }
```

```js
resize() {
      this.$nextTick(function() {
        this.$refs.member2.style.height =
          7.04 - this.$refs.member1.offsetHeight / 100 + "rem"; //动态设置HTML元素高度
      });
    },
```

```js
import MemberItem from "./MemberItem";
```

### 1.2.1   MemberItem.vue

成员列表项组件（在线学员项，管理员项）

```vue
  <el-dropdown size="mini" trigger="click" class="member-item-el-dropdown">
    <div class="member-item">
      ...
      <member-handle :member="member" :isMemberItem="true"></member-handle>
    </div>
  </el-dropdown>
```

```js
import MemberHandle from "./MemberHandle";
```

### 1.2.2  MemberHandle.vue

人员操作组件 聊天室里与学员列表里点击操作成员，统一使用该组件

```vue
  <div style="display:none">
    <el-dropdown-menu slot="dropdown" :class="[isMemberItem?'member-handle-member-do2':'member-handle-member-do']">
      <el-dropdown-item v-if="member.type!='manager'" @click.native="markChatroomManager(member.account,true)">设为管理员
      </el-dropdown-item>
      <el-dropdown-item v-if="member.type=='manager'" @click.native="markChatroomManager(member.account,false)">解除职称
      </el-dropdown-item>
      <el-dropdown-item v-if="member.gaged!=true" @click.native="markChatroomGaglist(member.account,true)">禁言
      </el-dropdown-item>
      <el-dropdown-item v-if="member.gaged" @click.native="markChatroomGaglist(member.account,false)">解除禁言
      </el-dropdown-item>
      <el-dropdown-item @click.native="kickChatroomMember(member.account,member.type)">移出房间</el-dropdown-item>
    </el-dropdown-menu>
  </div>
```

```js
//SDK.Chatroom
windowChatroom.markChatroomGaglist({
              account: account,
              isAdd: isAdd,//是否禁言该学员
              done: function (error, obj) {}
});
```

```js
//SDK.Chatroom
windowChatroom.kickChatroomMember({
          account: account,
          done: function (error, obj) {
            if (error&type!="manager") {
              that.$message({
                message: '该用户不在线',
                type: 'warning'
              });
            }
            console.log('踢人' + (!error ? '成功' : '失败'), error, obj);
            that.$store.commit("addChatRoomMembers");
          }
 })
```

### 2.      RoomGift.vue

礼物打赏组件
处理礼物打赏的显示，包括收费的礼物和免费的花
该组件主要负责显示逻辑

```js
//处理飘花显示的逻辑的js
import LikeHeart from "../utils/like-heart.js";
```
