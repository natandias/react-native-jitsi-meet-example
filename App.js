import React, {useEffect, useState} from 'react';
import {Text, Button, TextInput, StyleSheet} from 'react-native';
import VideoCall from './VideoCall';

function App() {
  const [isMeetOpened, setIsMeetOpened] = useState(false);

  const [callUrl, setCallUrl] = useState('');
  const [username, setUsername] = useState('');
  const userInfo = {
    displayName: username,
    avatar: 'https://static.anime21.blog.br/2019/05/02-3.jpg',
  };

  const startCall = () => setIsMeetOpened(true);
  const endCall = () => setIsMeetOpened(false);

  useEffect(() => console.log('isMeetOpened', isMeetOpened), [isMeetOpened]);

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

          <Button
            onPress={startCall}
            title="Entrar na reunião do Jitsi"
            color="#841584"
            accessibilityLabel="Entrar na reunião do Jitsi"
            disabled={!callUrl || !username}
          />
        </>
      ) : (
        <VideoCall
          isOpen={isMeetOpened}
          url={callUrl}
          userInfo={userInfo}
          closeCall={endCall}
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
