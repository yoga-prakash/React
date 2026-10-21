import languages from '../resources/languages.json' with {type: "json"};
import { giveCards, giveCardDetails } from '../handlers/handleLanguages.js';
import express from 'express';

const langController = express.Router();
const { meta: { abbreviations: abbs }, languages: data } = languages;

langController.get('/', (_req, res) => {
    const genericCardDetails = giveCards(data)
    res.status(200).json(genericCardDetails);
});

langController.get("/:id", (_req, res) => {
    const individualCardDescription = giveCardDetails(Number(_req.params.id), data);
    res.status(200).json({
        individualCardDescription,
        abbs,
    });
});


export default langController;
