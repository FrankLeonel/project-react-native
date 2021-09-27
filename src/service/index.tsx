import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://osf-rn-training-bff.herokuapp.com',
});

interface Trailer {
  url: string;
}

export interface Movie {
  id: string;
  title: string;
  contentRating: string;
  synopsis: string;
  posterPortraitUrl: string | null;
  posterHorizontalUrl: string | null;
  trailers: Trailer[];
}

export interface Types {
  id: number;
  alias: string;
}

export interface Sessions {
  id: string;
  time: string;
  types: Types[];
}

interface Rooms {
  name: string;
  sessions: Sessions[];
}

export interface InformationDay {
  id: string;
  name: string;
  rooms: Rooms[];
}

export const getMovies = () => api.get('/movies');

export const getInformationDay = (movieId: string, date: string) =>
  api.get(`/movies/${movieId}/sessions/date/${date}`);
