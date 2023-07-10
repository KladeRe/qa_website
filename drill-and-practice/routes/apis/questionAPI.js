import * as questionService from "../../services/questionService.js"
import * as answerService from "../../services/answerService.js"

const getRandomQuestion = async ({ response }) => {
    const questions = await questionService.getAllQuestions();
    console.log(questions)

    if (questions.length > 0) {
        const chosenQuestion = questions[Math.floor(Math.random() * questions.length)];

        const options = await answerService.getAnswers(chosenQuestion.id);

        let preferredOptions = []

        for (const option of options) {
            preferredOptions.push({
                optionId: option.id,
                optionText: option.option_text
            })

        };

        response.body = {
            questionId: chosenQuestion.id,
            questionText: chosenQuestion.question_text,
            answerOptions: preferredOptions
        }

    } else {
        response.body = {}
    }
}

const getValidityOfAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });

    const content = await body.value;


    const option = await answerService.getAnswerById(content.optionId);
    const correct_option = await answerService.getCorrectanswerByQuestionId(content.questionId);
    if (option.id === correct_option.id) {

        response.body = { correct: true }
    } else {
        response.body = { correct: false }
    };

}

export { getRandomQuestion, getValidityOfAnswer }