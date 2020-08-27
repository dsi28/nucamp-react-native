import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {
    state = { 
        username: '',
        password: '',
        remember: false
    }

    static navigationOptions = {
        title: 'Login'
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if(userinfo){
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            });
    }

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            //what if there is already a key from another app called user info?
            SecureStore.setItemAsync('userinfo', JSON.stringify({
                username:this.state.username,
                password:this.state.password
            })).catch(error => console.log('Could not save user infor', error));
        } else{
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error));
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                        onPress={()=> this.handleLogin()}
                        title='Login'
                        color='#5637DD'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});
export default Login;