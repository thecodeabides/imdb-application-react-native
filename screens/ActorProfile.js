import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';

import Carousel from './CarouselPage';
import {connect} from 'react-redux';
import Card2 from './Card2';
import {getPerson, getFilmography} from '../store/actions'

class ActorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actorDetails: {},
            actorMovies: [],
            actorPictures:[],
        };
    }

componentDidMount() {
    const {detailValue} = (this.props.navigation.state.params);
    this.props.getPerson(detailValue)
    this.props.getFilmography(detailValue)
}
render() {
    
    const {actorDetail, films} = this.props
    let trendingMoviesImage = [];
    
      if(actorDetail && films && actorDetail.id === this.props.navigation.state.params.detailValue){
        let image = actorDetail.images.profiles.reduce(function (acc, x) {
            trendingMoviesImage.push(x.file_path);
            return (acc);
        }, [])
        return (
            <ScrollView style={styles.container}>
                <Carousel image={trendingMoviesImage}/>
                <View style={styles.actorProfile}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w200${actorDetail.profile_path}` }}
                        style={styles.actorProfileImage}
                    />
                    <View style={styles.actorDetails}>
                        <Text style={[styles.actorDetailsItem, styles.actorName]} >{actorDetail.name}</Text>
                        <Text style={styles.actorDetailsItem}>{actorDetail.birthday}</Text>
                        <Text style={styles.actorDetailsItem}>{actorDetail.place_of_birth}</Text>
                        <Text style={styles.actorDetailsItem}>{actorDetail.popularity}</Text>
                    </View>
                </View>
                <View style={styles.movieList}>
                    <Text style={styles.movieListTitle}>Filmography</Text>
                    <Card2 onCardClick = {this.props.navigation} data={films} />
                </View>
                <View style={styles.actorPersonalDetails}>
                    <Text style={styles.actorPersonalDetailsTitle}>Personal Details</Text>
                    <View style={styles.actorPersonalDetailsTable}>
                        <View>
                            <Text style={styles.actorPersonalDetailsList}>Birthday</Text>
                            <Text style={styles.actorPersonalDetailsList}>Place of birth</Text>
                            <Text style={styles.actorPersonalDetailsList}>Popularity</Text>
                            <Text style={styles.actorPersonalDetailsList}>Homepage</Text>
                        </View>
                        <View>
                            <Text style={styles.actorPersonalDetailsList}>{actorDetail.birthday}</Text>
                            <Text style={styles.actorPersonalDetailsList}>{actorDetail.place_of_birth}</Text>
                            <Text style={styles.actorPersonalDetailsList}>{actorDetail.popularity}</Text>
                            <Text style={styles.actorPersonalDetailsList}>{actorDetail.homepage}</Text>
                        </View>
                    </View>
                    <View style={styles.actorPersonalDetailsBiography}>
                        <Text style={styles.actorPersonalDetailsBiographyTitle}>Biography</Text>
                        <Text style={styles.actorPersonalDetailsBiographyContent}>{actorDetail.biography}</Text>
                    </View>
                </View>
            </ScrollView>
        )
                }
                else return (<View style={styles.load}>
                    <ActivityIndicator size={50} color="#ffd700" />
                </View>)
    }
}

const styles = StyleSheet.create({
    load:{
        backgroundColor: '#1E1C1C',
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor:'#1E1C1C',
    },
    actorPoster:{
        height:250,
        width:350,
    },
    actorProfileImage: {
        resizeMode: 'cover',
        alignSelf: 'flex-start',
        borderRadius: 150,
        width: 150,
        height: 150,
        marginLeft: 25,
        marginTop: 10,
    },
    actorProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    actorDetailsItem: {
        fontSize: 14,
        fontWeight: '400',
        paddingLeft: 15,
        paddingTop: 5,
        color: 'white'
    },
    actorName: {
        fontSize: 18,
        fontWeight: '700',
    },
    moviePosterTitle: {
        color: 'white',
        alignSelf: 'center',
        marginLeft: 25,
    },
    movieList: {
        backgroundColor: '#1a1a1a',
        paddingBottom:10
    },
    moviePoster: {
        width: 100,
        height: 150,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 8,
    },
    movieListPosters:{
        marginRight:20
    },
    movieListTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10
    },
    actorPersonalDetails: {
        backgroundColor: '#1a1a1a',
        marginTop: 10,
        marginBottom: 10,
    },
    actorPersonalDetailsTitle:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10    
    },
    actorPersonalDetailsList:{
        color:'gray',
        paddingBottom:5
    },
    actorPersonalDetailsTable:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    actorPersonalDetailsBiography:{
        color:'white',
        marginTop:20,
        marginBottom:20,
    },
    actorPersonalDetailsBiographyContent:{
        color:'gray',
        paddingLeft:20,
    },
    actorPersonalDetailsBiographyTitle:{
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginBottom: 10  
    }
  
});
const mapStateToProps = state =>({
    actorDetail : state.details.person,
    films : state.details.personFilms
})
const mapDispatchToProps = () => dispatch =>({
    getPerson : (id) => dispatch(getPerson(id)),
    getFilmography : (id) => dispatch(getFilmography(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(ActorProfile);
