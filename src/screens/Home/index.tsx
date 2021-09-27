import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ErrorContent from '../../components/ErrorContent';
import Loading from '../../components/Loading';
import MovieListItem from '../../components/MovieListItem';
import Search from '../../components/Search';
import { RootStackParamList } from '../../router/Router';
import * as api from '../../service';
import { colors } from '../../style';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyBackgroundColor,
  },
  containerError: {
    flex: 1,
    backgroundColor: colors.bodyBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textError: {
    color: colors.white,
  },
  containerPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  textPicker: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '50%',
  },
});

const Home = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<api.Movie[]>([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchMovies, setSearchMovies] = useState<api.Movie[]>([]);

  const loadMovies = async () =>
    api
      .getMovies()
      .then(response => response.data)
      .then(data => {
        setMovies(data), setSearchMovies(data);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));

  useEffect(() => {
    setLoading(true);
    setSearchText('');
    loadMovies();
  }, []);

  const updateSearch = (search: string) => {
    setSearchText(search);
    const arr = JSON.parse(JSON.stringify(movies));
    setSearchMovies(
      arr.filter(
        (item: api.Movie) =>
          item.title.toLowerCase().indexOf(search.toLowerCase()) > -1,
      ),
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorContent message="Não há filmes disponíveis no momento" />;
  }

  return (
    <View style={styles.container}>
      <Search value={searchText} onChange={text => updateSearch(text)} />

      {!searchMovies.length ? (
        <ErrorContent
          message={`Não encontramos nenhum filme com o nome: ${searchText}`}
        />
      ) : (
        <FlatList
          style={styles.container}
          numColumns={2}
          data={searchMovies}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MovieListItem
              movie={item}
              onPress={() => navigation.push('MovieDetail', { movie: item })}
            />
          )}
        />
      )}
    </View>
  );
};

export default Home;
