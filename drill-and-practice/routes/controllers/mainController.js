import * as statisticsController from "../../services/statisticsService.js"

const showMain = async ({ render }) => {

    const data = {
        topicAmount: await statisticsController.getAllTopics(),
        questionAmount: await statisticsController.getAllQuestions(),
        answerAmount: await statisticsController.getAllAnswers(),
    }
    render("main.eta", data);
};


export { showMain };
