import { View, TextInput } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Search = ({ value, setValue }) => {
  return (
    <View>
      <TextInput 
        style={{
            height: 50,
            paddingHorizontal: 20,
            marginHorizontal: 15,
            marginTop: 20,
            borderRadius: 50,
            borderWidth: 5,
            borderColor: "#d9d9d9",
            backgroundColor: "#e6e6e6"
        }}
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Search"
        autoCapitalize='none'
      />
    </View>
  )
}

export default Search