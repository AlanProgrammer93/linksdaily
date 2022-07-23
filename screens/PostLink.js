import { SafeAreaView, ScrollView, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from "@kaloraat/react-native-text";
import SubmitButton from '../components/auth/SubmitButton';
import FooterTabs from '../components/nav/FooterTabs';
import ogs from '@uehreka/open-graph-scraper-react-native';
import urlRegex from 'url-regex';
import PreviewCard from '../components/links/PreviewCard';
import axios from 'axios'
import { LinkContext } from "../context/link"

const PostLink = ({ navigation }) => {
  const [links, setLinks] = useContext(LinkContext);

  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [urlPreview, setUrlPreview] = useState({})

  const handleChange = async (text) => {
    try {
        setLoading(true);
        setLink(text)

        if (urlRegex({ strict: false }).test(text)) {
          ogs({ url: text }, (error, results, response) => {
            console.log(results);
            if (results.success) {
              setUrlPreview(results)
            }
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!link || !title) {
      alert("Paste url and give it a nice title")
      return
    }

    try {
      const {data} = await axios.post("/post-link", {
        link,
        title,
        urlPreview
      });
      console.log(data);
      setLinks([data, ...links]);
      setTimeout(() => {
        alert("Link posted");
        navigation.navigate("Home");
      }, 500)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        <TextInput 
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder="Give it a title"
          autoCapitalize='sentences'
          style={{
            borderWidth: 1,
            borderColor: "grey",
            height: 50,
            marginVertical: 10,
            marginHorizontal: 15,
            borderRadius: 30,
            padding: 15,
          }}
        />

        {
          urlPreview.success && (
            <View
              style={{
                marginTop: 30,
                alignItems: "center"
              }}
            >
              <PreviewCard {...urlPreview} />
            </View>
          )
        }

        <View style={{ paddingTop: 25 }}>
          <SubmitButton 
            title="Submit" 
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </View>
      </ScrollView>

      <FooterTabs />
    </SafeAreaView>
  )
}

export default PostLink