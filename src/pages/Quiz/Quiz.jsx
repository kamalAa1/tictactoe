import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ClaimModal from "./Modals/ClaimModal";
import LoseModal from "./Modals/LoseModal";
// import questions from './questions';

function shuffle(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [choices, setChoices] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { bgColor, iconColor, currency, point } = queryString.parse(
    location.search
  );

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    setSelectedAnswers([]);
    showQuestion(0);
  };

  const showQuestion = (index) => {
    resetState();
    let currentQuestion = questions[index];
    let questionNumber = index + 1;
    setQuestionText(`${questionNumber}. ${currentQuestion.question}`);
    setQuestionType(`${currentQuestion.type}`);
    setQuestionImage(`${currentQuestion.image}`);
    const shuffledChoices = shuffle(currentQuestion.choices);
    setChoices(shuffledChoices);
    setCorrectAnswer(
      currentQuestion.choices.findIndex((choice) => choice.answer === true)
    );
    setSelectedAnswer(selectedAnswers[index] || null);
  };

  const resetState = () => {
    setChoices([]);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  const selectChoice = (isCorrect, index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1);
    } else {
      // If it's the last question, and question's length and selected answers length equal
      resetState();
      if (questions.length === score) {
        setShowModal(true);
      } else {
        setShowLoseModal(true);
      }
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://us-central1-rumbangapps-a056a.cloudfunctions.net/expressApi/faucet/get-quest"
        );

        setQuestions(data.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchQuestions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && questions.length !== 0) {
      startQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, questions]);

  return (
    <React.Fragment>
      <div
        className={`min-h-[100vh] flex flex-col`}
        style={{
          background: `#${bgColor}`,
        }}
      >
        <div className="flex items-center justify-center mt-8 gap-2">
          <img
            src={`/assets/${currency.toLowerCase()}.png`}
            alt="coin"
            className="w-8 h-8"
          />
          <Typography
            className={`rounded-t-md text-center text-dark font-semibold text-white uppercase`}
          >
            tic tac toe
          </Typography>
          <img
            src={`/assets/${currency.toLowerCase()}.png`}
            alt="coin"
            className="w-8 h-8"
          />
        </div>
        <Typography
          variant="paragraph"
          className="px-3 text-center my-3 text-white"
        >
          Get up to {point} {currency} for playing the game
        </Typography>
        <div
          className={`p-4 rounded space-y-3 text-white m-2 mt-12 mb-8`}
          style={{
            background: `#${iconColor}`,
          }}
        >
          <Typography variant="h4">Simple Quiz</Typography>
          <hr />
          {isLoading && (
            <div className="w-full animate-pulse">
              <Typography
                as="div"
                variant="h1"
                className="mb-2 h-6 w-full rounded bg-gray-300"
              >
                &nbsp;
              </Typography>
              {Array.from({ length: 4 }, (_, index) => (
                <Typography
                  key={index}
                  as="div"
                  variant="h1"
                  className="mb-2 h-10 w-full rounded bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ))}
            </div>
          )}
          {!isLoading && questions?.length !== 0 && (
            <div>
              <Typography variant="lead" className="mb-4">
                {questionText}
              </Typography>
              <div className="w-full">
                {questionType === "image" && (
                  <img
                    src={questionImage}
                    alt="img"
                    className="object-contain w-full h-24"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    className={`border p-2 rounded text-start`}
                    style={{
                      backgroundColor:
                        selectedAnswer === index
                          ? choice.answer
                            ? `#14b8a6`
                            : `#9e6a7e`
                          : "transparent",
                    }}
                    onClick={() => selectChoice(choice.answer, index)}
                    aria-label={choice.text}
                    disabled={selectedAnswer !== null}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-4 gap-2">
                {/* {currentQuestionIndex > 0 && (
                <Button
                  fullWidth
                  className="rounded shadow-none hover:shadow-none border text-white"
                  onClick={handlePrevButton}
                  style={{
                    border: `1px solid #${bgColor}`,
                  }}
                  variant="outlined"
                >
                  Previous
                </Button>
              )} */}
                {showNextButton && (
                  <Button
                    fullWidth
                    className="rounded shadow-none hover:shadow-none bg-teal-300"
                    onClick={handleNextButton}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <Typography
          variant="small"
          className="px-3 text-center my-3 text-white"
        >
          Version - 2
        </Typography>
      </div>
      {showModal && (
        <ClaimModal
          open={showModal}
          setOpen={setShowModal}
          score={score}
          questions={questions?.length}
        />
      )}
      {showLoseModal && (
        <LoseModal
          open={showLoseModal}
          setOpen={setShowLoseModal}
          score={score}
          questions={questions?.length}
        />
      )}
    </React.Fragment>
  );
}
