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
    render(){
        getWord=(word)=>{
            var searchKeyword=word.toLowerCase();
            var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json';

            return fetch(url)
            .then((date)=>{
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
                    var lexicalCategory = wordData.wordType
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
                <View>
                    <Text style={styles.detailsTitle}>Word: {""}</Text>
                    <Text style={{fontSize: 18}}>{this.state.word}</Text>
                </View>
                <View>
                    <Text style={styles.detailsTitle}>Lexical Category: {""}</Text>
                    <Text style={{fontSize: 18}}>{this.state.lexicalCategory}</Text>
                </View>
                <View>
                    <Text style={styles.detailsTitle}>Definition: {""}</Text>
                    <Text style={{fontSize: 15}}>{this.state.definition}</Text>
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
        borderWidth: 4,
        outline: 'none'
    },
    searchButton:{
        width: '50%',
        height: 50,
        alignSelf: 'center',
        margin: 20
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'normal'
    },
    displayText:{
        textAlign: 'center',
        fontSize: 15
    },
    detailsTitle:{
        fontSize: 20,
        color: '#212F3D'
    }
})