import { ScrollView, View, Text } from "react-native";
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import firebaseApp from "../firebase/config";

export default function MessageScreen() {
  const [dataFetch, setDataFetch] = useState(false);
  const [messages, setMessages] = useState([]);

  const db = getFirestore(firebaseApp);

  const getAllMsg = () => {
    if (!dataFetch) {
      getDocs(collection(db, 'messages'))
        .then(allMsg => {
          const messagesData = [];
          allMsg.forEach(doc => {
            messagesData.push(doc.data());
          });
          setMessages(messagesData);
          setDataFetch(true); // Mark dataFetch as true after fetching data
        })
        .catch(error => console.error('Error: ', error.messages));
    }
  }

  useEffect(getAllMsg, []);

  return (
    <ScrollView>
      {messages.map((message, index) => (
        <View key={index} className="bg-slate-400 mt-4 mx-5 rounded-2xl">
          <View  className="py-3 pl-5">
            <Text>
              Name: {`${message.firstName} ${message.lastName}`}
            </Text>
            <Text>
              Email: {message.email}
            </Text>
            <Text>Phone: {message.phone}</Text>
            <Text>Message: {message.message}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}
