import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { login, register } from '../../services/authApi';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.4s ease;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  text-align: center;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 16px;
  font-family: inherit;
  color: #1E293B;
  background: #F8FAFC;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: #FFFFFF;
  }

  &::placeholder {
    color: #94A3B8;
  }
`;

const SubmitBtn = styled.button`
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #3B82F6;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;
  touch-action: manipulation;

  &:hover {
    background: #2563EB;
  }
  &:active {
    background: #1D4ED8;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Toggle = styled.button`
  background: none;
  border: none;
  color: #3B82F6;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  text-align: center;
  font-family: inherit;
  touch-action: manipulation;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.div`
  color: #EF4444;
  font-size: 13px;
  text-align: center;
  padding: 8px;
  background: #FEF2F2;
  border-radius: 8px;
`;

interface Props {
  onAuth: () => void;
}

const AuthPage: React.FC<Props> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      onAuth();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>{isLogin ? 'Login' : 'Register'}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <SubmitBtn type="submit" disabled={loading || !username || !password}>
            {loading ? '...' : isLogin ? 'Sign In' : 'Create Account'}
          </SubmitBtn>
        </Form>
        <Toggle onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </Toggle>
      </Card>
    </Wrapper>
  );
};

export default AuthPage;
