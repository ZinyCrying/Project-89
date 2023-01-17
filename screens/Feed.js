import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { FlatList, Platform, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from './PostCard'


export default class CreateStory extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded : false,
      light_theme : false,
      posts : []
    };
  }

  async _loadFontsAsync(){
    await Fonts.loadAsync(customFonts);
    this.setState({fontsLoaded : true});
  }

  componentDidMount(){
    this._loadFontsAsync();
    this.fetchStories();
  }

  fetchPosts(){
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ posts: posts });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  renderItem = ({item:post}) => {
     return <PostCard post={post} navigation={this.props.navigation}/>;
  }

  keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={!this.state.light_theme ? styles.containerLight : styles.container }>
        <SafeAreaView style = {styles.droidSafeArea}/>
        <View style = {styles.appTitle}>
          <View style = {styles.appIcon}>
            <Image 
            source={require('../assets/logo.png')} 
            style={styles.iconImage}></Image>
          </View>
          <View style = {styles.appTitleTextContainer}>
            <Text style = {!this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Spectagram</Text>
          </View>
          <View style ={styles.cardContainer}>
            <FlatList
            keyExtractor={this.keyExtractor}
            data={posts}
            renderItem={this.renderItem}
            />
          </View>
          <TouchableOpacity
             onPress={this.navigation.navigate}>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
},
containerLight: {
    flex: 1,
    backgroundColor: "black"
},
droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
},
appTitle: {
    flex: 0.07,
    flexDirection: "row"
},
appIcon: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
},
iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
},
appTitleTextContainer: {
    flex: 0.8,
    justifyContent: "center"
},
appTitleText: {
    color: "white",
    fontSize: RFValue(28),
},
appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28)
},
cardContainer: {
    flex: 0.85
}

});