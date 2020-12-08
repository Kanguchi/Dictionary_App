import * as React from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

class HomeScreen extends React.Component{
  constructor(){
      super();
      this.state={
          text: '',
          word: '',
          lexicalCategory: '',
          examples: [],
          definition: '',
          isSeatchPressed: false,
      }
  }
  getWord=(word)=>{
    var searchKeyword=word.toLowerCase();
    var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json';

    return fetch(url)
    .then((data)=>{
        if(data.status===200){
            return data.json()
        } else {
            return null
        }
    })
    .then((response)=>{
        var responseObject = response

        if(responseObject){
            var wordData = responseObject.definitions[0]
            var definition =wordData.description
            var lexicalCategory = wordData.wordtype
            this.setState({
                'word': this.state.text,
                'definition': definition,
                'lexicalCategory': lexicalCategory,
            })
        } else {
            this.setState({
                'word': this.state.text,
                'definition': 'Not Found',
            })
        }
    })
}
  render(){
    return(
      <View style={styles.container}>
          <Header 
              backgroundColor = {'#212F3D'}
              centerComponent = {{text: 'Dictionary App', style: {color: '#ffffff', fontSize: 20, fontStyle: 'bold'} }}/>
          <TextInput
              style={styles.inputBox}
              onChangeText={text=>{
                  this.setState({
                      text: text,
                      isSearchPressed: false,
                      word: 'Loading. . . ',
                      lexicalCategory: '',
                      examples: [],
                      definition: ''
                  })}}
                  value={this.state.text}/>
          <TouchableOpacity 
              style={styles.searchButton}
              onPress={()=>{
                  this.setState({
                      isSearchPressed: true, 
                  });
                  this.getWord(this.state.text)
              }}>
              <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Word: {""}</Text>
              <Text style={{fontSize: 19}}>{this.state.word}</Text>
          </View>
          <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Lexical Category: {""}</Text>
              <Text style={{fontSize: 19}}>{this.state.lexicalCategory}</Text>
          </View>
          <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Definition: {""}</Text>
              <Text style={{fontSize: 19}}>{this.state.definition}</Text>
          </View>
        </View>
      )
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'snow'
    },
    inputBox: {
        marginTop: 200, 
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.6)"
    },
    searchButton:{
        width: 100,
        height: 50,
        alignSelf: 'center',
        margin: 20,
        paddingTop: 8,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 5,
        backgroundColor: 'grey',

    },
    buttonText:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal',
        color: '#ffffff'
    },
    displayText:{
        textAlign: 'center',
        fontSize: 15
    },
    detailsTitle:{
        fontSize: 20,
        color: '#008E8C',
        fontWeight: '900'
    },
    detailsContainer:{
      margin: 20,
    }
})