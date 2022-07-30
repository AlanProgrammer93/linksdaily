import { Image, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Text from "@kaloraat/react-native-text";
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/auth';
import { LinkContext } from '../context/link';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Divider } from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

dayjs.extend(relativeTime);

const Profile = ({ navigation }) => {
    const [auth, setAuth] = useContext(AuthContext);
    const [links, setLinks] = useContext(LinkContext);

    const [userProfile, setUserProfile] = useState({});
    const [userLinks, setUserLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const routeParamsId = route?.params?._id;

    useEffect(() => {
        const fetchUserProfile = async (userId) => {
            try {
                const { data } = await axios.get(`/user-profile/${userId}`);
                setUserProfile(data.profile);
                setUserLinks(data.links);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        routeParamsId 
            ? fetchUserProfile(routeParamsId) 
            : fetchUserProfile(auth.user._id);
    }, [])

    const handleDelete = async (linkId) => {
        try {
            const { data } = await axios.delete(`/link-delete/${linkId}`);
            setUserLinks(links => {
                const index = userLinks.findIndex(l => l._id === linkId);
                userLinks.splice(index, 1);
                return [...links];
            });

            setLinks(links => {
                const index = links.findIndex(l => l._id === linkId);
                links.splice(index, 1);
                return [...links];
            });
            alert("Deleted successfully!");
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    }

    if (loading) {
        return (
            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff"
                }}
            >
                <Image 
                    source={require("../assets/loading.gif")}
                    style={{ height: 100, width: 100 }}
                />
            </View>
        )
    }

    return (
        <ImageBackground
            source={require("../assets/blur.jpeg")}
            style={{ flex: 1, height: "100%" }}
            resizeMode="cover"
            blurRadius={5}
        >
            <Text 
                large 
                light 
                center 
                style={{ 
                    color: "#fff", 
                    paddingTop: 60, 
                    paddingBottom: 10,
                    fontSize: 40,
                }}
            >
                Profile
            </Text>

            <SafeAreaView>
                <View
                    style={{
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                >
                    <Image 
                        source={{ 
                            uri: userProfile?.image?.url 
                                ? userProfile.image.url 
                                : `https://via.placeholder.com/500x500.png?text=${userProfile?.name?.charAt(0)}` 
                        }}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 50
                        }}
                    />
                    <Text large color="#ccc" style={{ paddingTop: 10 }}>
                        {userProfile.name}
                    </Text>
                    <Text color="#b3b3b3" style={{ paddingTop: 10 }}>
                        {userProfile.role}
                    </Text>
                    <Text tiny color="#b3b3b3" style={{ paddingTop: 10 }}>
                        Joined {dayjs(userProfile.createdAt).fromNow()}
                    </Text>
                </View>

                <Divider />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text bold medium center color="#b3b3b3">
                        {userLinks.length} Links
                    </Text>

                    {userLinks.map(link => (
                        <View 
                            key={link._id}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 20
                            }}
                        >
                            <Text color="#ccc">{link?.urlPreview?.ogTitle}</Text>
                            <View 
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text color="#ccc">{link?.views} Views</Text>
                                {auth?.user?._id === link?.postedBy._id && (
                                <TouchableOpacity onPress={() => handleDelete(link._id)}>
                                    <FontAwesome5Icon name='trash' color="#ff9900" />
                                </TouchableOpacity>)}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Profile