const path = require("path");
const fs = require("fs");

exports.handler = async (event, context) => {
	try {
		// Get the path to the questions.json file
		const filePath = path.resolve(__dirname, "../../src/questions.json");
		const questions = fs.readFileSync(filePath, "utf-8");

		// Return the JSON file as the API response
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: questions,
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Failed to load questions.json" }),
		};
	}
};
