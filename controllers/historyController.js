const OpenAI = require('openai');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

exports.getHistory = async (req, res, next) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Please write two paragraphs on the history of mustaches." }],
            model: "gpt-3.5-turbo",
          });
          content = completion.choices[0].message.content;

          res.render('history', {
            pageTitle: "History of the Mustache",
            path: "/history",
            content: content
          })
    } catch (err) {
        console.log(err);
    }
    
}


