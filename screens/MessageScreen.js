import { ScrollView, View, Text, RefreshControl, TouchableOpacity } from "react-native";
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import firebaseApp from "../firebase/config";

export default function MessageScreen() {
  const [dataFetch, setDataFetch] = useState(false);
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(true);
    getDocs(collection(db,'messages'))
      .then(allMsg => handleMessages(allMsg))
      .catch(error => console.error('Error: ', error))
    setTimeout(() => {
      setRefresh(false);
    }, 2000)
  }

  const handleMessages = (allMsg) => {
    const messagesData = [];
    allMsg.forEach(doc => {
      messagesData.push(doc.data());
    });
    setMessages(messagesData);
    setDataFetch(true); // Mark dataFetch as true after fetching data
  }

  const db = getFirestore(firebaseApp);

  const getAllMsg = () => {
    if (!dataFetch) {
      getDocs(collection(db, 'messages'))
        .then(allMsg => handleMessages(allMsg))
        .catch(error => console.error('Error: ', error.messages));
    }
  }

  useEffect(getAllMsg, []);

  return (
    <ScrollView className="bg-gray-800" refreshControl={
      <RefreshControl refreshing={refresh} onRefresh={handleRefresh}/>
    }>
      {messages.map((message, index) => (
        <View key={index} className="bg-blue-200 mt-4 mx-5 rounded-2xl">
          <View  className="flex-row flex justify-around items-center">
            <View className="py-3 pl-3">
              <Text>
                Name: {`${message.firstName} ${message.lastName}`}
              </Text>
              <Text>
                Email: {message.email}
              </Text>
              <Text>Phone: {message.phone}</Text>
              <Text>Message: {message.message}</Text>
            </View>
            <View className="bg-red-500 py-3 px-4 rounded-lg">
              <TouchableOpacity className="justify-center items-center">
                <Text className="text-white font-semibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
