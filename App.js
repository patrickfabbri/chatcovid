/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @param 
 */



import "react-native-get-random-values";
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  KeyboardAvoidingView,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';

import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler
} from './backButton';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';

import SplashScreen from 'react-native-splash-screen';

import AppIntroSlider from 'react-native-app-intro-slider';

import LoginScreen from 'react-native-login-screen';

const data = [
  {
    title: 'Einstein Conecta',
    text: 'O Einstein Conecta é um aplicativo do Hospital Israelita Albert Einstein desenvolvido para te ajudar com orientações médicas do dia a dia.',
    image: require('./assets/icons/medica1.png'),
    bg: '#59b2ab',
  },
  {
    title: 'Várias especialidades',
    text: 'Atendimento acessível a qualquer hora e em qualquer lugar para problemas do dia a dia.',
    image: require('./assets/icons/medica21.jpg'),
    bg: '#febe29',
  },
  {
    title: 'Feito pra você',
    text: "Atendimento 24 horas por dia, 7 dias por semana na palma da sua mão.",
    image: require('./assets/icons/medica3.png'),
    bg: '#22bcb5',
  },
];

const WebVIEW: () => React$Node = () => {

  // return (
  //   <>


  //   </>
  // );
};



SplashScreen.hide();

class App extends React.Component {

  state = {
    page: 1,
    visible: true
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#009688"
        size={80}
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  showSpinner() {
    console.log('Show Spinner');
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({ visible: false });
  }

  _renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={{ width: '100%', height: '100%', opacity: 0.6 }}>
        <View style={styles.slide}>

          <View
            style={[
              styles.slide,
              {
                backgroundColor: item.bg,
              }
            ]}>
            <View style={{ width: '90%', height: '100%', justifyContent: 'center' }}>
              <Text style={styles.title}> {item.title} </Text>
              <Text style={styles.text}>{item.text}</Text>
              {/* <Image source={item.image} style={styles.image} /> */}


            </View>
          </View>

        </View>
      </ImageBackground>
    );
  };

  _keyExtractor = (item) => item.title;

  _renderPagination = (activeIndex) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? { backgroundColor: 'white' }
                      : { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
                  ]}
                  onPress={() => this.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#023e3f' }]} onPress={() => this.setState({ page: 2 })}>
              <Text style={styles.buttonText} >Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.setState({ page: 2 })}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  _handleAndroidBackButton = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      callback();
      return true;
    });
  };

  componentDidMount() {
    handleAndroidBackButton(() => this.setState({ page: this.state.page - 1 }));
  }
  componentWillUnmount() {
    removeAndroidBackButtonHandler();
  }

  render() {

    return (
        (this.state.page == 1) ? (
        <View style={{ flex: 1 }}>
          <StatusBar translucent backgroundColor="transparent" />
          <AppIntroSlider
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            renderPagination={this._renderPagination}
            data={data}
          />
        </View>
        ) :
          (this.state.page == 2) ? (
            <LoginScreen onPressLogin={() => this.setState({ page: 3 })} />       
          ) :
            (this.state.page == 3) ?
              (

        <KeyboardAvoidingView behavior={Platform.select({ ios: "position", android: "height" })}
          enabled
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={Platform.select({ ios: offset, android: 300 })}
          style={{ flexGrow: 1 }}>

          <StatusBar barStyle="dark-content" />
          <WebView
            style={styles.WebViewStyle}
            source={{ uri: 'https://covidein.azurewebsites.net' }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            //View to show while loading the webpage
            renderLoading={this.ActivityIndicatorLoadingView}
            //Want to show the view or not
            startInLoadingState={true}
          />
        </KeyboardAvoidingView>
              ) :
              (null)
        
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 1000
  },
  scrollView: {
    backgroundColor: Colors.lighter
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    fontSize: 16,
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'

  },
  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center'

  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },


});

export default App;
