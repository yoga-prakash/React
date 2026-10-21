import type { Cards } from '../types';
import './Card.css';

export default function Card({ card }: { card: Cards }) {
    function handleCardClick(cardId: number) { console.log(cardId); };
    return (
        <article className="language-card" onClick={() => handleCardClick(card.id)}>
            <img
                className="language-card__image"
                src={`/${card.name}.png`}
                alt={`${card.name} logo`}
            />

            <div className="language-card__body">
                <h2 className="language-card__name">
                    {card.name}
                </h2>

                <p className="language-card__level">
                    <strong>Level:</strong> {card.level}
                </p>

                <p className="language-card__description">
                    {card.level_description}
                </p>

                <p className="language-card__paradigms">
                    <strong>Paradigms:</strong>
                </p>
                <ul>
                    {card.paradigms.map(paradigm => <li key={`${paradigm}-${card.id}`}>{paradigm}</li>)}
                </ul>

                <p className="language-card__difficulty">
                    <strong>Learning difficulty:</strong>{' '}
                    {card.learning_difficulty}
                </p>
            </div>
        </article>
    );
};

