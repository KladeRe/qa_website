import { executeQuery } from "../database/database.js";

const getAllTopics = async() => {
    const result = await executeQuery("SELECT COUNT(id) FROM topics;")
    return result.rows[0].count;
}

const getAllQuestions = async() => {
    const result = await executeQuery("SELECT COUNT(id) FROM questions;")
    return result.rows[0].count;
}

const getAllAnswers = async() => {
    const result = await executeQuery("SELECT COUNT(id) FROM question_answer_options;")
    return result.rows[0].count;
}

export {getAllTopics, getAllQuestions, getAllAnswers}
