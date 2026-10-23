export type Resource = {
    name: string;
    url?: string;
    cost?: string;
    why?: string;
};

export type Knowledge = {
    subject: string;
    topics: string[];
    depth: string;
};

export type LanguageDetails = {
    id: number;
    name: string;
    first_released: number;
    memory_management: string;
    execution: string;
    ides_and_editors: string[];
    jobs: string[];
    knowledge_required: Knowledge[];
};

export type LanguageResources = {
    language_id: number;
    name: string;
    best_free: Resource;
    practice: Resource;
    reference: Resource;
};

export type SubjectResource = {
    subject: string;
    name: string;
    best_free: Resource;
    practice: Resource;
};

export type LanguageResponse = [
    LanguageDetails,
    LanguageResources,
    SubjectResource[],
    Record<string, string>
];

export type Cards = {
    id: number;
    name: string;
    level: string;
    level_description: string;
    paradigms: string[];
    learning_difficulty: string;
};

