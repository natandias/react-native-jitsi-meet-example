import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

const VideoCall = ({isOpen, url, userInfo, closeCall}) => {
  /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
  /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */
  const [isCallStarted, setIsCallStarted] = useState(false);

  function startCall() {
    JitsiMeet.call(url, userInfo);
  }

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log('onConferenceTerminated');
    JitsiMeet.endCall();
    closeCall();
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onConferenceJoined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onConferenceWillJoin');
  }

  useEffect(() => {
    if (isOpen && !isCallStarted) {
      startCall();
      setIsCallStarted(false);
    }
  }, [isOpen]);

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <JitsiMeetView
        onConferenceTerminated={onConferenceTerminated}
        onConferenceJoined={onConferenceJoined}
        onConferenceWillJoin={onConferenceWillJoin}
        style={{flex: 1, height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default VideoCall;
