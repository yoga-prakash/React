import languages from '../resources/languages.json' with {type: "json"};
import express from 'express';

const langController = express.Router();
const { meta: { abbreviations: _abbs }, languages: data } = languages;
langController.get('/', (_req, res) => {
    res.send(data);
});

export default langController;
