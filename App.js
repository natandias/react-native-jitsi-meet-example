import React, {useState, useEffect} from 'react';
import {Text, Button} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function App() {
  /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
  /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */

  const [isMeetOpened, setIsMeetOpened] = useState(false);

  const callUrl = 'https://meet.jit.si/vamostestarojitsi';
  const userInfo = {
    displayName: 'React-Native',
    email: 'user@example.com',
    avatar: 'https://static.anime21.blog.br/2019/05/02-3.jpg',
  };

  const startCall = () => {
    setIsMeetOpened(true);
    JitsiMeet.call(callUrl, userInfo);
  };

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    setIsMeetOpened(false);
    JitsiMeet.endCall();
    console.log('onConferenceTerminated');
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log('onConferenceJoined');
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log('onConferenceWillJoin');
  }
  return (
    <>
      {!isMeetOpened ? (
        <>
          <Text>Teste</Text>
          <Button
            onPress={startCall}
            title="Entrar na reunião do Jitsi"
            color="#841584"
            accessibilityLabel="Entrar na reunião do Jitsi"
          />
        </>
      ) : (
        <JitsiMeetView
          onConferenceTerminated={e => onConferenceTerminated(e)}
          onConferenceJoined={e => onConferenceJoined(e)}
          onConferenceWillJoin={e => onConferenceWillJoin(e)}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
        />
      )}
    </>
  );
}
export default App;
