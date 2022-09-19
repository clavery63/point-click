import { textToLines } from 'game/store/epics/util';
import React, { useEffect, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

type DialogAnswerWithLines = {
  text: string[];
  addFlags?: string[] | undefined;
  removeFlags?: string[] | undefined;
};

const frame$ = (numFrames: number) => interval(100).pipe(
  takeWhile((frame: number) => frame <= numFrames),
);

const truncateLines = (inputLines: string[], frame: number) => {
  const result = inputLines.reduce((acc, cur) => {
    if (acc.remaining <= 0) {
      return acc;
    }
    return {
      lines: [
        ...acc.lines,
        cur.slice(0, acc.remaining),
      ],
      remaining: acc.remaining - cur.length,
    };
  }, { lines: [] as string[], remaining: frame });

  return result.lines;
};

const computeDialog = (
  question: string[],
  answers: DialogAnswerWithLines[],
  currentFrame: number,
) => {
  const answersTruncated = answers.slice(0, answers.length - 1);
  const startFrames = answersTruncated.reduce((acc, cur) => {
    acc.push(acc[acc.length - 1] + cur.text.join().length);
    return acc;
  }, [question.join().length]);

  return {
    question: truncateLines(question, currentFrame),
    answers: startFrames.map((startFrame, index) => ({
      text: truncateLines(answers[index].text, Math.max(currentFrame - startFrame, 0)),
      addFlags: answers[index].addFlags,
      removeFlags: answers[index].removeFlags,
    })),
  };
};

const Avatar = () => {
  return (
    <Rect x={201} y={10} width={45} height={60} fill="black" />
  );
};

type AnswerProps = { answer: DialogAnswerWithLines; index: number };
const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images);
  const top = 100 + index * 34;
  return (
    <>
      <Image
        image={images.get('menu-button')}
        x={10}
        y={top}
        onClick={() => {
          if (answer.addFlags != null) {
            dispatch({ type: 'ADD_FLAGS', payload: answer.addFlags });
          }

          if (answer.removeFlags != null) {
            dispatch({ type: 'REMOVE_FLAGS', payload: answer.removeFlags });
          }
        }}
      />
      {answer.text.map((line, lineNumber) => (
        <Text
          key={lineNumber}
          left={20}
          top={top + lineNumber * 13}
          text={line}
        />
      ))}
    </>
  );
};

const DialogScreen = () => {
  const dialogPage = useSelector(state => {
    const { dialog: dialogId = -1 } = state.playerState;
    const dialog = state.worldState.dialogs[dialogId];
    if (dialog == null) {
      return null;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const page of (dialog.pages || [])) {
      if (!page.prereqFlags?.some(flag => !state.flags.includes(flag))) {
        return page;
      }
    }

    return null;
  });

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (dialogPage == null) {
      return () => {};
    }
    const { question, answers } = dialogPage;
    const totalLength = question.length + answers.join('').length;
    const subscription = frame$(totalLength).subscribe(setCurrentFrame);

    return () => {
      setCurrentFrame(0);
      subscription.unsubscribe();
    };
  }, [dialogPage]);

  if (dialogPage == null) {
    return null;
  }

  const inputQuestion = textToLines(23)(dialogPage.question);
  const inputAnswers = dialogPage.answers.map(answer => ({
    ...answer,
    text: textToLines(28)(answer.text),
  }));

  const { question, answers } = computeDialog(inputQuestion, inputAnswers, currentFrame);

  return (
    <Group
      x={0}
      y={0}
      width={256}
      height={240}
    >
      <Rect width={256} height={240} fill="#bbbbbb" />
      <Avatar />
      {question.map((line, lineNumber) => (
        <Text
          key={lineNumber}
          left={10}
          top={14 + lineNumber * 13}
          text={line}
        />
      ))}
      {answers.map((answer, index) => (
        <Answer
          key={index}
          answer={answer}
          index={index}
        />
      ))}
    </Group>
  );
};

export default DialogScreen;
