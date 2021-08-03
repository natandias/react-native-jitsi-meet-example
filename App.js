import React, {useState} from 'react';
import {Text, Button, TextInput, StyleSheet} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function App() {
  /* Você também pode usar o JitsiMeet.audioCall (url) para chamadas apenas de áudio */
  /* Você pode terminar programaticamente a chamada com JitsiMeet.endCall () */

  const [isMeetOpened, setIsMeetOpened] = useState(false);

  const [callUrl, setCallUrl] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const userInfo = {
    displayName: username,
    email: email,
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
          <Text>Teste do Jitsi Meet</Text>

          <TextInput
            style={styles.input}
            onChangeText={setCallUrl}
            value={callUrl}
            placeholder="Link da chamada"
          />

          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Nome de usuário"
          />

          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />

          <Button
            onPress={startCall}
            title="Entrar na reunião do Jitsi"
            color="#841584"
            accessibilityLabel="Entrar na reunião do Jitsi"
            disabled={!callUrl || !username || !email}
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
