import { useState } from "react";
import { supabase } from "../supabaseClient"; // assuming you already have this

const mockQuestions = [
  {
    subject: "Mathematics",
    question: "What is the derivative of x²?",
    options: ["2x", "x", "x²", "2"],
    answer: "2x"
  },
  {
    subject: "Physics",
    question: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Pascal", "Watt"],
    answer: "Newton"
  },
  {
    subject: "Chemistry",
    question: "What is the chemical formula of water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    answer: "H2O"
  },
  {
    subject: "Aptitude",
    question: "What comes next: 2, 4, 8, 16, __?",
    options: ["18", "24", "32", "36"],
    answer: "32"
  },
  {
    subject: "English",
    question: "Choose the synonym of 'happy'.",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    answer: "Joyful"
  },
  {
    subject: "General Studies",
    question: "Who is the President of India as of 2025?",
    options: ["Droupadi Murmu", "Narendra Modi", "Ram Nath Kovind", "Amit Shah"],
    answer: "Droupadi Murmu"
  }
];

export default function FinalExam() {
  const [examStarted, setExamStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (index, selectedOption) => {
    setAnswers({ ...answers, [index]: selectedOption });
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from("final_exam_responses")
      .insert([
        {
          user_id: user.id,
          responses: answers,
          submitted_at: new Date(),
        }
      ]);

    if (error) {
      console.error("Error submitting final exam:", error);
      alert("Failed to submit. Please try again.");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">✅ Exam Submitted</h1>
        <p className="text-gray-600 text-lg">
          Thank you for participating! 🎉 <br />
          Results will be announced on <b>June 5, 2025</b>.
        </p>
      </div>
    );
  }

  if (examStarted) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">📝 Final Exam</h1>
        {mockQuestions.map((q, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold">{index + 1}. {q.subject}: {q.question}</h2>
            <div className="mt-2 space-y-2">
              {q.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleOptionChange(index, option)}
                      className="accent-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Submit Final Exam
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">📝 Final Exam</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your national-level final exam is scheduled for <b>May 5, 2025</b>.<br />
        You can attempt it now below.
      </p>
      <button
        onClick={() => setExamStarted(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
      >
        Start Final Exam
      </button>
    </div>
  );
}
