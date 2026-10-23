import { z } from "zod";

const Card = z.object({
    id: z.number().int(),
    name: z.string().max(100),
    level: z.string().max(100),
    level_description: z.string().max(200),
    paradigms: z.array(z.string().max(100)),
    learning_difficulty: z.string().max(100)
});

const CardDetails = z.object({
    id: z.number().int(),
    name: z.string(),
    first_released: z.number().int(),
    memory_management: z.string().max(100),
    execution: z.string().max(100),
    ides_and_editors: z.array(z.string().max(100)),
    jobs: z.array(z.string().max(100)),
    knowledge_required: z.array(z.object({
        subject: z.string().max(100),
        topics: z.array(z.string().max(100)),
        depth: z.string().max(100)
    })),
});

const Cards = z.array(Card);

type Cards = z.infer<typeof Cards>;

const CardDescriptions = z.array(CardDetails);

type CardDetails = z.infer<typeof CardDetails>;

export function giveCards(objArray: unknown): Cards {
    const result = Cards.safeParse(objArray);
    if (!result.success) {
        throw new Error("Invalid card data");
    };
    return result.data;
};

export function giveCardDetails(id: number, objArray: unknown): CardDetails {
    const result = CardDescriptions.safeParse(objArray);
    if (!result.success) {
        throw new Error("Invalid card data");
    };
    const card = result.data.find(card => card.id === id);
    if (!card) {
        console.log(result.error);
        throw new Error(`Card with id ${id} not found`);
    };
    const cardDetailsResult = CardDetails.safeParse(card);
    if (!cardDetailsResult.success) {
        console.log(cardDetailsResult.error);
        throw new Error("card details doesn't match the expected schema");
    };
    return cardDetailsResult.data;
};

