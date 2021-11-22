import { useEffect, useState } from "react";

const BASE_API_URL = '//api.themoviedb.org/3/';
const BASE_IMG_API = '//image.tmdb.org/t/p/';
const API_KEY = '63683e7ba09287916ca1fd562d966e29';

const generateQueryString = (params = {}) => {
  params = {
    api_key: API_KEY,
    ...params
  };

  return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
}

const generateUrl = (path, params = {}) => {
  const query = generateQueryString(params);

  return `${BASE_API_URL}${path}?${query}`;
}

const useMovie = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const getMovies = async (page, signal) => {
    try{
      setLoading(true);
      setError(false);
      const url = generateUrl('movie/popular', {page});
      const response = await fetch(url, {signal});
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const newMovies = data.results.map((result) => ({
        id: result.id,
        title: result.title,
        rating: result.vote_average,
        voteCount: result.vote_count,
        releaseDate: result.release_date,
        image: `${BASE_IMG_API}/w400${result.backdrop_path}`,
      }))

      setHasMore(data.page < data.total_pages);
      setMovies((prev) => [...prev, ...newMovies]);
    }catch {
      setError(true);
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(pageNumber === 1) setMovies([]);

    const abortController = new AbortController();
    getMovies(pageNumber, abortController.signal);

    return () => abortController.abort();
  }, [pageNumber]);

  return { loading, error, movies, hasMore }
}

export default useMovie;