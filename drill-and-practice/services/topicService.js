import { executeQuery } from "../database/database.js";

const getTopics = async () => {
    const result = await executeQuery("SELECT* FROM topics ORDER BY name");
    return result.rows;
};

const deleteTopic = async (id) => {
    await executeQuery("DELETE FROM topics WHERE id=$id;", {
        id: id,
    });

};

const addTopic = async (user_id, name) => {
    await executeQuery("INSERT INTO topics (user_id, name) VALUES ($user_id, $name);", {
        user_id: user_id,
        name: name,
    })
}

export {getTopics, deleteTopic, addTopic}