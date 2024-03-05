import { View, Text, Image, StatusBar, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {FadeInUp, FadeInDown} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearErrors, login } from "../actions/AuthAction";

export default function LoginScreen() {

  const disableCLick = useRef(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isAuthenticated, user, error} = useSelector(state => state.auth);

  const [confidential, setConfidential] = useState({email: '', password: ''});

  const inputConfidential = (item, value) => {
    const input_value = item === 'email' ? {email: value} : {password: value};
    setConfidential(confidential => ({
      ...confidential,
      ...input_value
    }))
  }

  const enableClick = (value) => {
    if (value.length >= 8) {
      disableCLick.current = false;
    } else {
      disableCLick.current = true;
    }
  }

  const gotoMsgScreen = () => {
    if (isAuthenticated) {
      navigation.push('MessageScreen');
    } else {
      dispatch(clearErrors());
    }
  }

  useEffect(gotoMsgScreen, [dispatch, isAuthenticated, user, error]);

  const handleAuth = () => {
    dispatch(login(confidential.email, confidential.password));
  }

  return (
    <View className="bg-white w-full h-full">
      <StatusBar style="light" />
      <Image className="h-full w-full absolute" source={require('../assets/background.png')} />

      {/* light */}
      <View className="absolute flex-row justify-around w-full">
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-255 w-90" source={require('../assets/light.png')} />
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/light.png')} />
      </View>

      {/* title and form */}

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-4xl">
            Portfolio Messager
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder="Email" placeholderTextColor={'grey'} onChangeText={text => inputConfidential('email', text)}/>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput placeholder="Password" placeholderTextColor={'grey'} secureTextEntry 
              onChangeText={text => {
                inputConfidential('password', text);
                enableClick(text);
              }}/>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full">
            <TouchableOpacity 
              className={`w-full p-3 rounded-2xl ${disableCLick.current ? 'bg-gray-400' : 'bg-blue-400'} items-center`}
              disabled={disableCLick.current}
             >
              <Text className="font-bold text-white text-lg" onPress={handleAuth}>
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  )
}