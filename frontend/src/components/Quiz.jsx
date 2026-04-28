import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { CheckCircle2, XCircle, Trophy, BookOpen, Brain } from "lucide-react";
const quizQuestions = [
  {
    id: 1,
    question: "In which year was the Taj Mahal completed?",
    options: ["1632", "1643", "1653", "1665"],
    correctAnswer: 2,
    explanation: "The Taj Mahal was completed in 1653, taking approximately 22 years to build. Construction began in 1632 under Emperor Shah Jahan.",
    category: "Mughal Architecture"
  },
  {
    id: 2,
    question: "Which Mughal emperor built the Red Fort in Delhi?",
    options: ["Akbar", "Shah Jahan", "Aurangzeb", "Jahangir"],
    correctAnswer: 1,
    explanation: "Emperor Shah Jahan built the Red Fort (Lal Qila) between 1638-1648 when he shifted his capital from Agra to Delhi.",
    category: "Historical Facts"
  },
  {
    id: 3,
    question: "How many UNESCO World Heritage Sites are featured in this collection?",
    options: ["5", "6", "8", "10"],
    correctAnswer: 2,
    explanation: "There are 8 UNESCO World Heritage Sites in our collection: Taj Mahal, Red Fort, Qutub Minar, Amber Fort, Ajanta Caves, Ellora Caves, Hampi, Konark Sun Temple, and Khajuraho Temples.",
    category: "UNESCO Sites"
  },
  {
    id: 4,
    question: "The Konark Sun Temple is designed in the shape of a:",
    options: ["Lotus Flower", "Chariot", "Peacock", "Elephant"],
    correctAnswer: 1,
    explanation: "The Konark Sun Temple is designed as a massive chariot with 24 elaborately carved stone wheels pulled by seven horses, representing the Sun God Surya's chariot.",
    category: "Architecture"
  },
  {
    id: 5,
    question: "Which architectural style does Hawa Mahal belong to?",
    options: ["Dravidian", "Indo-Islamic", "Rajput", "Gothic"],
    correctAnswer: 2,
    explanation: "Hawa Mahal (Palace of Winds) is built in Rajput architectural style with 953 small windows (jharokhas) made from red and pink sandstone.",
    category: "Architecture"
  },
  {
    id: 6,
    question: "Which of these sites is NOT a fort?",
    options: ["Amber Fort", "Red Fort", "Qutub Minar", "Gateway of India"],
    correctAnswer: 2,
    explanation: "Qutub Minar is a victory tower/minaret, not a fort. It's a 73-meter tall tower built of red sandstone and marble.",
    category: "Monument Types"
  },
  {
    id: 7,
    question: "The Golden Temple in Amritsar is the holiest shrine of which religion?",
    options: ["Hinduism", "Buddhism", "Sikhism", "Jainism"],
    correctAnswer: 2,
    explanation: "The Golden Temple (Harmandir Sahib) is the holiest shrine in Sikhism. It was completed in 1604 and welcomes people of all faiths.",
    category: "Religious Heritage"
  },
  {
    id: 8,
    question: "Hampi was the capital of which ancient empire?",
    options: ["Maurya Empire", "Gupta Empire", "Vijayanagara Empire", "Chola Empire"],
    correctAnswer: 2,
    explanation: "Hampi served as the capital of the Vijayanagara Empire from 1336-1565 CE. At its peak, it was one of the richest and largest cities in the world.",
    category: "Historical Facts"
  },
  {
    id: 9,
    question: "Which caves feature Buddhist, Hindu, and Jain monuments together?",
    options: ["Ajanta Caves", "Elephanta Caves", "Ellora Caves", "Badami Caves"],
    correctAnswer: 2,
    explanation: "Ellora Caves uniquely feature 34 caves representing three different religions - Buddhism, Hinduism, and Jainism - carved adjacent to each other, symbolizing religious harmony.",
    category: "Cultural Diversity"
  },
  {
    id: 10,
    question: "How many light bulbs illuminate Mysore Palace during festivals?",
    options: ["50,000", "75,000", "100,000", "150,000"],
    correctAnswer: 2,
    explanation: "Mysore Palace is illuminated with nearly 100,000 light bulbs every Sunday evening and during the 10-day Dasara festival, creating a spectacular sight.",
    category: "Festivals & Celebrations"
  }
];
function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(quizQuestions.length).fill(false)
  );
  const [userAnswers, setUserAnswers] = useState(
    new Array(quizQuestions.length).fill(-1)
  );
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };
  const handleNext = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    if (!answeredQuestions[currentQuestion]) {
      if (isCorrect) {
        setScore(score + 1);
      }
      const newAnswered = [...answeredQuestions];
      newAnswered[currentQuestion] = true;
      setAnsweredQuestions(newAnswered);
    }
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
    } else {
      setShowResult(true);
      if (onComplete) {
        onComplete(isCorrect ? score + 1 : score, quizQuestions.length);
      }
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
    }
  };
  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
    setUserAnswers(new Array(quizQuestions.length).fill(-1));
  };
  const progress = (currentQuestion + 1) / quizQuestions.length * 100;
  const currentQ = quizQuestions[currentQuestion];
  if (showResult) {
    const percentage = score / quizQuestions.length * 100;
    let message = "";
    let emoji = "";
    if (percentage >= 80) {
      message = "Outstanding! You are a true Heritage Expert!";
      emoji = "\u{1F3C6}";
    } else if (percentage >= 60) {
      message = "Great job! You have good knowledge of Indian heritage!";
      emoji = "\u{1F31F}";
    } else if (percentage >= 40) {
      message = "Good effort! Keep exploring to learn more!";
      emoji = "\u{1F4DA}";
    } else {
      message = "Keep learning! Visit more places to expand your knowledge!";
      emoji = "\u{1F4A1}";
    }
    return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-3xl mx-auto shadow-xl", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Trophy, { className: "w-12 h-12 text-white" }) }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl mb-2", children: "Quiz Completed!" }),
        /* @__PURE__ */ jsxs(CardDescription, { className: "text-xl", children: [
          emoji,
          " ",
          message
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-6xl mb-4", children: [
            score,
            "/",
            quizQuestions.length
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600", children: "Questions Answered Correctly" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsx(Progress, { value: percentage, className: "h-4" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-2", children: [
              percentage.toFixed(0),
              "% Score"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-center mb-4", children: "Review Your Answers" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-96 overflow-y-auto", children: quizQuestions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            return /* @__PURE__ */ jsx(Card, { className: `border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`, children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              isCorrect ? /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6 text-green-600 flex-shrink-0 mt-1" }) : /* @__PURE__ */ jsx(XCircle, { className: "w-6 h-6 text-red-600 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxs("p", { className: "mb-2", children: [
                  index + 1,
                  ". ",
                  q.question
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [
                  "Your answer: ",
                  /* @__PURE__ */ jsx("span", { className: isCorrect ? "text-green-700" : "text-red-700", children: q.options[userAnswers[index]] })
                ] }),
                !isCorrect && /* @__PURE__ */ jsxs("p", { className: "text-sm text-green-700 mb-2", children: [
                  "Correct answer: ",
                  q.options[q.correctAnswer]
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 italic", children: q.explanation })
              ] })
            ] }) }) }, q.id);
          }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-4 justify-center", children: /* @__PURE__ */ jsxs(Button, { onClick: handleRestart, size: "lg", className: "gap-2", children: [
          /* @__PURE__ */ jsx(Brain, { className: "w-5 h-5" }),
          "Try Again"
        ] }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-3xl mx-auto shadow-xl", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-sm", children: [
          "Question ",
          currentQuestion + 1,
          " of ",
          quizQuestions.length
        ] }),
        /* @__PURE__ */ jsx(Badge, { className: "bg-blue-600", children: currentQ.category })
      ] }),
      /* @__PURE__ */ jsx(Progress, { value: progress, className: "h-2 mb-4" }),
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2 text-2xl", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-6 h-6" }),
        "Heritage Knowledge Quiz"
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Test your knowledge about India's magnificent heritage sites" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl mb-4", children: currentQ.question }),
        /* @__PURE__ */ jsx(
          RadioGroup,
          {
            value: selectedAnswer?.toString(),
            onValueChange: (value) => handleAnswerSelect(parseInt(value)),
            children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: currentQ.options.map((option, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-blue-400 hover:bg-blue-50 ${selectedAnswer === index ? "border-blue-500 bg-blue-100" : "border-gray-200 bg-white"}`,
                onClick: () => handleAnswerSelect(index),
                children: [
                  /* @__PURE__ */ jsx(RadioGroupItem, { value: index.toString(), id: `option-${index}` }),
                  /* @__PURE__ */ jsx(
                    Label,
                    {
                      htmlFor: `option-${index}`,
                      className: "flex-1 cursor-pointer text-base",
                      children: option
                    }
                  )
                ]
              },
              index
            )) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Trophy, { className: "w-5 h-5 text-yellow-600" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Current Score: ",
            score,
            "/",
            currentQuestion + (answeredQuestions[currentQuestion] ? 1 : 0)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-600", children: [
          answeredQuestions.filter((a) => a).length,
          " answered"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4 justify-between", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handlePrevious,
            disabled: currentQuestion === 0,
            variant: "outline",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleNext,
            disabled: selectedAnswer === null,
            className: "gap-2",
            children: currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Quiz
};
