
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function generateWeatherDescription(weatherData) {
    
    const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 100,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      };
      // The Gemini 1.5 models are versatile and work with most use cases
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",  generationConfig });

    const prompt = `Generate a detailed weather report based on the following data: Location: ${weatherData.name}, Temperature: ${weatherData.temperature}°C, Humidity: ${weatherData.humidity}%, Weather: ${weatherData.description}, Wind Speed: ${weatherData.windSpeed} km/h.and one more thing don't use date and time and give me the report in paragraph`;
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }
  
module.exports = generateWeatherDescription;