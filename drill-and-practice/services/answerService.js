import { executeQuery } from "../database/database.js";


const addAnswer = async(question_id, option_text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($question_id, $option_text, $is_correct);", {
        question_id: question_id,
        option_text: option_text,
        is_correct: is_correct,
    })
}

const getAnswers = async(question_id) => {
    const result = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $question_id;", {
        question_id: question_id,
    });
    return result.rows;
}

const deleteAnswer = async(id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id=$id;", {
        id: id,
    });

};

const insertAnswer = async(user_id, question_id, question_answer_option_id) => {
    await executeQuery("INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($user_id, $question_id, $question_answer_option_id);", {
        user_id: user_id,
        question_id: question_id,
        question_answer_option_id: question_answer_option_id,
    })

}

const getAnswerById = async(id) => {
    const result = await executeQuery("SELECT * FROM question_answer_options WHERE id=$id;", {
        id: id,
    });

    return result.rows[0];
}

const getCorrectanswerByQuestionId = async(question_id) => {
    const result = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$question_id AND is_correct=true", {
        question_id: question_id,
    });
    return result.rows[0];
}




export {addAnswer, deleteAnswer, getAnswers, insertAnswer, getAnswerById, getCorrectanswerByQuestionId}