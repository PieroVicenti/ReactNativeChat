import React from 'react'
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TextInput, View, Button, Pressable, ScrollView } from 'react-native';


const Chat = ({setShowChat, socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState([]);

    const LogOut  = async () => {
        setShowChat(false)
    }

    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
          
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
    }, [socket]);

  return (
    <View style={styles.ChatWindow}>
        <View style={styles.ChatHeader}>
            <Text style={styles.ChatHeaderText}>Users: </Text>
            <Ionicons name="home-outline" size={20} color="white" onPress={LogOut}/>
        </View>
        <View style={styles.ChatBody}>
        {messageList.map((messageContent) => {
            return (
                <ScrollView>
                <View className="message" id={username === messageContent.author ? "you" : "other"}>
                    <View>
                        <View className="message-content">
                            <Text>{messageContent.message}</Text>
                        </View>
                        <View className="message-meta">
                            <Text id="time">{messageContent.time}</Text>
                            <Text id="author">{messageContent.author}</Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
            );
        })}
        </View>
        <View style={styles.ChatFooter}>
            <TextInput value={currentMessage} placeholder='Hey...' style={styles.FooterInput} onChangeText={(text) => {setCurrentMessage(text)}}></TextInput>
            <Pressable style={styles.FooterButton} onPress={sendMessage}>
                <Text style={styles.text}>&#9658;</Text>
            </Pressable>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    logOut:{
        justifyContent: "flex-end",
        color: "white",
    },
    ChatWindow: {
      flex: 1,
      backgroundColor: 'whitesmoke',
      alignItems: 'center',
    },
    ChatHeader: {
      width: "100%",
      backgroundColor: 'black',
      borderRadius: 20,
      marginTop: '10%',
      borderWidth: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    ChatHeaderText:{
        color: 'white'
    },
    ChatBody:{
        height: "80%",
        top: "2%",
        width: "95%",
        borderRadius: 20,
        borderWidth: 2,
    },
    ChatFooter: {
        height: "30%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        top: "5%"
    },
    FooterInput: {
        height: "20%",
        width: "75%",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        left: "5%",
        borderRadius: 20,
        borderWidth: 2,
    },
    FooterButton: {
        width: "15%",
        height: "20%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        left: "5%",
        borderWidth: 2,
    }

  });
  
export default Chat;