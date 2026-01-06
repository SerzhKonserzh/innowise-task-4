import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  callback: () => void,
  canLoadMore: boolean,
  isLoading: boolean
) => {
  //observer, that will detect sentinel
  const observer = useRef<IntersectionObserver | null>(null); 
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || !canLoadMore) return;

    observer.current = new IntersectionObserver(entries => {
      //if sentinel has been detected, run callback
      if (entries[0]?.isIntersecting) {
        callback();
      }
    });

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback, canLoadMore, isLoading]);

  return sentinelRef;
};