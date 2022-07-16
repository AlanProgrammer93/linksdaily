import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from "@kaloraat/react-native-text";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider } from '@rneui/themed';

export const Tab = ({ text, name, handlePress, screenName, routeName }) => {
  const activeScreenColor = screenName === routeName && "orange";

  return (
    <TouchableOpacity onPress={handlePress}>
      <FontAwesome5
        name={name}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
        color={activeScreenColor}
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

const FooterTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <>
      <Divider width={1} />
      <View style={{
        flexDirection: "row",
        margin: 10,
        marginHorizontal: 30,
        justifyContent: "space-between",
      }}>
        <Tab
          text="Home"
          name="home"
          handlePress={() => navigation.navigate("Home")}
          screenName="Home"
          routeName={route.name}
        />
        <Tab
          text="Post"
          name="plus-square"
          handlePress={() => navigation.navigate("PostLink")}
          screenName="PostLink"
          routeName={route.name}
        />
        <Tab
          text="Links"
          name="list-ol"
          handlePress={() => navigation.navigate("Links")}
          screenName="Links"
          routeName={route.name}
        />
        <Tab
          text="Account"
          name="user"
          handlePress={() => navigation.navigate("Account")}
          screenName="Account"
          routeName={route.name}
        />
      </View>
    </>
  )
}

export default FooterTabs