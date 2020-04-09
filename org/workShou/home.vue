<template>
  <div class="home_page" v-if="is_show">
    <div class="home_header flexStart">
      <div class="home_header_user flexAround">
        <div class="flexCenter">
          <div class="header_user_img mr15">
            <img id="container_img" :src="data.header" alt="">
          </div>
          <div class="header_user_text flexaoutCenter">
            <p style="font-weight: bold;" class="mb5">房间号 {{data.home_num}}</p>
            <p class="flexCenter" style="color: #999">
              <!--<span style="text-decoration:underline; border-right: 1px solid #999;" class="pr10">重设密码</span>-->
              <span style="text-decoration:underline;" class="postion" @click="logout">退出登录</span>
            </p>
          </div>
        </div>

        <p class="header_user_share flexCenter postion" @click="shareDialogVisible = true">
          <i class="icon share_icon mr5"></i>
          <span>分享</span>
        </p>
      </div>
      <div class="home_header_title flexStart">
        <div class="flexCenter home_header_title_center">
          <div class="home_header_title_img mr25">
            <img src="/static/imgs/zhi20_logo.png" alt="">
          </div>
          <p class="home_header_title_text">中食云创平台直播系统</p>
          <span class="home_header_title_icon ml10">主播后台</span>
        </div>
      </div>
    </div>

    <div class="home_main">
      <div class="home_main_left">
        <div class="home_main_left_top">
          <div class="home_main_down">
            <div class="home_main_downMain">
              <p class="mb5">共享文件</p>
              <p>文件将共享至客户端，学员可同步观看(仅image/ppt/pptx/pdf格式)</p>
            </div>
            <div class="home_main_downLoad" v-if="shareDocs.length > 0">
              <div v-for="item, index in shareDocs" class="flexBetween home_main_downItem">
                <div class="flexCenter">
                  <i class="icon courseware_icon mr5"></i>
                  <p class="fz12 fb">{{item.title}}</p>
                </div>
                <div class="flexCenter">
                  <span class="pr10 fz12 line">{{item.file_size | change}}</span>
                  <span class="pl10 fz12" @click="deleteCourse(item, index)">删除</span>
                </div>
              </div>
            </div>
            <div class="ml35 mt15 home_main_downBut">
              <p>
                <span>上传课件</span>
                <!---->
                <input type="file" @change="chooseCourse"
                       accept="image/*,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation">
              </p>
            </div>
          </div>
          <div class="home_main_tools">
            <p class="flexCenter mb20 postion" :class="{home_main_tools_wendang: is_sharing}" @click="screenSharing">
              <i class="wendang_icon icon mr10" :class="{wendang_out_icon: is_sharing}"></i>
              <span>{{is_sharing? '退出共享' : '屏幕共享'}}</span>
            </p>
            <p class="flexCenter mb20 postion" @click="deviceDialogVisible = true">
              <i class="shexiangtou_icon icon mr10"></i>
              <span>选择直播设备</span>
            </p>
          </div>
        </div>
        <div class="home_main_left_bot flexaoutAround">
          <template v-if="!is_play">
            <p class="home_main_counter">直播倒计时：{{counterTimer | expiresTime}}</p>
          </template>
          <template v-else>
            <template v-if="play_status == 0">
              <p class="home_main_counter">直播未开始</p>
            </template>
            <template v-else-if="play_status == 1 || play_status == 2">
              <p class="home_main_counter">直播时长: {{durationTimer | expiresTime}}</p>
            </template>
            <template v-else-if="play_status == 3">
              <p class="home_main_counter">直播已结束</p>
            </template>
            <!--<p class="home_main_counter">直播计时：{{counterTimer | expiresTime}}</p>-->
          </template>
          <div class="home_main_start flexCenter">
            <template v-if="play_status == 0">
              <p class="flexCenter play" :class="{start: is_play, postion: is_play}" @click="play">
                <i class="palyer_icon icon mr10"></i>
                <span>开始直播</span>
              </p>
            </template>
            <template v-if="play_status == 3">
              <p class="flexCenter play">
                <i class="palyer_icon icon mr10"></i>
                <span>开始直播</span>
              </p>
            </template>
            <template v-else-if="play_status == 1 || play_status == 2">
              <p class="flexCenter playAoud mr10 postion" @click="endDialogVisible = true">
                <i class="endPlay_icon icon mr5"></i>
                <span>结束直播</span>
              </p>
              <template v-if="play_status == 1">
                <p class="flexCenter playAoud postion" @click="stopPlay">
                  <i class="stopPlay_icon icon mr5"></i>
                  <span>暂停直播</span>
                </p>
              </template>
              <template v-if="play_status == 2">
                <p class="flexCenter playAoudStart postion" @click="startPlay">
                  <i class="startPlay_icon icon mr5"></i>
                  <span>继续直播</span>
                </p>
              </template>
            </template>
          </div>
          <div class="home_main_but flexCenter">
            <div style="position: relative;">
              <div class="home_main_but_slider" v-if="is_weibiaoti">
                <el-slider
                  :min="0"
                  :max="255"
                  input-size="mini"
                  v-model="weibiaoti"
                  vertical
                  @input="sliderWeibiaoti">
                </el-slider>
              </div>
              <p class="flexCenter mr10 postion" @click="is_weibiaoti = !is_weibiaoti">
                <i class="icon weibiaoti_icon mr5"></i>
                <span>话筒</span>
              </p>
            </div>

            <div style="position: relative;">
              <div class="home_main_but_slider" v-if="is_yinliang">
                <el-slider
                  :min="0"
                  :max="255"
                  input-size="mini"
                  v-model="yinliang"
                  vertical
                  @input="sliderYinliang">
                </el-slider>
              </div>
              <p class="flexCenter postion" @click="is_yinliang = !is_yinliang">
                <i class="icon yinliang_icon mr5"></i>
                <span>听筒</span>
              </p>
            </div>
          </div>
          <div>
            <el-checkbox v-model="checked" @change="recordChecked">同步录制</el-checkbox>
          </div>
        </div>
      </div>
      <div class="home_main_center">
        <div class="home_main_center_bodyer flexCenter">
          <div id="container" :style="{backgroundImage: 'url(' +data.images+ ')'}"></div>
        </div>
        <div class="home_main_center_bot">
          <div id="remoteContainer"></div>
        </div>
      </div>
      <div class="home_main_right">
        <chatroom></chatroom>
      </div>
    </div>

    <div class="endDialogVisible">
      <el-dialog
        title=""
        :show-close="showClose"
        :modal="showClose"
        :close-on-click-modal="showClose"
        :close-on-press-escape="showClose"
        :visible.sync="endDialogVisible"
        center>
        <div class="endDialog">
          <p class="endDialogTitle mb15">是否结束当前直播？</p>
          <p class="endDialogText mb30">直播时长：{{durationTimer | expiresTime}}</p>
          <div class="flexBetween endDialogBut">
            <p @click="endDialogVisible = false" class="mr25">继续直播</p>
            <p @click="endPlay">结束直播</p>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="replayDialogVisible">
      <el-dialog
        title=""
        :show-close="showClose"
        :modal="showClose"
        :close-on-click-modal="showClose"
        :close-on-press-escape="showClose"
        :visible.sync="replayDialogVisible"
        center>
        <div class="replayDialog">
          <p class="replayDialogTitle mb20">直播已结束！</p>
          <p class="replayDialogText mb45">直播视频已自动录制，请确认是否需要保留回放？</p>
          <div class="flexBetween replayDialogBut">
            <p @click="replayDialogVisible = false" class="mr25">取消</p>
            <p @click="replayPlay">确认保留</p>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="shareDialogVisible">
      <el-dialog
        title=""
        :show-close="showClose"
        :modal="showClose"

        :close-on-press-escape="showClose"
        :visible.sync="shareDialogVisible"
        center>
        <div class="shareDialog">
          <div class="shareDialogTitle mb25 pt35">
            <p>下载图片或点击 [复制分享链接]</p>
            <p>将您的直播入口提前分享出去吧～</p>
          </div>
          <div class="shareDialogCenter mb15">
            <div class="shareDialogBg">
              <p class="shareDialogText pt30">科学减脂的方法</p>
              <p class="shareDialogTest pt5">开始时间: {{data.start_time}}</p>
              <div class="shareDialogImg">
                <!--:text="shareData.share_url"-->
                <vue-qr
                  :text="shareData.share_url"
                  logoSrc="/static/imgs/zhi20_logo.png"
                  :logoScale="0.3"
                  :margin="0"
                ></vue-qr>
              </div>
              <p class="shareDialogNum">房间号：{{data.home_num}}</p>
              <p class="shareDialogBut" @click="download">下载</p>
            </div>
          </div>
          <div class="shareDialogFooter">
            <!--<p class="flexCenter copyUrl" @click="copy('.copyUrl')" data-clipboard-text="http://schoolqd.zhi20.com/collegeLearn/video?from=school&type=course&cm_id=1&share_from=506">-->
            <p class="flexCenter copyUrl" @click="copy('.copyUrl')" :data-clipboard-text="shareData.share_msg">
              <i class="icon copyLink_icon mr10"></i>
              <span>复制分享链接</span>
            </p>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="deviceDialogVisible">
      <el-dialog
        title="设备选择"
        :show-close="showClose"
        :modal="showClose"
        :close-on-press-escape="showClose"
        :visible.sync="deviceDialogVisible"
        center>
        <div class="deviceDialog flexaoutAround">
          <div class="deviceDialogCamera flexStart">
            <p class="mr20">摄像头选择</p>
            <div>
              <el-select v-model="cameraValue" placeholder="请选择">
                <el-option
                  v-for="item in CameraData"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                  @change="selectCamera">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="deviceDialogMicrophone flexStart">
            <p class="mr20">麦克风选择</p>
            <div>
              <el-select v-model="microphoneValue" placeholder="请选择">
                <el-option
                  v-for="item in MicrophoneData"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                  @change="selectMicrophone">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import util from '../utils'
  import chatroom from '../components/chatroom.vue';
  import whiteBoard from '../components/whiteBoard.vue';
  import VueQr from "vue-qr";
  import Clipboard from 'clipboard';
  export default {
    name: 'home',
    data() {
      return {
        is_show: false,
        is_play: false,//是否可以开始直播
        showClose: false,
        is_sharing: false,//是否开启屏幕共享
        joinConfig: null,//加入房间的配置
        nim: null,
        data: {},//直播数据
        shareDocs: [],//课件列表
        shareData: {},//分享数据
        testData: {},//检测到的数据
        CameraData: [],//摄像头列表
        MicrophoneData: [],//麦克风列表
        counterTimer: 0,//直播倒计时
        durationTimer: 0,//直播时长
        timer: null,
        startTimer: null,
        cameraValue: '',//摄像头的值
        microphoneValue: '',//麦克风的值
        loadingInstance: null,//loading
        checked: true,//录制状态
        is_yinliang: false,//是否开启扬声器
        yinliang: 125,//扬声器
        is_weibiaoti: false,//是否开启话筒
        weibiaoti: 125,//话筒
        play_status: 0,//直播状态 1:开始直播 0:未直播 2:暂停直播 3:直播结束
        endDialogVisible: false,//结束直播对话框
        replayDialogVisible: false,//直播回放对话框
        shareDialogVisible: false,//分享对话框
        deviceDialogVisible: false,//设备选择
      }
    },
    created(){

    },
    mounted(){
      var that = this;
      this.getList();
//      that.is_show = true;
      window.onunload = function (e) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return "您是否确认离开此页面-您输入的数据可能不会被保存";
      };
    },
    methods: {
      //判断浏览器版本
      getList(){
        /*var myBrowser, chromeVersion, version, userAgent = navigator.userAgent;
         var arr = navigator.userAgent.split(' ');
         for (var i = 0; i < arr.length; i++) {
         if (/chrome/i.test(arr[i]))
         chromeVersion = arr[i]
         }
         if (chromeVersion) {
         version = Number(chromeVersion.split('/')[1].split('.')[0]);
         } else {
         version = false;
         }
         console.log(userAgent.indexOf("Chrome"), version);
         if (userAgent.indexOf("Chrome") > -1 && version >= 72) {
         myBrowser = true
         } else {
         myBrowser = false
         }
         if (myBrowser) {
         // 跳转到对应的项目
         this.getData();
         } else {
         this.$message({
         duration: 0,
         showClose: true,
         message: '请到谷歌浏览器(72版本以上)打开直播!',
         type: 'error'
         })
         //          var wrap = document.getElementById('wrap');
         //          wrap.style.display = "block" //让元素显示
         }*/
        var that = this;
        WebRTC.checkCompatibility().then(function (data) {
          console.log('兼容性检查', data);
          that.testData = data;
          that.CameraData = data.CameraList;
          that.MicrophoneData = data.MicrophoneList;
          console.log(parseInt(that.testData.version));
          if (that.testData.WebRTC && that.testData.H264 && that.testData.MediaStream && that.testData.browser == "Chrome" && parseInt(that.testData.version) >= 72) {
            console.log(that.testData.version);
            that.cameraValue = that.testData.CameraList.length > 0 ? that.testData.CameraList[0].deviceId : ''
            that.microphoneValue = that.testData.MicrophoneList.length > 0 ? that.testData.MicrophoneList[0].deviceId : ''
            that.getData();
          } else {
            that.$message({
              duration: 0,
              showClose: true,
              message: '该浏览器或版本不支持直播系统, 请到谷歌浏览器(72版本以上)打开直播!',
              type: 'error'
            })
          }
        });
      },
      //获取课件
      getCourse(){
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/applyFileList',
            method: 'POST',
          },
          successFun(res){
            global.close();
            if (res.data) {
              that.shareDocs = res.data;
            }
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //分享数据
      getShareData(){
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/applyChare',
            method: 'POST',
            data: {
              id: that.data.id
            }
          },
          successFun(res){
            global.close();
            that.shareData = res.data
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //获取直播数据
      getData(){
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/theLiveDetails',
            method: 'POST',
            data: {}
          },
          successFun(res){
            global.close();
            that.data = res.data;
            //倒计时
            that.play_status = that.data.zhibo_status;
            that.durationTimer = that.data.start_length;
            that.checked = that.data.front_luzhi_status == 1 ? true : false;
            var startTimer = new Date(res.data.start_time).getTime() / 1000,
              nowTimer = new Date().getTime() / 1000;
//            console.log(timer);
            that.counterTimer = startTimer - nowTimer
            if (that.counterTimer > 0) {
              that.timer = setInterval(function () {
                if (that.counterTimer > 0) {
                  that.is_play = false;
                  that.counterTimer--
                } else {
                  that.is_play = true;
                  clearInterval(that.timer);
                }
              }, 1000)
            } else {
              that.is_play = true;
            }
            if (that.durationTimer > 0) {
              that.startTimer = setInterval(function () {
                that.durationTimer++;
              }, 1000)
            }
            //获取分享数据
            that.getShareData();
            //获取课件
            that.getCourse();
//            that.is_show = true;
            //初始化im
            window.nim = SDK.NIM.getInstance({
              appKey: res.data.im_info.AppKey,
              account: res.data.im_info.accid,
              token: res.data.im_info.token,
//              debug: true,
              db: false,
              onconnect: that.onconnect,
              onwillreconnect: that.onWillReconnect,
              ondisconnect: that.ondisconnect,
              onerror: that.onError,
              onpushevents: that.onPushEvents
            })
            console.log("appKey:",res.data)
            window.windowData=res.data
//            util.connectChatroom({id:res.data.id,nim:window.nim,appKey:res.data.im_info.AppKey,account:res.data.im_info.accid,token:res.data.im_info.token,roomid:res.data.chatroom_address.roomid});
                       util.connectChatroom({id:res.data.id,nim:window.nim,appKey:res.data.im_info.AppKey,account:res.data.im_info.accid,token:res.data.im_info.token,roomid:res.data.chatroom_address.roomid});
//util.connectChatroom({id:res.data.id,nim:window.nim,appKey:res.data.im_info.AppKey,account:res.data.chatroom_address.creator,token:res.data.im_info.token,roomid:res.data.chatroom_address.roomid});
          },
          errorFun(err){
            global.close();
          }
        })
      },
      // 连接成功
      onconnect () {
        // 连接成功,初始化直播
        var that = this;
        this.is_show = true;
        SDK.NIM.use(WebRTC)
        window.Netcall = WebRTC;
        that.$nextTick(function () {
//          console.log(document.getElementById('container'));
          window.netcall = window.Netcall.getInstance({
            nim: window.nim,
            container: document.getElementById('container'),
            remoteContainer: document.getElementById('remoteContainer'),
            // 是否开启日志打印
//            debug: true
          })
          that.joinConfig = {
            channelName: that.data.hudong_cid.channelName, //必填
            type: window.Netcall.NETCALL_TYPE_VIDEO,
            liveEnable: true, //开启互动直播
            sessionConfig: {
              liveEnable: true, // 开启互动直播
              videoQuality: window.Netcall.CHAT_VIDEO_QUALITY_HIGH,
              videoFrameRate: window.Netcall.CHAT_VIDEO_FRAME_RATE_15,
              rtmpUrl: that.data.zhibo_address.pushUrl, // 主播必填
              rtmpRecord: that.checked, // 开启推流录制
              splitMode: WebRTC.LAYOUT_SPLITLATTICETILE,
              layout: '',
              highAudio: true
            }
          };
          that.watchStatus();
          if (that.play_status == 1) {
            console.log(789);
            //直播中
            that.startJion(() => {
            });
          }
          else if (that.play_status == 2) {
            //暂停中
            window.netcall.joinChannel(that.joinConfig)
              .then(function (obj) {
                console.log(obj);
                // 加入房间成功后的上层逻辑操作
                // eg: 开启摄像头
                // eg: 开启麦克风
                // eg: 开启本地流
                // eg: 设置音量采集、播放
                // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
                window.netcall.startRtc()
                  .then(function () {
                    // 开启扬声器
                    return window.netcall.startDevice({
//                      type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL//自己的声音
                      type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT//对端的声音
                    }).then(function () {
                      window.netcall.setPlayVolume(that.yinliang);
                    }).catch(function (err) {
                      console.log('播放声音失败', err)
                      that.$message.error('播放声音失败!')
                    })
                  })
                  .then(function () {
                    // 主播、连麦者请设置互动者角色
                    // window.netcall.changeRoleToPlayer()
                    // 开启RTC连接
                    console.log("开始webrtc")
                  })
                  .then(function () {
                    console.log("webrtc连接成功")
                  })
                  .catch(function (err) {
                    console.log('发生错误, 挂断通话')
                    console.log(err)
                    that.$message.error('连接失败, 请刷新重试!');
                    window.netcall.hangup()
                  })
              })
          }
          else if (that.play_status == 0) {
            //未开始
            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_VIDEO,
              width: 640,
              height: 480,
              device: {deviceId: that.cameraValue}
            }).then(function () {
              window.netcall.startLocalStream();
              $('#container > div').addClass('container_class');
            }).catch(function (err) {
              console.log(err);
              if (err.code == 65002) {
                that.$message.error('无设备可用, 请连接摄像头!')
              } else {
                that.$message.error('启动摄像头失败!')
              }
            })

            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
              device: {deviceId: that.microphoneValue}
            }).then(function () {
              window.netcall.setCaptureVolume(that.weibiaoti);
            }).catch(function (err) {
              console.log(err);
              if (err.code == 65002) {
                that.$message.error('无设备可用, 请连接麦克风!')
              } else {
                that.$message.error('启动麦克风失败!')
              }
            })

            window.netcall.startDevice({
//              type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL//自己的声音
              type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT//对端的声音
            }).then(function () {
              console.log(123);
              window.netcall.setPlayVolume(that.yinliang);
            }).catch(function (err) {
              console.log('播放声音失败', err)
              that.$message.error('播放声音失败!')
            })
          }
          /*return;
           const sessionConfig = {
           liveEnable: true, // 开启互动直播
           videoQuality: window.Netcall.CHAT_VIDEO_QUALITY_HIGH,
           videoFrameRate: window.Netcall.CHAT_VIDEO_FRAME_RATE_15,
           rtmpUrl: that.data.zhibo_address.pushUrl, // 主播必填
           rtmpRecord: that.checked, // 开启推流录制
           splitMode: WebRTC.LAYOUT_SPLITLATTICETILE,
           layout: '',
           highAudio: true
           }
           window.netcall.joinChannel({
           channelName: that.data.hudong_cid.channelName, //必填
           type: window.Netcall.NETCALL_TYPE_VIDEO,
           liveEnable: true, //开启互动直播
           sessionConfig: sessionConfig
           })
           .then(function (obj) {
           console.log(obj);
           // 加入房间成功后的上层逻辑操作
           // eg: 开启摄像头
           // eg: 开启麦克风
           // eg: 开启本地流
           // eg: 设置音量采集、播放
           // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
           window.netcall.startRtc()
           /!*.then(function () {
           // 开启麦克风
           return window.netcall.startDevice({
           type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
           device: {deviceId: that.microphoneValue}
           }).then(function () {
           window.netcall.setCaptureVolume(that.weibiaoti);
           }).catch(function (err) {
           that.$message({
           duration: 0,
           showClose: true,
           message: '启动麦克风失败!',
           type: 'error'
           })
           })
           })
           .then(function () {
           // 开启扬声器
           return window.netcall.startDevice({
           type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL//自己的声音
           //type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT//对端的声音
           }).then(function () {
           console.log(123);
           window.netcall.setPlayVolume(that.yinliang);
           }).catch(function (err) {
           console.log('播放声音失败', err)
           that.$message({
           duration: 0,
           showClose: true,
           message: '播放声音失败!',
           type: 'error'
           })
           })
           })
           .then(function () {
           // 设置采集音量
           // 开启摄像头
           return window.netcall.startDevice({
           type: window.Netcall.DEVICE_TYPE_VIDEO,
           width: 640,
           height: 480,
           device: {deviceId: that.cameraValue}
           }).then(function () {
           window.netcall.startLocalStream(/!*document.getElementById('container')*!/);
           }).catch(function (err) {
           that.$message({
           duration: 0,
           showClose: true,
           message: '启动摄像头失败!',
           type: 'error'
           })
           })
           })
           .then(function () {
           // 设置本地预览画面大小
           return window.netcall.setVideoViewSize({
           width: 500,
           height: 500,
           cut: true
           })
           })
           .then(function () {
           // 主播、连麦者请设置互动者角色
           // window.netcall.changeRoleToPlayer()
           // 开启RTC连接
           console.log("开始webrtc")
           /!*return window.netcall.getDevicesOfType(window.Netcall.DEVICE_TYPE_VIDEO)
           .then(function (obj) {
           console.log('视频设备列表>>>>>>>>>>>>>>:', obj)
           }).catch(function (error) {
           console.log('视频设备列表失败>>>>>>>>>>>>>:', error)
           })*!/
           })*!/
           .then(function () {
           // window.netcall.resumeLocalStream()
           console.log("webrtc连接成功")
           console.log($('#container > div'));
           //                  $('#container > div').addClass('container_class');
           /!*window.netcall.detectNetworkStatus({
           detectTime: 30,
           fromDevice: true
           })
           .then(function (obj) {
           console.log("netDetect completed", obj);
           })
           .catch(function (err) {
           console.log("netDetect error", err);
           });*!/
           })
           .catch(function (err) {
           console.log('发生错误, 挂断通话')
           console.log(err)
           window.netcall.hangup()
           })
           })*/
        })
      },
      //重新建立连接
      onWillReconnect(obj) {
        // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
        console.log('即将重连');
        console.log(obj.retryCount);
        console.log(obj.duration);
        this.$message.error('连接已断开, 正在重新建立连接....');
      },
      //丢失连接
      ondisconnect (error) {
        // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
        this.$message.error('丢失连接');
        sessionStorage.clear();
//        this.replaceUrl('login');
        window.location.replace(location.origin + '/login');
        console.log('丢失连接');
        /*if (error) {
         switch (error.code) {
         // 账号或者密码错误, 请跳转到登录页面并提示错误
         case 302:
         break;
         // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
         case 417:
         break;
         // 被踢, 请提示错误后跳转到登录页面
         case 'kicked':
         break;
         default:
         break;
         }
         }*/
      },
      //连接失败
      onError (error) {
        this.$message.error('连接失败')
        console.log('SDK 连接失败', error)
      },
      //监听api
      watchStatus(){
        var that = this;
        //设备状态发生变化
        window.netcall.on('deviceStatus', function (obj) {
          console.log('设备状态发生变化', obj)
          that.deviceStatus();
        })
        //媒体流停止了,屏幕共享关闭
        window.netcall.on('streamEnded', function (obj) {
          console.log('媒体流停止了', obj);
          if (obj && obj.type === 'screen') {
            //屏幕共享的媒体流已经停止了，此处做关闭屏幕共享处理
            window.netcall.stopDevice(window.Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN)
              .then(() => {
                that.is_sharing = false;
                console.log('屏幕共享关闭成功')
              })
          }
        });
        //当前网络情况
        window.netcall.on("netStatus", function (obj) {
//          console.log("当前网络情况", obj.quality);
        });
      },
      //监听订阅事件
      onPushEvents(param) {
        console.log('订阅事件', param.msgEvents);
      },
      //监听订阅事件
      onPushEvents(param) {
        console.log('订阅事件', param.msgEvents);
      },
      //监听设备
      deviceStatus(){
        var that = this;
        // 检查摄像头
        window.netcall.getDevicesOfType(WebRTC.DEVICE_TYPE_VIDEO).then(function (devices) {
          console.log('摄像头', devices)
          that.CameraData = devices;
          if (devices.length > 0) {
            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_VIDEO,
              width: 640,
              height: 480,
              device: {deviceId: devices[0].deviceId}
            }).then(function () {
              window.netcall.startLocalStream();
              $('#container > div').addClass('container_class');
              console.log('启动摄像头成功，可以进行预览啦')
            }).catch(function (err) {
              console.log('启动摄像头失败', err)

            })
          }
        })

        // 检查麦克风
        window.netcall.getDevicesOfType(WebRTC.DEVICE_TYPE_AUDIO_IN).then(function (devices) {
          console.log('麦克风', devices)
          that.MicrophoneData = devices;
          if (devices.length > 0) {
            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
              device: {deviceId: devices[0].deviceId}
            }).then(function () {
//            console.log('启动麦克风成功')
              window.netcall.setCaptureVolume(that.weibiaoti);
            }).catch(function (err) {
              console.log('启动麦克风失败', err)
            })
          }
        })
      },
      //开始直播
      play() {
        var that = this;
        that.startJion(function () {
//          console.log(that.checked);
          global.open();
          global.ajax({
            data: {
              url: '/schoolapi/zbpc/initiateApply',
              method: 'POST',
              data: {
                id: that.data.id,
                is_recording: that.checked
              }
            },
            successFun(res){
              global.close();
              that.$message.success('直播开始');
              that.play_status = 1;
              that.startTimer = setInterval(function () {
                that.durationTimer++;
              }, 1000)
            },
            errorFun(err){
              global.close();
            }
          })
        });
      },
      //加入直播间, 开始直播
      startJion(callback){
        var that = this;
        if (!that.is_play) {
          that.$message.error('直播时间未到');
          return;
        }
        if (that.CameraData.length <= 0) {
          that.$message.error('无设备可用, 请连接摄像头!');
          return;
        }
        if (that.MicrophoneData.length <= 0) {
          that.$message.error('无设备可用, 请连接麦克风!');
          return;
        }
        window.netcall.joinChannel(that.joinConfig)
          .then(function (obj) {
            console.log(obj);
            // 加入房间成功后的上层逻辑操作
            // eg: 开启摄像头
            // eg: 开启麦克风
            // eg: 开启本地流
            // eg: 设置音量采集、播放
            // eg: 设置视频画面尺寸等等，具体请参照p2p呼叫模式
            window.netcall.startRtc()
              .then(function () {
                // 开启麦克风
                return window.netcall.startDevice({
                  type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
                  device: {deviceId: that.microphoneValue}
                }).then(function () {
                  window.netcall.setCaptureVolume(that.weibiaoti);
                }).catch(function (err) {
                  if (err.code == 65002) {
                    that.$message.error('无设备可用, 请连接麦克风!')
                  } else {
                    that.$message.error('启动麦克风失败!')
                  }
                })
              })
              .then(function () {
                // 开启扬声器
                return window.netcall.startDevice({
//                  type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_LOCAL//自己的声音
                  type: window.Netcall.DEVICE_TYPE_AUDIO_OUT_CHAT//对端的声音
                }).then(function () {
//                  console.log(123);
                  window.netcall.setPlayVolume(that.yinliang);
                }).catch(function (err) {
                  console.log('播放声音失败', err)
                  that.$message.error('播放声音失败!')
                })
              })
              .then(function () {
                // 设置采集音量
                // 开启摄像头
                return window.netcall.startDevice({
                  type: window.Netcall.DEVICE_TYPE_VIDEO,
                  width: 640,
                  height: 480,
                  device: {deviceId: that.cameraValue}
                }).then(function () {
                  window.netcall.startLocalStream();
                  $('#container > div').addClass('container_class');
                }).catch(function (err) {
                  if (err.code == 65002) {
                    that.$message.error('无设备可用, 请连接摄像头!')
                  } else {
                    that.$message.error('启动摄像头失败!')
                  }
                })
              })
              .then(function () {
                // 主播、连麦者请设置互动者角色
                // window.netcall.changeRoleToPlayer()
                // 开启RTC连接
                console.log("开始webrtc")
              })
              .then(function () {
                callback();
                console.log("webrtc连接成功")
                /*window.netcall.detectNetworkStatus({
                 detectTime: 30,
                 fromDevice: true
                 })
                 .then(function (obj) {
                 console.log("netDetect completed", obj);
                 })
                 .catch(function (err) {
                 console.log("netDetect error", err);
                 });*/
              })
              .catch(function (err) {
                console.log('发生错误, 挂断通话')
                console.log(err)
                that.$message.error('连接失败, 请刷新重试!');
                window.netcall.hangup()
              })
          })
      },
      //结束直播
      endPlay() {
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/stopApply',
            method: 'POST',
            data: {
              id: that.data.id,
            }
          },
          successFun(res){
            global.close();
            global.open();
            window.netcall.leaveChannel().then(function (obj) {
              global.close();
              console.log(obj);
              that.$message.success('直播结束');
              that.play_status = 3;
              clearInterval(that.startTimer);
              that.endDialogVisible = false;
              if (that.checked) {
                that.replayDialogVisible = true;
              }
              // 离开房间后，开发者自己业务的扫尾工作
              window.nim.publishEvent({
                type: 1,   //传入1即可。
                value: 10004, //value为10000以上(1-9999为云信预定义值，开发者不可使用)
                custom: 'hello world',
                vaildTime: 60,
                sync: true,
                done: that.publishEventDone
              });
            }).catch(function (error) {
              console.log(error);
              that.$message.error('结束直播失败,请重新结束直播!')
              global.close();
            })
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //暂停直播
      stopPlay() {
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/suspendApply',
            method: 'POST',
            data: {
              id: that.data.id,
            }
          },
          successFun(res){
            global.close();
            that.play_status = 2;
            window.netcall.stopDevice(window.Netcall.DEVICE_TYPE_VIDEO).then(function () {
              console.log('摄像头关闭成功')
            })
            window.netcall.stopDevice(window.Netcall.DEVICE_TYPE_AUDIO_IN).then(function () {
              console.log('麦克风关闭成功')
            })
            /*that.weibiaoti = 0;
             window.netcall.setCaptureVolume(that.weibiaoti);*/
            that.$message.success('直播暂停');
            window.nim.publishEvent({
              type: 1,   //传入1即可。
              value: 10001, //value为10000以上(1-9999为云信预定义值，开发者不可使用)
              custom: 'hello world',
              vaildTime: 60,
              sync: true,
              done: that.publishEventDone
            });
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //继续直播
      startPlay(){
        var that = this;
        if (that.CameraData.length <= 0) {
          that.$message.error('无设备可用, 请连接摄像头!');
          return;
        }
        if (that.MicrophoneData.length <= 0) {
          that.$message.error('无设备可用, 请连接麦克风!');
          return;
        }
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/continuteApply',
            method: 'POST',
            data: {
              id: that.data.id,
            }
          },
          successFun(res){
            global.close();
            that.play_status = 1;
            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_VIDEO,
              width: 640,
              height: 480,
              device: {deviceId: that.cameraValue}
            }).then(function () {
              window.netcall.startLocalStream();
              $('#container > div').addClass('container_class');
            }).catch(function (err) {
//              that.$message.error('启动摄像头失败!');
              if (err.code == 65002) {
                that.$message.error('无设备可用, 请连接摄像头!')
              } else {
                that.$message.error('启动摄像头失败!')
              }
            })
            window.netcall.startDevice({
              type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
              device: {deviceId: that.microphoneValue}
            }).then(function () {
              window.netcall.setCaptureVolume(that.weibiaoti);
            }).catch(function (err) {
//              that.$message.error('启动麦克风失败!');
              if (err.code == 65002) {
                that.$message.error('无设备可用, 请连接麦克风!')
              } else {
                that.$message.error('启动麦克风失败!')
              }
            })
            /*that.weibiaoti = 125;
             window.netcall.setCaptureVolume(that.weibiaoti);*/
            that.$message.success('直播继续!');
            window.nim.publishEvent({
              type: 1,   //传入1即可。
              value: 10002, //value为10000以上(1-9999为云信预定义值，开发者不可使用)
              custom: 'hello world',
              vaildTime: 60,
              sync: true,
              done: that.publishEventDone
            });
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //确认保留回放
      replayPlay(){
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/retainPlayback',
            method: 'POST',
          },
          successFun(res){
            global.close();
            that.$message.success('回放保留成功!');
            that.replayDialogVisible = false;
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //发布订阅事件
      publishEventDone(error, obj) {
        console.log('发布事件' + (!error ? '成功' : '失败'), error, obj);
        if (error) {
          if (this.play_status == 2) {

          }
        }
      },
      //控制话筒音量
      sliderWeibiaoti(data){
        console.log(data);
        window.netcall.setCaptureVolume(data);
      },
      //控制扬声器音量
      sliderYinliang(data){
        console.log(data);
        window.netcall.setPlayVolume(data);
      },
      //选择摄像头
      selectCamera(data){
        var that = this;
        window.netcall.startDevice({
          type: window.Netcall.DEVICE_TYPE_VIDEO,
          width: 640,
          height: 480,
          device: {deviceId: data}
        }).then(function () {
          console.log('启动摄像头成功，可以进行预览啦')
          window.netcall.startLocalStream(/*document.getElementById('container')*/);
        }).catch(function (err) {
//          console.log('启动摄像头失败', err)
          that.$message({
            duration: 0,
            showClose: true,
            message: '启动摄像头失败!',
            type: 'error'
          })
        })
      },
      //选择麦克风
      selectMicrophone(data){
        var that = this;
        window.netcall.startDevice({
          type: window.Netcall.DEVICE_TYPE_AUDIO_IN,
          device: {deviceId: data}
        }).then(function () {
          console.log('启动麦克风成功')
          window.netcall.setPlayVolume(that.yinliang);
        }).catch(function (err) {
//          console.log('启动麦克风失败', err)
          that.$message({
            duration: 0,
            showClose: true,
            message: '启动麦克风失败!',
            type: 'error'
          })
        })
      },
      //屏幕共享操作
      screenSharing(){
        var that = this;
        if (that.is_sharing) {
          window.netcall.stopDevice(window.Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN).then(() => {
            console.log('屏幕共享关闭成功')
            that.is_sharing = false;
          })
        } else {
          var param = {
            enableMixVideo: true,
            videoLayout: window.Netcall.LAYOUT_TOP_LEFT,
            videoCompressSize: window.Netcall.CHAT_VIDEO_QUALITY_NORMAL
          }
          window.netcall.setMixConf(param);
          window.netcall.startDevice({
            type: window.Netcall.DEVICE_TYPE_DESKTOP_CHROME_SCREEN
          }).then(function () {
            that.is_sharing = true;
            console.log(that.is_sharing);
          }).catch(function (err) {
            console.log('启动屏幕共享失败', err)
          })
        }
      },
      //复制分享连接
      copy(data){
        var clipboard = new Clipboard(data), that = this;
        clipboard.on("success", function (e) {
          that.$message({
            message: '复制成功',
            type: 'success'
          });
          e.clearSelection();
        });
        clipboard.on("error", function (e) {
//          global.toast.error("复制失败");
          that.$message({
            message: '复制失败',
            type: 'error'
          });
          e.clearSelection();
        });
      },
      //下载二维码
      download(){
        var oQrcode = document.querySelectorAll('.shareDialogImg img')
        var url = oQrcode[0].src
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        // 下载图名字
        a.download = '直播分享二维码'
        a.href = url
        // 合成函数，执行下载
        a.dispatchEvent(event)
      },
      //上传课件
      chooseCourse(e){
        this.upload(e);
        e.target.value = '';
      },
      upload(e){
        var files = e.target, file = files.files[0], that = this;
        let name = file.name.toString();
        name = name.substring(name.lastIndexOf('.'));
        name = name.substring(1);
        name = name.toLowerCase();
        console.log(file);
        if (name != 'jpeg' && name != 'jpg' && name != 'png' && name != 'gif' && name != 'pdf' && name != 'ppt' && name != 'pptx') {
          that.$message.error('课件格式有误');
          return;
        }
        that.fileUpload(file, name)
      },
      //课件上传第一步
      fileUpload(fileData, name) {
        var that = this;
        var ajaxData = {
          total_size: fileData.size,
          filename: fileData.name,
          part_size: fileData.size,
          file_type: fileData.type,
          upload_type: 'zhibo_zhubo',
          upload_setting: 'local',
        };
//        global.open({text: '上传中...'});
        that.loadingInstance = this.$loading({target: '.home_main_down', background: '#fff', text: '上传中...'});
        global.ajax({
          data: {
            url: '/schoolapi/zbpcupload/upload',
            method: 'POST',
            data: ajaxData,
//            baseURL: process.env.UPLOAD_API//图片上传域名
          },
          successFun(res) {
            if (res.status) {
              console.log(res.status);
              var arrList = res.data.upload_sign, arrData = res.data.upload_data;
              that.forUpload(arrList, fileData, arrData, 0, 0, name);
            } else {
              that.loadingInstance.close();
              that.$message.error(res.error_msg);
            }
          },
          errorFun(error) {
            that.loadingInstance.close();
          },
        })
      },
      //课件上传第二, 三步
      forUpload(arr, file, data, num, start, name) {
        var filesize = file.size, filename = file.name, that = this;
        if (start >= filesize) {
          return;
        }
        //计算文件切片总数
        var totalPieces = Math.ceil(filesize / arr.length);
        var uploadData = arr[num];
        var formData = new FormData();
        var end = start + totalPieces;
        if (end > filesize) {
          end = filesize;
        }
        var chunk = file.slice(start, end);//切割文件
        formData.append("file", chunk);
        formData.append("file", filename);
        formData.append("part_now", uploadData.part_now);
        formData.append("upload_id", data.upload_id);
        global.ajax({
          data: {
            url: '/schoolapi/zbpcupload/files',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
//            baseURL: process.env.UPLOAD_API//图片上传域名
          },
          successFun: function (val) {
            if (val.status) {
              if (num == arr.length - 1) {
                global.ajax({
                  data: {
                    url: '/schoolapi/zbpcupload/upload/localcomplete/' + data.upload_id,
                    method: 'put',
                    data: {},
//                    baseURL: process.env.UPLOAD_API//图片上传域名
                  },
                  successFun: function (data) {
                    if (data.status) {
                      console.log(data);
                      that.uploadCourse(data, filesize, name)
                    } else {
                      that.loadingInstance.close();
                      that.$message.error(data.error_msg);
                    }
                  },
                  errorFun: function (error_data, status, headers, error_obj) {
                    that.loadingInstance.close();
                  }
                });
              }
              else {
                num++;
                that.forUpload(arr, file, data, num, end, name);
              }
            } else {
              that.loadingInstance.close();
            }
          },
          errorFun: function (error_val, status, headers, error_obj) {
            that.loadingInstance.close();
          }
        });
      },
      //上传课件到服务器
      uploadCourse(data, filesize, name){
        var that = this, ajaxData;
        ajaxData = {
          title: data.data.origin_filename,
          url: data.data.url,
          file_size: filesize,
          extension: name
        }
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/uploadFile',
            method: 'POST',
            data: ajaxData,
          },
          successFun(res) {
            that.loadingInstance.close();
            if (res.status) {
              ajaxData.id = res.data.id
              that.shareDocs.unshift(ajaxData);
              that.$message.success('上传成功!');
              window.nim.publishEvent({
                type: 1,   //传入1即可。
                value: 10003, //value为10000以上(1-9999为云信预定义值，开发者不可使用)
                custom: 'hello world',
                vaildTime: 60,
                sync: true,
                done: that.publishEventDone
              });
            } else {
              that.$message.error(res.error_msg);
            }
          },
          errorFun(error) {
            global.close();
          },
        })
      },
      //删除课件
      deleteCourse(item, index){
        var that = this, ajaxData;
        that.loadingInstance = this.$loading({target: '.home_main_down', background: '#fff', text: '删除中...'});
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/deApplyFile',
            method: 'POST',
            data: {
              id: item.id
            },
          },
          successFun(res) {
            that.loadingInstance.close();
            if (res.status) {
              that.shareDocs.splice(index, 1);
              that.$message.success('删除成功');
              window.nim.publishEvent({
                type: 1,   //传入1即可。
                value: 10003, //value为10000以上(1-9999为云信预定义值，开发者不可使用)
                custom: 'hello world',
                vaildTime: 60,
                sync: true,
                done: that.publishEventDone
              });
            } else {
              that.$message.error(res.error_msg);
            }
          },
          errorFun(error) {
            that.loadingInstance.close();
          },
        })
      },
      //改变录制状态
      recordChecked(data){
        var that = this;
        global.open();
        global.ajax({
          data: {
            url: '/schoolapi/zbpc/isTranscribe',
            method: 'POST',
            data: {
              aid: that.data.id,
              status: data ? 1 : 0
            }
          },
          successFun(res){
            global.close();
            if (data) {
              that.$message.success('开始录制!');
            } else {
              that.$message.success('关闭录制!');
            }
          },
          errorFun(err){
            global.close();
          }
        })
      },
      //退出登录
      logout(){
        if (this.play_status == 1 || this.play_status == 2) {
          this.$message.error('直播中不可退出登录!');
          return;
        }
        sessionStorage.clear();
//        this.replaceUrl('login');
        window.location.replace(location.origin + '/login');
      }
    },
    watch: {},
    components: {
      chatroom,
      whiteBoard,
      VueQr
    },
    filters: {
      expiresTime(date) {
        var day, hr, min, sec;
        var that = this;
        day = parseInt(date / 60 / 60 / 24)
        hr = parseInt(date / 60 / 60 % 24)
        min = parseInt(date / 60 % 60)
        sec = parseInt(date % 60)
        if (day == 1) {
          hr += 24;
        }
        hr = hr < 10 ? "0" + hr : hr;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        var time = hr + ':' + min + ':' + sec;
        if (date <= 0) {
          time = '00:00:00';
        }
        return time;
      },
      //字节转换
      change(limit){
        var size = "";
        if (limit < 0.1 * 1024) {                            //小于0.1KB，则转化成B
          size = limit.toFixed(2) + "B"
        } else if (limit < 0.1 * 1024 * 1024) {            //小于0.1MB，则转化成KB
          size = (limit / 1024).toFixed(2) + "KB"
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {        //小于0.1GB，则转化成MB
          size = (limit / (1024 * 1024)).toFixed(2) + "MB"
        } else {                                            //其他转化成GB
          size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
        }

        var sizeStr = size + "";                        //转成字符串
        var index = sizeStr.indexOf(".");                    //获取小数点处的索引
        var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
        if (dou == "00") {                                //判断后两位是否为00，如果是则删除00
          return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
        }
        return size;
      },
    },
    beforeDestroy() {
      clearInterval(this.timer);
      clearInterval(this.startTimer);
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../assets/style/tools";

  .home_page {
    width: 100%;

    .home_header {
      width: 100%;
      height: pxTorem(90px);
      background-color: #fff;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;

      .home_header_user {
        width: pxTorem(360px);
        height: 100%;
        /*padding-left: pxTorem(35px);*/
        border-right: pxTorem(1px) solid #D3D5DD;

        .header_user_img {
          width: pxTorem(60px);
          height: pxTorem(60px);
          border-radius: 50%;
          overflow: hidden;
          /*margin-right: pxTorem(10px);*/
        }

        .header_user_text {
          align-items: flex-start;

          p {
            text-align: left;
            font-size: pxTorem(16px);
          }

          p:nth-child(2) {
            font-size: pxTorem(12px);
          }
        }

        .header_user_share {
          width: pxTorem(90px);
          height: pxTorem(36px);
          border-radius: pxTorem(18px);
          border: pxTorem(1px) solid #D3D5DD;
          font-size: pxTorem(16px);
        }
      }

      .home_header_title {
        flex: auto;
        height: 100%;

        .home_header_title_center {
          /*width: auto;*/
          height: 100%;
          padding-left: pxTorem(40px);
        }

        .home_header_title_img {
          width: pxTorem(60px);
          height: pxTorem(60px);
        }

        .home_header_title_text {
          font-size: pxTorem(30px);
        }

        .home_header_title_icon {
          border-radius: pxTorem(10px) 0 pxTorem(10px) 0;
          background-color: #4567EB;
          padding: pxTorem(4px) pxTorem(9px);
          color: #fff;
          font-size: pxTorem(12px);
          transform: translateY(pxTorem(2px));
        }
      }
    }

    .home_main {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      align-items: flex-start;
      /*justify-content: center;*/
      flex-direction: row;
      padding-top: pxTorem(90px);

      .home_main_left {
        width: pxTorem(360px);
        border-right: pxTorem(1px) solid #D3D5DD;
        /*display: inline-block;*/
        flex: none;

        .home_main_left_top {
          width: 100%;
          height: pxTorem(600px);
          background-color: #fff;
          position: relative;

          .home_main_down {
            width: 100%;

            .home_main_downMain {
              /*width: 100%;*/
              padding: 0 pxTorem(35px);
              height: pxTorem(72px);
              background-color: #EAEBF0;
              display: flex;
              display: -webkit-flex;
              align-items: flex-start;
              justify-content: center;
              flex-direction: column;

              p:nth-child(1) {
                font-weight: bold;
                font-size: pxTorem(14px);
              }

              p:nth-child(2) {
                font-size: pxTorem(12px);
              }
            }

            .home_main_downLoad {
              width: 100%;
              max-height: pxTorem(300px);
              overflow-y: auto;

              .home_main_downItem {
                padding: 0 pxTorem(20px);
                height: pxTorem(50px);
                border-bottom: pxTorem(1px) solid #E1E2E9;
              }
            }

            .home_main_downBut {

              p {
                width: pxTorem(90px);
                height: pxTorem(36px);
                background-color: #4567EB;
                color: #fff;
                text-align: center;
                line-height: pxTorem(36px);
                border-radius: pxTorem(18px);
                font-size: pxTorem(12px);
                position: relative;

                input {
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  position: absolute;
                  left: 0;
                  right: 0;
                }
              }
            }
          }

          .home_main_tools {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);

            p {
              width: pxTorem(289px);
              height: pxTorem(56px);
              border: pxTorem(1px) solid #D3D5DD;
              border-radius: pxTorem(28px);

              &.home_main_tools_wendang {
                background-color: #4567EB;
                color: #fff;
                border: 0;
              }
            }
          }
        }

        .home_main_left_bot {
          width: 100%;
          height: pxTorem(260px);
          background-color: #ebeaef;

          .home_main_counter {
            font-size: pxTorem(14px);
            font-weight: bold;
          }

          .home_main_start {
            width: 100%;

            .play {
              width: pxTorem(300px);
              height: pxTorem(56px);
              border-radius: pxTorem(28px);
              /*border: pxTorem(1px) solid #D3D5DD;*/
              background-color: #C6C8CF;
              font-size: pxTorem(16px);
              color: #fff;

              &.start {
                background-color: transparent;
                background-image: $colorLineBul;
              }
            }

            .playAoud {
              width: pxTorem(138px);
              height: pxTorem(56px);
              border-radius: pxTorem(28px);
              border: pxTorem(1px) solid #D3D5DD;
              background-color: #fff;
              font-size: pxTorem(14px);
            }

            .playAoudStart {
              width: pxTorem(138px);
              height: pxTorem(56px);
              border-radius: pxTorem(28px);
              background-image: $colorLineBul;
              font-size: pxTorem(14px);
              color: #fff;
            }
          }

          .home_main_but {

            p {
              width: pxTorem(138px);
              height: pxTorem(56px);
              border-radius: pxTorem(28px);
              border: pxTorem(1px) solid #D3D5DD;
              background-color: #fff;
              font-size: pxTorem(14px);
            }

            .home_main_but_slider {
              position: absolute;
              top: 0;
              left: 50%;
              transform: translate(-50%, -100%);
              background-color: #fff;
              padding: pxTorem(10px) 0;
            }
          }
        }
      }

      .home_main_center {
        width: pxTorem(1200px);
        height: pxTorem(860px);
        /*display: inline-block;*/
        background-color: #6F7077;
        flex: none;

        .home_main_center_bodyer {
          width: 100%;
          height: 100%;

          #container {
            width: 100%;
            height: pxTorem(677px);
            background-color: #000;
            background-size: contain;
            -webkit-background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            /*background-image: url('../../static/imgs/share.png');*/
          }
        }
      }

      .home_main_right {
        /*display: inline-block;*/
        flex: auto;
      }
    }

    .line {
      border-right: pxTorem(1px) solid #999;
    }
  }
</style>