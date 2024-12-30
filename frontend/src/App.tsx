import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Movies } from '@/pages/Movies';
import { MovieDetails } from '@/pages/MovieDetails';
import { Categories } from '@/pages/Categories';
import { Dashboard } from '@/pages/Dashboard';
import { Login } from '@/pages/Login';
import { SignUp } from '@/pages/SignUp';
import { Toaster } from 'sonner';
import { Favorites } from '@/pages/Favorites';

function App() {
    return (
        <Router>
            <Toaster />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
