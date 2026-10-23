import free_resources from '../resources/best_free_per_lang.json' with { type: "json" };
import { giveResources, giveSubjectResources } from '../handlers/handleResources.js'
import { giveCards, giveCardDetails } from '../handlers/handleLanguages.js';
import languages from '../resources/languages.json' with {type: "json"};
import express from 'express';
import { z } from 'zod';

const langController = express.Router();
const { meta: { abbreviations: abbs }, languages: data } = languages;
const { languages: languageResource, subjects } = free_resources;

langController.get('/', (_req, res) => {
    const genericCardDetails = giveCards(data)
    res.status(200).json(genericCardDetails);
});

langController.get("/:id", (req, res) => {
    const result = z.string().max(2).safeParse(req.params.id);
    if (!result.success) throw new Error("Error in id, id must not be empty or null or undefined.");

    const individualCardDescription = giveCardDetails(Number(result.data), data);
    const requiredSubjects = individualCardDescription.knowledge_required.map(topicObject => topicObject.subject);
    const freeLanguageResources = giveResources(Number(result.data), languageResource);
    const subjectResources = giveSubjectResources(subjects, requiredSubjects);

    res.status(200).json([
        individualCardDescription,
        freeLanguageResources,
        subjectResources,
        abbs,
    ]);
});


export default langController;
