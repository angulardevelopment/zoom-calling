import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from "@zoomus/websdk";
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk
@Component({
  selector: 'app-zoom-basic',
  templateUrl: './zoom-basic.component.html',
  styleUrls: ['./zoom-basic.component.scss']
})
export class ZoomBasicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
// console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));


  }

  getSignature() {
    const meetingNumber = '12345';
    const apiKey = 'pgl-ugf3QLubAI30B5EBag'
    const meetingConfig = {signature: '', apiKey: ''};

    const signature = ZoomMtg.generateSignature({
      meetingNumber,
      apiKey ,
      apiSecret: 'TeOVSOTTEyzK2RuQ2eFI7pctZet0YHiKJxxf',
      role: '1',
      success: (res) => {
        meetingConfig.signature = res.result;
        meetingConfig.apiKey = apiKey;
        this.startMeeting(res.result, meetingNumber);
          //     const joinUrl = "/meeting.html?" + testTool.serialize(meetingConfig);
  //     window.open(joinUrl, "_blank");
      }
    });
  }

  startMeeting(signature, meetingNumber){

    document.getElementById('zmmtg-root').style.display = 'block';
    ZoomMtg.init({
      leaveUrl: 'http://localhost:4200/',
      // isSupportAV: true,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: 'test1',
          apiKey: 'pgl-ugf3QLubAI30B5EBag',
          // userEmail: this.userEmail,
          // passWord: meetingPassword,

          success: (success) => {
            console.log(success)
            console.log("join meeting success");
            console.log("get attendeelist");
            ZoomMtg.getAttendeeslist({});
            ZoomMtg.getCurrentUser({
              success: function (res) {
                console.log("success getCurrentUser", res.result.currentUser);
              },
            });
            this.zoomEvents();
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  zoomEvents(){
    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('inMeetingServiceListener onUserJoin', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('inMeetingServiceListener onUserLeave', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });

    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      console.log('inMeetingServiceListener onMeetingStatus', data);
    });
  }

}
