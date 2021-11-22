import React, {useState, useRef, useCallback, useMemo } from "react";
import { 
  List, 
  WindowScroller, 
  AutoSizer,
} from "react-virtualized";

import MovieCard from "../MovieCard";

import useMovie from "../../hooks/useMovie";
import useWindowSize from "../../hooks/useWindowSize";

const ITEM_WIDTH = 320;

const getMaxItemsAmountPerRow = (width) => {
  return Math.max(Math.floor(width / ITEM_WIDTH), 1);
}

const generateIndexesForRow = (rowIndex, maxItemsPerRow, itemsAmount) => {
  const result = [];
  const startIndex = rowIndex * maxItemsPerRow;

  for (let i = startIndex; i < Math.min(startIndex + maxItemsPerRow, itemsAmount); i++) {
    result.push(i);
  }

  return result;
}

const EndlessList = () => {
  const observer = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const {width: screenWidth} = useWindowSize();
  const {loading, movies, hasMore} = useMovie(pageNumber);

  const maxItemsPerRow = useMemo(() => {
    return getMaxItemsAmountPerRow(screenWidth);
  }, [screenWidth]);

  const rowCount = useMemo(() => {
    return movies.length / maxItemsPerRow;
  }, [maxItemsPerRow, movies])

  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const rowRenderer = useCallback((args) => {
    const {key, index, style} = args;
    const movieRows = generateIndexesForRow(index, maxItemsPerRow, movies.length).map(movieIndex => movies[movieIndex]);

    return (
      <div 
        key={key} 
        ref={rowCount === index + 1 ? lastElementRef : undefined} 
        className="row" 
        style={style} 
      >
        {movieRows.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    )
  }, [lastElementRef, maxItemsPerRow, movies, rowCount])

  return (
    <div className="endless-container">
      <AutoSizer disableHeight>
        {({width}) => (
          <WindowScroller>
            {({height, scrollTop}) => (
              <List
                className="list-row"
                autoHeight
                height={height}
                scrollTop={scrollTop}
                width={width}
                rowCount={rowCount}
                rowHeight={260}
                rowRenderer={rowRenderer}
              />
            )}
          </WindowScroller>
        )}
      </AutoSizer>
    </div>
  )
}

export default React.memo(EndlessList);