import { useEffect, useState } from "react";
import { setPageTitle } from "../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import { baseImage } from "../constants";
// import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import useMovies from "../hooks/useMovies";
import React from "react";
import CardContainer from "../components/CardContainer";
import CardSkeleton from "../components/CardSkeleton";

// interface Movie {
//   id: number;
//   poster_path: string;
//   title: string;
// }

const Movie = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Movie"));
  }, [dispatch]);

  // const [movies, setMovies] = useState<Movie[]>([]);
  const [category, setCategory] = useState<string>("trending/movie/week");
  // const [page, setPage] = useState<number>(1);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  const { data, isLoading, fetchNextPage, hasNextPage } = useMovies(category);
  // console.log(data);
  const fetchMoviesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // const fetchMovies = async (category: string, page: number) => {
  //   try {
  //     const res = await axios.get<{ results: Movie[] }>(
  //       `${baseUrl}${category}?api_key=${apiKey}&page=${page}`
  //     );
  //     if (res.data.results.length === 0) {
  //       setHasMore(false); // No more movies to load
  //     } else {
  //       setMovies((prevMovies) => [...prevMovies, ...res.data.results]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching movies:", error);
  //   }
  // };

  // useEffect(() => {
  //   setMovies([]); // Reset movies when category changes
  //   setPage(1);
  //   setHasMore(true);
  //   fetchMovies(category, 1);
  // }, [category]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  // const fetchMoreData = () => {
  //   if (hasMore) {
  //     setPage((prevPage) => prevPage + 1);
  //     fetchMovies(category, page + 1);
  //   }
  // };

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <NavLink
          to={`/movie?type=trending`}
          className="btn border-dark hover:border-secondary bg-transparent flex-1"
          onClick={() => handleCategoryChange("trending/movie/week")}
        >
          TRENDING
        </NavLink>

        <NavLink
          to={`/movie?type=popular`}
          className="btn border-dark hover:border-secondary bg-transparent flex-1"
          onClick={() => handleCategoryChange("movie/popular")}
        >
          POPULAR
        </NavLink>

        <NavLink
          to={`/movie?type=top_rated`}
          className="btn border-dark hover:border-secondary bg-transparent flex-1"
          onClick={() => handleCategoryChange("movie/top_rated")}
        >
          TOP RATED
        </NavLink>
      </div>

      <InfiniteScroll
        dataLength={fetchMoviesCount} //This is important field to render the next data
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-2">
          {isLoading &&
            skeletons.map((skeleton) => (
              <CardContainer key={skeleton}>
                <CardSkeleton />
              </CardContainer>
            ))}
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((movie) => (
                <div
                  key={movie.id}
                  className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md bg-white dark:bg-black shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),_0px_12px_24px_-4px_rgba(145,158,171,0.12)]"
                >
                  <div className="rounded-md overflow-hidden shadow-[0_6px_10px_0_rgba(0,0,0,0.14),_0_1px_18px_0_rgba(0,0,0,0.12),_0_3px_5px_-1px_rgba(0,0,0,0.20)]">
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`${baseImage}${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover h-64 w-full"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Movie;
