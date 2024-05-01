import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Mazer from './components/Mazer';
import Minigame from './components/Minigame';

function App() {
    return (
        <div>
            <Header />
            <Mazer />
            {/* <Minigame /> */}
            <Footer />
        </div>
    );
}

export default App;
