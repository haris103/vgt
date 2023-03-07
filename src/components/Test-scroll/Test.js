import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import InfiniteScroll from 'react-infinite-scroll-loader-y';
import Comments from "./Comments";
import Loader from "./Loader";
import EndMessage from "./EndMessage";

function Test() {

    const [items, setItems] = useState([]);
    
    const [hasMore, sethasMore] = useState(true);

    const [page, setPage] = useState(2);

    useEffect(() => {
      const getComments = async() => {

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
        )
        const data = await res.json();
        setItems(data);

      };

      getComments();
    }, []);

    console.log(items);

    const fetchComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`        
      );
      const data = await res.json();
      return data;

    };

    const fetchData = async () => {
      const commentsFormServer = await fetchComments();

      setItems([...items, ...commentsFormServer]);

      if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
        sethasMore(false);

      }      

      setPage(page + 1);
    };

  return (    
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      // hasMore={hasMore}
      // loader={<h1>Loading...</h1>}
      // endMessage={
      //   <p>Yay! You have seen it all</p>

      // }    
      loader={<h4>Loading...</h4>}
      pullDownToRefresh
      pullDownToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>
          &#8595; Pull down to refresh
        </h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      }
      refreshFunction={fetchData}
    >
      {/* <div className='flex flex-col items-center justify-center min-h-screen py-2'> */}
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>

               {/* <div flex flex-col items-centerjustify-center w-full flex-1> */}
        <div className='flex flex-wrap px-3 py-4'>
        {/* <div className='flex flex-col items-center justify-center min-h-screen py-2'></div> */}
          {items.map((item) => {
          return <Comments key={item.id} item={item} />;

          })}
          </div>
      </div>

    </InfiniteScroll>
  )
}

export default Test;