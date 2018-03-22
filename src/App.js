import React from 'react';
import { StackNavigator } from 'react-navigation';
import CameraScreen from './Camera';
import ViewPhotos from './ViewPhotos';
import SelectedPhoto from './SelectedPhoto';
import KeywordSearch from './KeywordSearch';
import WaitingScreen from './Waiting';

const RootStack = StackNavigator(
  {
    Home: {
      screen: CameraScreen,
    },
    Waiting: {
      screen: WaitingScreen,
    },
    CameraRoll: {
      screen: ViewPhotos,
    },
    SelectedPhoto: {
      screen: SelectedPhoto,
    },
    KeywordSearch: {
      screen: KeywordSearch,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const App = () => <RootStack />;

export default App;
