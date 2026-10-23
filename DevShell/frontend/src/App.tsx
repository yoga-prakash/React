import { Routes, Route } from "react-router-dom";
import Card from './components/Card';
import Details from './components/Details';
import { type Cards } from './types';

import { useState, useEffect } from 'react';

export default function App() {
    const [cards, setCards] = useState<Cards[]>([]);

    useEffect(() => {
        async function fetchCards(): Promise<void> {
            const cardData = await fetch("http://localhost:3000/languages");
            const cards = await cardData.json();
            setCards(cards);
        };
        fetchCards();
    }, []);


    return (
        <>
            <Routes>
                <Route path="/" element={
                    <div className="language-grid">
                        {cards.length > 0 && cards.map(card => <Card key={card.id} card={card} />)}
                    </div>}
                />
                <Route path="/languages/:id" element={<Details />} />
            </Routes>
        </>
    );
};