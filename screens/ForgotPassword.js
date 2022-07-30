import { View, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from "@kaloraat/react-native-text";
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resetCode, setResetCode] = useState("");

  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true)
    if (!email) {
        alert("Email is required")
        setLoading(false)
        return
    }
    try {
        const { data } = await axios.post("/forgot-password", {
            email
        })

        if (data.error) {
          alert(data.error)
          setLoading(false)
        } else {
          setLoading(false)
          setVisible(true)
          console.log("RESET PASSWORD RES => ", data);
          alert("Enter the password reset code we sent in your email")
        }
    } catch (error) {
        alert("Error sending email. Try again.")
        console.log(error);
    }
  }

  const handlePasswordReset = async () => {
    console.log("HANDLE PASSWORD RESET -> ", email, password, resetCode);
    try {
      const { data } = await axios.post('/reset-password', {
        email,
        password,
        resetCode
      })
      console.log("RESET PASSWORD => ", data);
      if (data.error) {
        alert(data.error)
        setLoading(false)
      } else {
        alert("Now you can login with your new password");
        navigation.navigate('Signin');
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
      alert('Password reset failed. Try again.')
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
        <Text title center style={{ marginBottom: 50 }}>
            Forgot Password
        </Text>
        <UserInput 
          name="EMAIL" 
          value={email} 
          setValue={setEmail} 
          autoCompleteType="email"
          keyboardType="email-address"
        />
        
        {
          visible && (
            <>
              <UserInput 
                name="NEW PASSWORD" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
                autoCompleteType="password"
              />

              <UserInput 
                name="PASSWORD RESET CODE" 
                value={resetCode} 
                setValue={setResetCode} 
                secureTextEntry={true}
              />
            </>
          )
        }

        <SubmitButton 
          title={visible ? "Reset Password" : "Request Reset Code"} 
          handleSubmit={visible ? handlePasswordReset : handleSubmit} 
          loading={loading}
        />

        <Text 
          onPress={() => navigation.navigate("Signin")} 
          small center color="orange" style={{ marginTop: 10 }}>
            Sign In
        </Text>

        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword