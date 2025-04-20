import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const sampleQuiz = {
  week: 1,
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
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const score = sampleQuiz.questions.filter(
    (q) => answers[q.id] === q.answer
  ).length;

  const total = sampleQuiz.questions.length;
  const mastery = score >= 0.8 * total;

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleOptionSelect = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setSaving(true);

    const { error } = await supabase.from("user_progress").upsert([
      {
        user_id: userId,
        week: sampleQuiz.week,
        score,
        attempts: 1,
        mastered: mastery,
      },
    ]);

    if (error) {
      console.error("❌ Error saving quiz result:", error.message);
    } else {
      console.log("✅ Quiz result saved!");
    }

    setSaving(false);
  };

  const goToNextQuiz = () => {
    navigate(`/quiz?week=${sampleQuiz.week + 1}`);
  };

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
            ✅ You scored {score} / {total}
          </p>
          <p>
            {mastery
              ? "🎉 Great job! You’ve mastered this week."
              : "🔁 Consider reviewing this module before moving ahead."}
          </p>

          <div className="mt-6 space-x-4">
            <button
              onClick={() => navigate("/modules")}
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {saving ? "Saving..." : "Back to Modules"}
            </button>

            {mastery && (
              <button
                onClick={goToNextQuiz}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                🚀 Next Quiz →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
