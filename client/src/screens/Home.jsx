import React from 'react'
import Chat from '../screens/Chat';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage} from 'react-native';
import io from "socket.io-client";


const PORT = process.env.PORT || 3001
const socket = io.connect(`http://localhost:${PORT}`);
//const socket = io.connect(`https://livechat-egce.onrender.com`); //live server

const Home = ({navigation}) => {
    const [username, setUsername] =  React.useState("");
    const [room, setRoom] =  React.useState("");
    const [showChat, setShowChat] =  React.useState(false);
    
    const joinRoom = () =>{
      if(username !== "" && room !==""){
        AsyncStorage.setItem("MyName", "Piero")
        socket.emit("join_room", room);
        setShowChat(true);
        console.warn("Entered room: " + room)
      } 

    }

  return (
    <>
      {!showChat ? (
            <View style={styles.container}>
              <Text style={styles.Title}>Join a Chat</Text>
              <TextInput value={username} style={styles.Inputs} placeholder='User...'  onChangeText={(text) => {setUsername(text)}}/>
              <TextInput value={room} style={styles.Inputs} placeholder='RoomID' onChangeText={(text) => {setRoom(text)}}/>
              <Button  style={styles.Button} color="#f194ff" title="Enter" onPress={joinRoom}/>
              <StatusBar style="auto" />
            </View>
        ): (
          <Chat setShowChat={setShowChat} socket={socket} username={username} room={room}/>
        )}
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Inputs: {
      width: 100,
      marginBottom: 20
    },
    Title: {
      fontSize: 20,
      marginBottom: 20
    },
    Button:{
      width: 100,
    }
  });
  
export default Home;