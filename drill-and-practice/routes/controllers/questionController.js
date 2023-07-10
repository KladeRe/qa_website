import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { validate, required, minLength } from "../../deps.js";
const showQuestions = async ({render, request, params}) => {
    
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    console.log("I got here")
    console.log(urlParts[2])
    const questions = await questionService.listQuestions(urlParts[2]);
    
    const data = {
        topicId: urlParts[2],
        questions: questions,
    };

    render("topic.eta", data)
}

const appendQuestion = async ({request, response, render, state, params}) => {
    const body = request.body({ type: "form" });
    const parameters = await body.value;
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const questions = await questionService.listQuestions(urlParts[2]);


    const user = await state.session.get("user");

    

    const validationRules = {
        question_text: [required, minLength(1)],
    }

    const data = {
        question_text: parameters.get("question_text"),
    }

    const [passes,errors] = await validate(data, validationRules)

    if (passes) {
        
        await questionService.addQuestion(user.id, urlParts[2], parameters.get("question_text"));
        response.redirect(`/topics/${urlParts[2]}`);
    } else {
        const errorData = {
            error: "The question must include at least one character!",
            topic_id: urlParts[2],
            questions: questions,
        }

        render("topic.eta", errorData)

    }

}

const showQuestion = async({params, render}) => {
    const question = await questionService.getQuestionById(params.qId)
    const answers = await answerService.getAnswers(params.qId)
    const data = {
        question_text: question.question_text,
        id: question.id,
        topic_id: question.topic_id,
        answers: answers
    }
    render("question.eta", data)

}


const removeQuestion = async ({params, response}) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.id}`);
}

export {showQuestions, appendQuestion, showQuestion, removeQuestion}

