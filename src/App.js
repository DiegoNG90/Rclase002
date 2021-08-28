import './App.css';
import Routes from './Routes/Routes'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
