import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { LanguageResponse } from '../types';
import './details.css';

export default function Details() {
    const { id } = useParams();

    const [resources, setResources] =
        useState<LanguageResponse | null>(null);

    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();

        async function getResources() {
            try {
                setResources(null);
                setError("");

                const response = await fetch(
                    `http://localhost:3000/languages/${id}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch language details");
                }

                const data: LanguageResponse = await response.json();
                setResources(data);
            } catch (error) {
                if (error instanceof Error &&
                    error.name !== "AbortError") {
                    setError(error.message);
                }
            }
        }

        getResources();

        return () => controller.abort();
    }, [id]);

    if (error) return <p>{error}</p>;

    if (!resources) return <p>Loading language details...</p>;

    const [language, languageResources, subjectResources, abbreviations] =
        resources;

    return (
        <div className="language-details">
            <h1>{language.name}</h1>

            <h2>Language Information</h2>
            <p>First released: {language.first_released}</p>
            <p>Execution: {language.execution}</p>
            <p>Memory management: {language.memory_management}</p>

            <h3>IDEs and Editors</h3>
            <ul>
                {language.ides_and_editors.map((ide) => (
                    <li key={ide}>{ide}</li>
                ))}
            </ul>

            <h3>Career Opportunities</h3>
            <ul>
                {language.jobs.map((job) => (
                    <li key={job}>{job}</li>
                ))}
            </ul>

            <h2>Knowledge Required</h2>
            {language.knowledge_required.map((knowledge) => (
                <section key={knowledge.subject}>
                    <h3>
                        {abbreviations[knowledge.subject] ??
                            knowledge.subject}
                    </h3>

                    <p>Depth: {knowledge.depth}</p>

                    <ul>
                        {knowledge.topics.map((topic) => (
                            <li key={topic}>{topic}</li>
                        ))}
                    </ul>
                </section>
            ))}

            <h2>Free Language Resources</h2>
            {[
                languageResources.best_free,
                languageResources.practice,
                languageResources.reference,
            ].map((resource) => (
                <section key={resource.name}>
                    <h3>{resource.name}</h3>
                    <p>Cost: {resource.cost ?? "Not specified"}</p>

                    {resource.url && (
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Visit resource
                        </a>
                    )}

                    {resource.why && <p>{resource.why}</p>}
                </section>
            ))}

            <h2>Subject Resources</h2>
            {subjectResources.map((subject) => (
                <section key={subject.subject}>
                    <h3>
                        {abbreviations[subject.subject] ??
                            subject.subject}
                    </h3>

                    <p>{subject.name}</p>

                    <p>
                        Best free resource: {subject.best_free.name}
                    </p>

                    {subject.best_free.url && (
                        <a
                            href={subject.best_free.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Learn here
                        </a>
                    )}

                    <p>Practice: {subject.practice.name}</p>

                    {subject.practice.url && (
                        <a
                            href={subject.practice.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Start practicing
                        </a>
                    )}
                </section>
            ))}
        </div>
    );
};