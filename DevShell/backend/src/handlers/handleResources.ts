import { z } from 'zod';

const ResourcesSchema = z.object({
    language_id: z.number().int(),
    name: z.string(),
    best_free: z.object({
        name: z.string(),
        url: z.string(),
        cost: z.string(),
        why: z.string(),
    }),
    practice: z.object({
        name: z.string(),
        cost: z.string(),
        url: z.string(),
    }),
    reference: z.object({
        name: z.string(),
        cost: z.string(),
        url: z.string()
    }).nullable(),
});

const SubjectSchema = z.object({
    subject: z.string(),
    name: z.string(),
    best_free: z.object({
        name: z.string(),
        url: z.string(),
        cost: z.string(),
        why: z.string(),
    }),
    practice: z.object({
        name: z.string(),
        url: z.string(),
        cost: z.string()
    })
});

const Resources = z.array(ResourcesSchema);
const Subjects = z.array(SubjectSchema);

type Resource = z.infer<typeof ResourcesSchema>;

type Subjects = z.infer<typeof Subjects>;

export function giveResources(id: number, objArray: unknown): Resource {
    const result = Resources.safeParse(objArray);
    if (!result.success) {
        console.error(z.prettifyError(result.error));
        throw new Error("Invalid resources data");
    };
    const particularLangResource = result.data.find(resourceObject => resourceObject.language_id === id);
    if (particularLangResource === undefined) {
        throw new Error("Cannot find particular language from provided id.");
    };
    return particularLangResource;
};

export function giveSubjectResources(subArray: unknown, subInNeed: unknown): Subjects {
    const result = Subjects.safeParse(subArray);
    const result2 = z.array(z.string()).safeParse(subInNeed);
    if (!result.success) {
        console.error(z.prettifyError(result.error));
        throw new Error("Invalid data in subjects array.");
    };
    if (!result2.success) {
        console.error(z.prettifyError(result2.error));
        throw new Error("Invalid data in abbrevations object");
    };
    const requiredSubjects = result.data.filter(subjectObject => result2.data.includes(subjectObject.subject));
    return requiredSubjects;
};
