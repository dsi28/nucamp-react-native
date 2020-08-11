import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

class Directory extends Component{

    static navigationOptions = {
        title: 'Directory'
    }

    render(){    
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) =>{
        return(
            <Tile
               title={item.name}
               caption={item.description}
               featured
               onPress={() => navigate('CampsiteInfo', { campsiteId: item.id})}
               imageSrc={{uri: baseUrl+item.image}} 
            />
        )
        }
        return(
            <FlatList 
                data={this.props.campsites.campsites} 
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()} //extractor prop?
            />
        )
    }
}
const mapStateToProps = (state) => ({
    campsites: state.campsites
});
export default connect(mapStateToProps)(Directory);