import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CategoryPreviewGrid from './components/CategoryPreviewGrid';
import CategoryPage from './components/CategoryPage';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-[var(--paper)] text-[var(--ink)]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <CategoryPreviewGrid />
              </>
            } />
            <Route path="/category/:id" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
