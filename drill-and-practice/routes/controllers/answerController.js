import * as answerService from "../../services/answerService.js"
import * as questionService from "../../services/questionService.js";
import { validate, required, minLength } from "../../deps.js";

const appendAnswer = async ({request, params, response, render}) => {
    const question = await questionService.getQuestionById(params.qId)
    const answers = await answerService.getAnswers(params.qId)

    const validationRules = {
        option_text: [required, minLength(1)],
    }


    const body = request.body({ type: "form" });
    const parameters = await body.value;

    const data = {
        option_text: await parameters.get("option_text")
    }

    const[passes, errors] = await validate(data, validationRules)

    if (passes && parameters.get("is_correct")) {
        await answerService.addAnswer(params.qId, parameters.get("option_text"), true);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);

    } else if (passes) {
        await answerService.addAnswer(params.qId, parameters.get("option_text"), false);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
        
    } else {
        const errorData = {
            errors: "Answer must be at least one character",
            question_text: question.question_text,
            id: question.id,
            topic_id: question.topic_id,
            answers: answers
        }
        render("question.eta", errorData)
    }

}

const removeAnswer = async ({params, response}) => {
    await answerService.deleteAnswer(params.oId);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
}

export {appendAnswer, removeAnswer}
