import React from 'react';
import {View, StyleSheet, Text, Image,TouchableOpacity, Stylesheet, SafeAreaView, ScrollView} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class PostCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            light_theme: true,
            post_id: this.props.post.key,
            post_data: this.props.post.value
        };
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme
                this.setState({ light_theme: theme === "light" })
            })
    }

  render() {
    return (
        <View style = {!this.state.light_theme ? styles.containerLight : styles.container}>
            <SafeAreaView style = {styles.droidSafeArea}/>
            <View style = {!this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                <ScrollView>
                <View style = {!this.state.light_theme ? styles.authorContainerLight : authorContainer}>
                    <View style = {this.state.light_theme ? styles.authorImageContainerLight : authorImageContainer}>
                         <Image
                         source={require("../assets/profile_img.png")}
                         style = {this.state.light_theme ? styles.profileImageLight : styles.profileImage}> </Image>
                    </View>
                    <View style = {this.state.light_theme ? styles.authonNameContainerLight : styles.authorNameContainer}>
                        <Text style = {this.state.light_theme ? styles.authorNameTextLight : styles.authorNameText}>{this.props.post.author}</Text>
                    </View>
                </View>
                <Image source = {require("../assets/image_1.jpg")} style = {this.state.light_theme ? styles.postImageLight : styles.postImage}></Image>
                <View style = {this.state.light_theme ? styles.captionContainerLight : styles.captionContainer} >
                    <Text style = {this.state.light_theme ? styles.captionTextLight : styles.captionText}>{this.props.route.params.caption}</Text>
                </View>
                <View style = {this.state.light_theme ? styles.actionContainer : styles.actionContainer}>
                    <View style = { styles.likeButton}>
                        <Ionicons name = {"heart"} size = {RFValue(30)} color = {"white"}/>
                        <Text style = {styles.likeText}>12k</Text> 
                    </View>
                </View>
                </ScrollView>
            </View>
        </View>
    )
  }

}

const styles = Stylesheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20),
        padding: RFValue(20)
    },
    cardContainerLight: {
        margin: RFValue(13),

        backgroundColor: "white",
        borderRadius: RFValue(20),
        shadowColor: "rgb(0, 0, 0)",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: RFValue(0.5),
        shadowRadius: RFValue(5),
        elevation: RFValue(2),
        padding: RFValue(20)
    },
    authorContainer: {
        flex: 0.1,
        flexDirection: "row"
    },
    authorImageContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: RFValue(100)
    },
    authorNameContainer: {
        flex: 0.85,
        justifyContent: "center"
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20)
    },
    authorNameTextLight: {
        color: "black",
        fontSize: RFValue(20)
    },
    postImage: {
        marginTop: RFValue(20),
        resizeMode: "contain",
        width: "100%",
        alignSelf: "center",
        height: RFValue(275)
    },
    captionContainer: {},
    captionText: {
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    captionTextLight: {
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }

})