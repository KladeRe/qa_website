import { executeQuery } from "../database/database.js";

const listQuestions = async(topic_id) => {
    const result = await executeQuery("SELECT * FROM questions WHERE topic_id = $topic_id;", {
        topic_id: topic_id,
    });
    return result.rows;
}

const addQuestion = async(user_id, topic_id, question_text) => {
    await executeQuery("INSERT INTO questions (user_id, topic_id, question_text) VALUES ($user_id, $topic_id, $question_text);", {
        user_id: user_id,
        topic_id: topic_id,
        question_text: question_text,
    });
}

const getQuestionById= async(id) => {
    const result = await executeQuery("SELECT * FROM questions WHERE id=$id;", {
        id: id,
    });
    return result.rows[0];
};


const deleteQuestion = async(id) => {
    await executeQuery("DELETE FROM questions WHERE id=$id;", {
        id: id,
    });
};

const getAllQuestions = async () => {
    const result = await executeQuery("SELECT* FROM questions;")
    return result.rows;
}


export {listQuestions, addQuestion, getQuestionById, deleteQuestion, getAllQuestions}

