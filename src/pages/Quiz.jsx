import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleQuiz = {
  title: "Week 1 Quiz: Python Basics",
  questions: [
    {
      id: 1,
      question: "What is the output of print(2 * 3 + 5)?",
      options: ["11", "16", "10", "13"],
      answer: "11",
    },
    {
      id: 2,
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "lambda"],
      answer: "def",
    },
  ],
};

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = sampleQuiz.questions.filter(
    (q) => answers[q.id] === q.answer
  ).length;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{sampleQuiz.title}</h1>
      {!submitted ? (
        <>
          {sampleQuiz.questions.map((q) => (
            <div key={q.id} className="mb-6">
              <h2 className="font-semibold mb-2">{q.question}</h2>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="block bg-gray-100 p-2 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt}
                      className="mr-2"
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="bg-green-100 p-6 rounded shadow-md text-lg text-center">
          <p className="font-semibold text-green-700 mb-2">
            ✅ You scored {score} / {sampleQuiz.questions.length}
          </p>
          <button
            onClick={() => navigate("/modules")}
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Modules
          </button>
        </div>
      )}
    </div>
  );
}
