import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthContextData {
  data: AuthState;
  loading: boolean;
  signIn(credentials: SignInParams): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context.signIn) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Gobaber:token',
        '@Gobaber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStoragedData();
  }, [setLoading]);

  const signIn = useCallback(async ({ email, password }) => {
    const { data: response } = await api.post('sessions', { email, password });
    const { token, user } = response;

    await AsyncStorage.multiSet([
      ['@Gobaber:token', token],
      ['@Gobaber:user', JSON.stringify(user)],
    ]);
    setData({ user, token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Gobaber:token', '@Gobaber:user']);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, data, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
