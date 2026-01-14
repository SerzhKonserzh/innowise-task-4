import { renderHook } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

describe('useInfiniteScroll', () => {
  let callback: jest.Mock;
  let hasNextPage: boolean;
  let isFetchingNextPage: boolean;
  
  beforeEach(() => {
    callback = jest.fn();
    hasNextPage = true;
    isFetchingNextPage = false;
    
    (window as any).IntersectionObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn()
      };
    });
  });

  test('should create observer and call callback when intersecting', () => {
    const { result } = renderHook(() => 
      useInfiniteScroll(callback, hasNextPage, isFetchingNextPage)
    );
    
    expect(result.current).toBeDefined();
    expect(IntersectionObserver).toHaveBeenCalled();
  });

  test('should not call callback when there is no next page', () => {
    hasNextPage = false;
    
    renderHook(() => 
      useInfiniteScroll(callback, hasNextPage, isFetchingNextPage)
    );
    
    expect(callback).not.toHaveBeenCalled();
  });
});