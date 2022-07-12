import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Text from "@kaloraat/react-native-text";
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../config';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    if (!name || !email || !password) {
      alert("All fields are required")
      setLoading(false)
      return
    }
    console.log(`${API}/signup`);
    console.log(name, email, password);
    try {
      const { data } = await axios.post(`${API}/signup`, {
        name, 
        email, 
        password
      })

      if (data.error) {
        alert(data.error)
        setLoading(false)
      } else {
        setLoading(false)
        console.log("SIGN UP SUCCESS => ", data);
        alert("Sign up successful")
      }
      //redirect
    } catch (error) {
      alert("Signup failed, Try again.")
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center"
    }}>
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        
        <Text title center>Sign Up</Text>

        <UserInput 
          name="NAME" 
          value={name} 
          setValue={setName} 
          autoCapitalize="words"
          autoCorrect={false}
        />
        <UserInput 
          name="EMAIL" 
          value={email} 
          setValue={setEmail} 
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput 
          name="PASSWORD" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry={true}
          autoCompleteType="password"
        />

        <SubmitButton 
          title="Sign Up" 
          handleSubmit={handleSubmit} 
          loading={loading}
        />

        <Text>
          Already Joined?{" "} 
          <Text onPress={() => navigation.navigate("Signin")} color="#ff2222">
            Sign In
          </Text>
        </Text>

        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup