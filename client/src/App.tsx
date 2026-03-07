import { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import AuthPage from './components/Auth/AuthPage';
import { createGlobalStyle } from 'styled-components';
import { isLoggedIn, clearAuth, getUsername } from './services/authApi';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F8FAFC;
    min-height: 100vh;
    min-height: 100dvh;
    color: #1E293B;
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  }

  input, select, button {
    font-size: 16px;
  }
`;

function App() {
  const [authed, setAuthed] = useState(isLoggedIn());

  const handleLogout = () => {
    clearAuth();
    setAuthed(false);
  };

  return (
    <>
      <GlobalStyle />
      {authed ? (
        <Calendar username={getUsername() || ''} onLogout={handleLogout} />
      ) : (
        <AuthPage onAuth={() => setAuthed(true)} />
      )}
    </>
  );
}

export default App;
