import './App.css';
import PaymentIndex from './Components/Payment/PaymentIndex';

import { BrowserRouter as Router, Routes, Route, Link, Outlet, } from "react-router-dom";
import WhatsAppIndex from './Pages/WhatsAppIndex';
import Header from './Components/Header';
import AdminIndex from './Pages/Admin/AdminIndex';
import PaytmIndex from './Paytm/PaytmIndex';
import IndexWS from './WebSocket/IndexWS';

function App() {
  return (
    <>
      <Router>
    <Header/>

        <Routes>
          <Route path="/" element={<WhatsAppIndex />} />
          <Route path="/payment" element={<PaymentIndex />} />
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/paytm" element={<PaytmIndex />} />
          <Route path="/chat" element={<IndexWS />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
