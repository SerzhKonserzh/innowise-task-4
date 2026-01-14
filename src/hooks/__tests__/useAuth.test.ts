import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import type { User } from '../../types/User';

describe('useAuth', () => {
  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    image: 'test.jpg'
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with null user when no stored auth', async () => {
    const { result } = renderHook(() => useAuth());
    // Дожидаемся завершения useEffect
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.user).toBeNull();
  });

  test('should login and store user', () => {
    const { result } = renderHook(() => useAuth());
    
    act(() => {
      result.current.login(mockUser);
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem('authUser')).toBe(JSON.stringify(mockUser));
  });
});