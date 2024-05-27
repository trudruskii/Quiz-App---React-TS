import { shuffleArray } from './utils';


export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & {answers: string[]};

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!data.results) {
        throw new Error("No results found");
    }
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
        ])
    }));
};