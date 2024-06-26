import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from '@expo/vector-icons';
import { API_ACCESS_TOKEN } from "@env";
import type { Movie } from "../types/app";
import MovieItem from "../components/movies/MovieItem";

const size = {
  background: {
    width: 360,
    height: 200,
  },
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
}

const MovieDetail = ({route}: any): JSX.Element => {
    const { id } = route.params
    const  { backdrop_path }  = route.params 
    const { overview} = route.params
    const { title } = route.params
    const { vote_average } = route.params
    console.log(`Id : ${route} dan ${backdrop_path}`)
    
    const [moviesDetail, setMoviesDetail] = useState<Movie[]>([])
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
      getMovieListDetail()
    }, [])

    const getMovieListDetail = (): void => {
      const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_ACCESS_TOKEN}`,
          },
        }
    
        fetch(url, options)
          .then(async (response) => await response.json())
          .then((response) => {
            setMoviesDetail(response.results)
          })
          .catch((errorResponse) => {
            console.log(errorResponse)
          })
    }

    const addFavorite = (): void => {

    }

    const removeFavorite = (): void => {
      
    }


    return(
        <ScrollView>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 32,
            }}
          >
            <ImageBackground
              resizeMode="cover"
              imageStyle={styles.backgroundImageStyle}
              style={[size.background, styles.backgroundImage]}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${
                  backdrop_path
                }`,
              }}
            >
              <LinearGradient
                    colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
                    locations={[0.6, 0.8]}
                    style={styles.gradientStyle}
                >
                    <Text style={styles.movieTitle}>{title}</Text>
                    <View style={styles.ratingContainer}>
                        <View>
                        <FontAwesome name="star" size={16} color="yellow" />
                          <Text style={styles.rating}>
                            {vote_average.toFixed(1)}
                          </Text>
                        </View>
                        
                        <TouchableOpacity
                          // onPress={
                          //   isFavorite
                          //     ? () => removeFavorite(movie.id)
                          //     : () => addFavorite(movie)
                          // }
                        >
                          <FontAwesome
                            name={isFavorite ? "heart" : "heart-o"}
                            size={24}
                            color="#FFB4C2"
                          />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <Text style={{ fontSize: 30 }}>Movie ID : {id}</Text>
            <Text style={{ fontSize: 30 }}>Movie ID: {title}</Text>
            <Text style={{ fontSize: 18 }}>Movie ID: {overview}</Text>
            <View style={styles.header}>
                <View style={styles.purpleLabel}></View>
                <Text style={styles.title}>Recommendation</Text>
            </View>
            <FlatList 
              style={{
                ...styles.movieList,
                maxHeight: size.poster.height,
              }}
              data={moviesDetail}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({ item }) => (
                <MovieItem
                  movie={item}
                  size={size.poster}
                  coverType={"poster"}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    responsiveImg: {
      opacity: 1,
      width: 'auto',
      height: 'auto',
      position: 'static',
      marginBottom: 300,
    },
    backgroundImage: {
      marginRight: 4,
    },
    backgroundImageStyle: {
      borderRadius: 1,
    },
    movieTitle: {
      color: 'white',
    },
    gradientStyle: {
      padding: 8,
      height: '100%',
      width: '100%',
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      justifyContent: "space-between"
    },
    rating: {
      color: 'yellow',
      fontWeight: '700',
    },
    header: {
      marginLeft: 6,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    purpleLabel: {
      width: 20,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#8978A4',
      marginRight: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: '900',
    },
    movieList: {
      paddingLeft: 4,
      marginTop: 8,
    },
})

export default MovieDetail