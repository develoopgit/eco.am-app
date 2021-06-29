import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Dimensions,
  BackHandler,
  Platform
} from 'react-native';
import {
  WebView
} from 'react-native-webview';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  }
})
export default class App extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    } else {
      BackHandler.addEventListener('hardwareBackPressCheckpointOverview', this.backPressed);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    } else {
      BackHandler.removeEventListener('hardwareBackPressCheckpointOverview', this.backPressed);
    }
  }

  render() {
    return ( <
      WebView startInLoadingState = {
        true
      }
      style = {
        {
          marginTop: 30,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }
      }
      allowsBackForwardNavigationGestures source = {
        {
          uri: 'https://eco.am'
        }
      }
      ref = {
        (webView) => {
          this.webView.ref = webView;
        }
      }
      onNavigationStateChange = {
        (navState) => {
          this.webView.canGoBack = navState.canGoBack;
        }
      }
      />
    );
  }
}