import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import Animbutton from './AnimButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  submitButton: {
    flex: 1,
    flexDirection: 'column',
  },
  wordButtonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
  },
  textContainerStyle: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 16,
    color: '#039BE5',
  },
});

export default class KeywordSearch extends Component {
  constructor(props) {
    super(props);

    const { imageRecognitionResult } = this.props;
    const recognitionWords = imageRecognitionResult.data.name;
    const splittedArray = recognitionWords.split(' ');
    const wordListWithBoolean = splittedArray.map(eachword => ({
      word: eachword,
      mode: true,
    }));

    this.state = {
      search: '',
      wordCheckList: wordListWithBoolean,
    };
  }

  onButtonPress = (index) => {
    const newWordList = [...this.state.wordCheckList];

    if (newWordList[index].mode) {
      newWordList[index].mode = false;
      this.setState({ wordCheckList: newWordList });
      return;
    }
    newWordList[index].mode = true;

    this.setState({ wordCheckList: newWordList });
  }

  onSubmitButtonPress = () => {
    let combinedWords = '';

    this.state.wordCheckList.forEach((eachPair) => {
      if (eachPair.mode) {
        combinedWords += `${eachPair.word} `;
      }
    });
    combinedWords += this.state.search;

    console.log(combinedWords);
    this.props.getSearchText(combinedWords);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainerStyle}>
          <Text style={styles.textStyle}>
            Keywords passed to Amazon
          </Text>
        </View>

        <TextInput
          style={styles.textinput}
          placeholder="Add some words to search if you want"
          onChangeText={text => this.setState({ search: text })}
        />

        <ScrollView>
          <View style={styles.wordButtonContainer}>
            {this.state.wordCheckList.map((eachPair, index) => (
              <Animbutton
                onColor="orange"
                effect="rubberBand"
                _onPress={status => this.onButtonPress(index)}
                text={eachPair.word}
                key={eachPair.word}
              />
            ))}
          </View>
        </ScrollView>

        <Text style={styles.imageAPIWordButton}>
          {`${this.state.wordCheckList.filter(eachPair =>
            eachPair.mode).map(eachPair =>
            eachPair.word).join(' ')} ${this.state.search}`}
        </Text>

        <View style={styles.submitButton}>
          <Button
            color="green"
            onPress={() => this.onSubmitButtonPress()}
            title="Submit"
          />
        </View>

      </View>
    );
  }
}

KeywordSearch.propTypes = {
  getSearchText: PropTypes.func.isRequired,
};
