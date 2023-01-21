import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "Search Bears with Paint Brushes the Starry Night, painted by Vincent Van Gogh.."
  );
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setPlaceholder(`Search ${prompt}..`);
    try {
      setLoading(true);
      const res = await openai.createImage({
        prompt: prompt || placeholder,
        n: 1,
        size: "512x512",
      });
      setResult(res.data.data[0].url);
    } catch (error) {
      console.log("error----->", error);
      setLoading(false);
    }
  };
  return (
    <div className="app-main">
      {loading ? (
        <>
          <h2>Generating..Please Wait..</h2>
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <h2 style={{ color: "black" }}>
            Generate an Image using Open AI API
          </h2>

          <textarea
            className="app-input"
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            rows="10"
            cols="40"
          />
          <button onClick={generateImage} style={{ color: "white" }}>
            Generate an Image
          </button>
          {result.length > 0 ? (
            <img className="result-image" src={result} alt="result" />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default App;
