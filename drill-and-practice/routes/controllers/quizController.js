import * as topicService from "../../services/topicService.js"
import * as questionService from "../../services/questionService.js"
import * as answerService from "../../services/answerService.js"

const showTopics = async ({render}) => {
    const topics = await topicService.getTopics();
    const data = {
        topics: topics,
    }
    render("quizes.eta", data)
}

const getRandomQuestion = async({response, params, state}) => {
    const questions = await questionService.listQuestions(params.tId)
    if (questions && questions.length > 0) {
        const result = questions[Math.floor(Math.random()* questions.length)];
        response.redirect(`/quiz/${params.tId}/questions/${result.id}`);
    } else {
        response.body = "There are no question ready for this topic!"
    }
    
}

const showOptions = async ({render, params}) => {
    const topic_id = params.tId
    const question = await questionService.getQuestionById(params.qId)
    const answer = await answerService.getAnswers(params.qId)

    const data = {
        topic_id: topic_id,
        question: question,
        answers: answer,
    }


    render("quiz.eta", data)
}

const checkAnswer = async ({response, params, state}) => {
    const user = await state.session.get("user");
    
    await answerService.insertAnswer(user.id, params.qId, params.oId);

    const answer = await answerService.getAnswerById(params.oId);

    if (answer.is_correct == true) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
  

}

const correctAnswer = async({render, params}) => {
    const data = {
        topic_id: params.tId
    }

    render("correct.eta", data)
}

const incorrectAnswer = async({render, params}) => {
    const correctAnswer = await answerService.getCorrectanswerByQuestionId(params.qId);

    
    const data = {
        correct_option: correctAnswer,
        topic_id: params.tId
    }

    render("incorrect.eta", data)


}

export {showTopics, getRandomQuestion, showOptions, checkAnswer, correctAnswer, incorrectAnswer}