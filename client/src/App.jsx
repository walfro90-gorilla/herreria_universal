import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Herrería Universal</h1>
        </header>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2023 Herrería Universal</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;