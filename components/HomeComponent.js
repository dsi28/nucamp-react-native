import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

function RenderItemComponent({item}){
    if(item){
        return(
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl+item.image}}>
                <Text style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        )
    }return <View/>
}

class Home extends Component{

    static navigationOptions  = {
        title: 'Home'
    }

    render(){
        return(
            <ScrollView>
                <RenderItemComponent item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}/>
                <RenderItemComponent 
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}/>
                <RenderItemComponent 
                    item={ this.props.partners.partners.filter(partner => partner.featured)[0]}/>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => ({
    campsites: state.campsites,
    promotions: state.promotions,
    partners: state.partners
});
export default connect(mapStateToProps)(Home);