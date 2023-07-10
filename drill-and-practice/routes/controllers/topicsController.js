import * as topicService from "../../services/topicService.js"
import { validate, required, minLength } from "../../deps.js";

const showTopics = async ({ state, render}) => {
    const topics = await topicService.getTopics();
    let data = {}
    const user = await state.session.get("user");
    if (user.admin) {
        data = {
            topics: topics,
            admin: true,
            name: "",
        }
        
    } else {
        data = {
            topics: topics,
            admin: false,
            name: "",
        }
    }
    
    render("topics.eta", data)
};

const insertTopic = async({request, response, state, render}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const user = await state.session.get("user");
    const topics = await topicService.getTopics();

    const validationRules = {
        name: [required, minLength(1)],
    }

    const data = {
        name: params.get("name"),
    }

    const [passes,errors] = await validate(data, validationRules)

    if (passes) {
        await topicService.addTopic(user.id, params.get("name"));
        response.redirect("/topics");
    } else {
        const errorData = {
            topics: topics,
            errors: "The name of the topic must have at least one character!",
            admin: true,
            name: params.get("name"),
        }
        render("topics.eta", errorData);
    }
}

const removeTopic = async({response, params, state}) => {

    const user = await state.session.get("user");
    if (user.admin) {
        await topicService.deleteTopic(params.id);
        response.redirect("/topics");
        
    } else {
        response.redirect("topics");
    }
    

    
}



export {showTopics, insertTopic, removeTopic}