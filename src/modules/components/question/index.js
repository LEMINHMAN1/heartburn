import { isEmpty, reduce, sortBy } from "lodash";
import PropTypes from "prop-types";
import styled from "styled-components";
import actionType from "constant/ActionType";
import Button from "modules/components/button";
import Header from "modules/components/header";
import Option from "modules/components/option";
import { GlobalStateContext } from "modules/layout";
import React, { useContext, useEffect, useState } from "react";
import data from "./data";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .row {
    padding: 15px;
  }
  .col-md-4,
  .col-lg-6,
  .col-lg-4 {
    margin: 0 auto;
    height: 30rem;
    background: #fff;
    border-radius: 10px;
    -webkit-box-shadow: -2px 7px 22px 5px rgba(0, 0, 0, 0.27);
    box-shadow: -2px 7px 22px 5px rgba(0, 0, 0, 0.27);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .line {
      margin-top: -0.5rem;
      .total {
      }
      .complete {
        margin-top: -17px;
        margin-left: 0;
        width: 30px;
        background-color: #6accb9;
      }
    }
    .body {
      overflow: auto;
      .question {
        color: #3f6072;
      }
      .bookameeting {
        width: 100%;
        margin-top: 1rem;
        button {
          width: 100%;
        }
      }
      .outcome-text {
        font-weight: 400;
        font-size: 0.85rem;
      }
      .devider {
        border-top: unset;
        width: 50px;
        margin-left: 0;
        height: 3px;
        background: #eee;
        margin-top: 0.5rem;
      }
      .options {
        display: grid;
        grid-template-columns: 50% 50%;
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 0.75rem;
      .btn {
        width: 100%;
        &.btn-link {
          font-size: 0.85rem;
          margin-bottom: -0.5rem;
          color: #6accb9;
        }
      }
    }
  }
`;

const Comp = ({ onSubmit }) => {
  const [globalState, dispatch] = useContext(GlobalStateContext);
  const [answerId, setAnswerId] = useState(null);
  const [answerScore, setAnswerScore] = useState(0);
  const [question, setQuestion] = useState(null);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [outCome, setOutCome] = useState(null);
  const [scoreOutcomePairs, setScoreOutcomPairs] = useState([]);
  const [nextQuestionId, setNextQuestionId] = useState(null);
  const [percentCounting, setPercentCounting] = useState(0);

  useEffect(() => {
    if (data.questions) {
      const totalQuestion = data.questions.length;
      const percentCounting = (100 * historyIndex) / totalQuestion;
      setPercentCounting(percentCounting);
    }
  }, [historyIndex]);

  if (!globalState || isEmpty(data.questions)) return null;

  const answerHandler = (question, answer) => {
    // Answer
    setAnswerId(answer.id);
    setAnswerScore(answer.score);

    // Find next question
    let next_question = question.next.find(
      (e) => !e.answered || e.answered === answer.id
    );
    if (next_question) {
      if (!next_question.next_question) {
        setScoreOutcomPairs(question.next);
      }
      setNextQuestionId(next_question.next_question);
    }

    const history = globalState.history || [];
    const historyQuestionIndex = history.findIndex(
      (e) => e.questionId === question.id
    );

    // Change history
    if (historyQuestionIndex !== -1) {
      history[historyQuestionIndex].answerId = answer.id;
      history[historyQuestionIndex].score = answer.score;
    } else {
      // Add history
      if (
        !history.find(
          (e) => e.questionId === question.id && e.answerId === answer.id
        )
      ) {
        history.push({
          questionId: question.id,
          answerId: answer.id,
          score: answer.score,
        });
      }
    }
    dispatch({
      type: actionType.KEEP_HISTORY,
      history,
    });
  };

  const calcScore = () => {
    const history = globalState.history || [];
    const totalScore = reduce(history, (sum, item) => sum + item.score, 0);
    const sortPairs = sortBy(scoreOutcomePairs, "max_score");
    if (totalScore === 0) {
      const pair = sortPairs.find((e) => !e.max_score);
      if (pair) {
        const outcomeObj = data.outcomes.find((e) => e.id === pair.outcome);
        if (outcomeObj) setOutCome(outcomeObj);
      }
    } else {
      // Remove item doesn't include max_score or max_score = 0
      const _sortPairs = sortPairs.filter((e) => e.max_score);
      for (let index = 0; index < _sortPairs.length; index++) {
        if (
          totalScore <= _sortPairs[index].max_score ||
          index === _sortPairs.length - 1
        ) {
          const outcomeObj = data.outcomes.find(
            (e) => e.id === _sortPairs[index].outcome
          );
          setOutCome(outcomeObj);
          break;
        }
      }
    }
  };

  const nextQuestionHandler = () => {
    if (!isEmpty(scoreOutcomePairs) && historyIndex === globalState.history.length - 1) {
      calcScore();
      setPercentCounting(100);
      setIsCompleted(true);
      return;
    }

    const _historyIndex = historyIndex + 1;
    let history = globalState.history || [];

    // If user hasn't answer this question yet
    if (_historyIndex >= history.length) {
      const nextQuestion = data.questions.find((e) => e.id === nextQuestionId);
      setQuestion(nextQuestion);
      setAnswerId(null);
    } else {
      // If user answered this question and then user change the answer
      if (
        _historyIndex < history.length &&
        nextQuestionId !== history[_historyIndex].questionId
      ) {
        // Update history
        history = history.splice(0, _historyIndex);
        // history[_historyIndex - 1].answerId = answerId;
        // history[_historyIndex - 1].score = answerScore;
        dispatch({
          type: actionType.KEEP_HISTORY,
          history,
        });
        const nextQuestion = data.questions.find(
          (e) => e.id === nextQuestionId
        );
        setQuestion(nextQuestion);
        setAnswerId(null);

        // If user answered this question and doesn't change the answer
      } else {
        const historyItem = history[_historyIndex];
        const nextQuestion = data.questions.find(
          (e) => e.id === historyItem.questionId
        );
        if (nextQuestion) {
          setQuestion(nextQuestion);
          setAnswerId(historyItem.answerId);
          setAnswerScore(historyIndex.score);
          setNextQuestionId(
            nextQuestion.next.find(
              (e) => !e.answered || e.answered === historyItem.answerId
            ).next_question
          );
        }
      }
    }

    // Only count history index once user answered
    if (answerId) {
      setHistoryIndex(_historyIndex);
    }
  };

  const backQuestionHandler = () => {
    const _historyIndex = historyIndex - 1;
    if (_historyIndex >= 0) {
      const history = globalState.history || [];
      if (!isEmpty(history)) {
        const historyItem = history[_historyIndex];
        setAnswerId(historyItem.answerId);
        setAnswerScore(historyIndex.score);
        const question = data.questions.find(
          (e) => e.id === historyItem.questionId
        );
        setQuestion(question);
        let next_question = question.next.find(
          (e) => !e.answered || e.answered === historyItem.answerId
        );
        if (next_question) setNextQuestionId(next_question.next_question);
      }
      setHistoryIndex(_historyIndex);
    }
  };

  const onResetForm = () => {
    setAnswerId(null);
    setAnswerScore(0);
    setQuestion(null);
    setHistoryIndex(0);
    setIsCompleted(false);
    setOutCome(null);
    setScoreOutcomPairs([]);
    setNextQuestionId(null);
    setPercentCounting(0);
    dispatch({
      type: actionType.KEEP_HISTORY,
      history: [],
    });
  };

  const _question = !question ? data.questions[0] : question;

  return (
    <Wrapper>
      <div className="row">
        <div className="col-lg-4">
          <Header
            disabled={isCompleted || historyIndex === 0}
            onBack={backQuestionHandler}
            percentCompleted={percentCounting}
          />
          <div className="body">
            <div className="question">
              {!outCome
                ? _question.question_text
                : "Thank you for answering the questions!"}
            </div>
            <hr className="devider" />
            {outCome ? (
              <>
                <div className="outcome-text">{outCome.text}</div>

                {outCome.show_booking_button && (
                  <div className="bookameeting">
                    <Button text="Book a meeting" onClick={onSubmit} />
                  </div>
                )}
              </>
            ) : (
              !outCome && (
                <div className="options">
                  {_question.answers.map((ans) => (
                    <Option
                      key={ans.id}
                      text={ans.label}
                      selected={ans.id === answerId}
                      onClick={() => {
                        answerHandler(_question, ans);
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
          <div className="bottom">
            {!outCome ? (
              <Button
                disabled={!answerId}
                onClick={() => nextQuestionHandler()}
              />
            ) : (
              <button
                type="button"
                onClick={onResetForm}
                className="btn btn-link"
              >
                Back to start screen
              </button>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

Comp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Comp;
