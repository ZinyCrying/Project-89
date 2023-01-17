import * as  React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Alert, TextInput } from 'react-native';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from  'expo-fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppLoading from 'expo-app_loading';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        email: "",
        password: "",
        fontsLoaded: false,
        userSignedIn: false,
        isEnabled: false,
        light_theme: false  
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
}

componentDidMount() {
    this._loadFontsAsync();
}

signIn = async (email, password) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            this.props.navigation.replace("Dashboard");
        })
        .catch(error => {
            Alert.alert(error.message);
        });
};


signInWithGoogleAsync = async () => {}


  render() {
    if(!this.state.fontsLoaded){
        return <AppLoading/>
    } else {
        return (
            <View
            style = {{
                flex:1,
                justfityContent: "center",
                alignItems: "center"
            }}>
              <Button
              title = "Sign In with Google"
              onPress = {()=> this.signInWithGoogleAsync()}></Button>
            </View>
        )
    }
    const {email, password} = this.state;
    return (
        <View style = {styles.container}>
            <SafeAreaView style = {styles.droidSafeArea}/>
           <View style = {styles.appTitle}>
            <Text style = {styles.appTitleText}>Spectagram</Text>
            <Image source = {require("../assets/logo.png")} style = {styles.appIcon}/>
           </View>
           <View style = {styles.buttonContainer}>
            <TouchableOpacity       
            style = {styles.button}
            onPress = {()=> this.signInWithGoogleAsync()}
            >
            <Text style = {styles.googleText}>Sign In with Google</Text>
            </TouchableOpacity>
           </View>
            <TextInput
            style = {styles.textinput}
            onChangeText = {text => this.setState({email:text})}
            placeholder = {"Enter Email"}
            placeholderTextColor = {"#FFFFFF"}
            autoFocus/>

            <TextInput 
            style = {[styles.textinput, {marginTop: 20}]}
            onChangeText = {text => this.setState({password:text})}
            placeholder = {"Enter Password"}
            placeholderTextColor = {"#FFFFFF"}
            secureTextEntry
            />

            <TouchableOpacity
            style = {[styles.button, {marginTop: 20}]}
            onPress = {() => this.signIn(email,password)}>
                <Text style = {styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={this.props.navigation.navigate("RegisterScreen")}>
                <Text style = {styles.buttonTextNewUser}>New User?</Text>
            </TouchableOpacity>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        marginBottom: RFValue(20)
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        borderColor: "#FFFFFF",
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: "#FFFFFF",
        backgroundColor: "#000000"
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#000000"
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#FFFFFF",
        textDecorationLine: 'underline'
    },
    appTitle: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center"
      },
      appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans"
      },
      buttonContainer: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
      },
      button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "white"
      },
      googleText: {
        color: "black",
        fontSize: RFValue(20),
        fontFamily: "Bubblegum-Sans"
      },

}) 
