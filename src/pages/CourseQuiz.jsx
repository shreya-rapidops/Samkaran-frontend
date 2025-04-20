import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CourseQuiz() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`);
      const data = await res.json();
      const formatted = data.results.map((q, i) => ({
        id: i + 1,
        question: decodeHTMLEntities(q.question),
        correct: q.correct_answer,
        options: shuffle([q.correct_answer, ...q.incorrect_answers].map(decodeHTMLEntities)),
      }));
      setQuestions(formatted);
    };

    fetchQuiz();
  }, [categoryId]);

  const decodeHTMLEntities = (str) =>
    str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");

  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  const handleSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const score = questions.filter(q => answers[q.id] === q.correct).length;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Mock Test</h1>

      {!submitted ? (
        <>
          {questions.map((q) => (
            <div key={q.id} className="mb-6">
              <h2 className="mb-2 font-semibold">{q.question}</h2>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label key={opt} className="block bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200">
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={opt}
                      className="mr-2"
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelect(q.id, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => setSubmitted(true)}
          >
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="bg-green-100 p-6 rounded text-lg text-center shadow-md">
          <p className="text-green-700 font-semibold">
            ✅ You scored {score} / {questions.length}
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
}
