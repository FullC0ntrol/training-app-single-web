import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPageName from "./components/LoginPageName";
import LoginPagePassword from "./components/LoginPagePassword";
import Home from "./components/Home"
import Warmup from "./components/Warmup";
import ExercisePage from "./pages/ExercisePage";
import SummaryPage from "./pages/SummaryPage";
import Calendar from "./components/Calendar";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPageName />} />
                <Route path="/password" element={<LoginPagePassword />} />
                <Route path="/home" element={<Home />} />
                <Route path="/warmup" element={<Warmup />} />
                <Route path="/exercise/:id" element={<ExercisePage />} />
                <Route path="/summary" element={<SummaryPage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
