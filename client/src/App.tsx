import Calendar from './components/Calendar/Calendar';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #F8FAFC;
    min-height: 100vh;
    color: #1E293B;
    -webkit-font-smoothing: antialiased;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Calendar />
    </>
  );
}

export default App;
