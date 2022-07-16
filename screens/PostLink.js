import { SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import Text from "@kaloraat/react-native-text";

const PostLink = () => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (text) => {
    try {
        setLoading(true);
        setLink(text)
        setTimeout(() => {
            console.log("link pasted", link);    
        }, 1000);
    } catch (error) {
        console.log(error);
    }
  }

  const handleSubmit = () => {
    
}

  return (
    <SafeAreaView>
      <ScrollView>
        <Text light center style={{ paddingTop: 30 }}>
            PASTE WEBSITE URL
        </Text>

        <TextInput 
          value={link}
          onChangeText={text => handleChange(text)}
          placeholder="Paste the url"
          autoCapitalize='none'
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 30,
            marginHorizontal: 10,
            borderRadius: 30,
            padding: 15,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PostLink