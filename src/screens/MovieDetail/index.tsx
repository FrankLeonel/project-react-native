/* eslint-disable react-hooks/exhaustive-deps */
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ErrorContent from '../../components/ErrorContent';
import InformationDayList from '../../components/InformationDayList';
import Loading from '../../components/Loading';
import PosterLandscape from '../../components/PosterLandscape';
import PosterPortrait from '../../components/PosterPortrait';
import TrailerButton from '../../components/TrailerButton';
import { RootStackParamList } from '../../router/Router';
import * as api from '../../service';
import { colors } from '../../style';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bodyBackgroundColor,
  },
  posterPortraitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
    margin: 5,
  },
  boldText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  regularText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '400',
  },
  synopsis: {
    marginBottom: 8,
  },
  segmentedControl: {
    marginTop: 15,
  },
  textSegmentedControl: { fontSize: 13 },
});

const MovieDetail = ({ route }: Props) => {
  const { movie } = route.params;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const currentDate = moment(new Date().toLocaleDateString()).format(
    'YYYY-MM-DD',
  );
  const [date, setDate] = useState<string>(currentDate);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [informationDay, setInformationDay] = useState<api.InformationDay[]>(
    [],
  );
  // const [informationDayAux, setInformationDayAux] = useState<
  //   api.InformationDay[]
  // >([]);

  let data = useRef('');
  let daysControl: string[] = [];
  const days = [
    'Domingo',
    'Segunda-feira',
    'Terca-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  // retorna de 0 - 6
  const today: number = new Date().getDay();

  const loadMovie = async (movieId: string, date: string) =>
    api
      .getInformationDay(movieId, date)
      .then(response => setInformationDay(response.data))
      .catch(err => {
        setError(err), setInformationDay([]);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    setLoading(true);
    loadMovie(movie.id, date);
  }, [date]);

  const renderTrailerButton = () => {
    if (movie.trailers.length) {
      return <TrailerButton trailerURL={movie.trailers[0].url} />;
    }
    return null;
  };

  const renderSegmentControl = () => {
    /*
     * days[6] = Sábado (i.e., último elemento) e o primeiro elemento do Segment Control.
     * Precisa-se de mais 3 dias. Logo, o último indíce seria 9, mas days.length = 6.
     */
    const length = days.length;

    /*
     * Para acessar de maneira circular, pega-se foi usado a seguinte estrutura:
     * arr[(i % n *2) % n].
     * i = indíce, n = length
     */

    daysControl = [
      days[today],
      days[((today + 1) % (length * 2)) % length],
      days[((today + 2) % (length * 2)) % length],
      days[((today + 3) % (length * 2)) % length],
    ];

    return (
      <SegmentedControl
        selectedIndex={selectedIndex}
        style={styles.segmentedControl}
        fontStyle={styles.textSegmentedControl}
        values={daysControl}
        onValueChange={value => handleValue(value)}
      />
    );
  };

  const handleValue = useCallback(
    (value: string) => {
      const posicao = daysControl.indexOf(value, 0);
      setSelectedIndex(posicao);
      setDate(moment(currentDate).add(posicao, 'days').format('YYYY-MM-DD'));
      data.current = moment(currentDate)
        .add(posicao, 'days')
        .format('YYYY-MM-DD');
    },
    [currentDate, daysControl],
  );

  return (
    <View style={styles.container}>
      <PosterLandscape imageURL={movie.posterHorizontalUrl}>
        <View style={styles.posterPortraitContainer}>
          <PosterPortrait
            imageURL={movie.posterPortraitUrl}
            width={170}
            height={170}
          />
        </View>
      </PosterLandscape>
      <View style={styles.detailsContainer}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.boldText}>
          Classificação:{' '}
          <Text style={styles.regularText}>{movie.contentRating}</Text>
        </Text>
        <Text style={[styles.boldText, styles.synopsis]} numberOfLines={3}>
          Synopsis: <Text style={styles.regularText}>{movie.synopsis}</Text>
        </Text>

        {renderTrailerButton()}

        {renderSegmentControl()}

        {loading ? (
          <Loading />
        ) : error && !informationDay.length ? (
          <ErrorContent message="Não há sessões disponíveis no momento" />
        ) : (
          <FlatList
            data={informationDay}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <InformationDayList informationDay={item} />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default MovieDetail;
