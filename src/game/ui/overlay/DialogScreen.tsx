import { textToLines } from 'game/store/epics/util';
import { DialogAnswer, DialogPage } from 'game/store/types';
import React, { useEffect, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

const frame$ = (numFrames: number) => interval(16).pipe(
  takeWhile((frame: number) => frame <= numFrames),
);

const computeDialog = (page: DialogPage, currentFrame: number) => {
  const answersTruncated = page.answers.slice(0, page.answers.length - 1);
  const startFrames = answersTruncated.reduce((acc, cur) => {
    acc.push(acc[acc.length - 1] + cur.text.length);
    return acc;
  }, [page.question.length]);

  return {
    question: page.question.slice(0, currentFrame),
    answers: startFrames.map((startFrame, index) => ({
      text: page.answers[index].text.slice(0, Math.max(currentFrame - startFrame, 0)),
      addFlags: page.answers[index].addFlags,
      removeFlags: page.answers[index].removeFlags,
    })),
  };
};

const Avatar = () => {
  return (
    <Rect x={201} y={10} width={45} height={60} fill="black" />
  );
};

type AnswerProps = { answer: DialogAnswer; index: number };
const Answer = ({ answer, index }: AnswerProps) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images);
  const lines = textToLines(28)(answer.text);
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
      {lines.map((line, lineNumber) => (
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

    return () => subscription.unsubscribe();
  }, [dialogPage]);

  if (dialogPage == null) {
    return null;
  }

  const { question, answers } = computeDialog(dialogPage, currentFrame);

  const questionLines = textToLines(23)(question);

  return (
    <Group
      x={0}
      y={0}
      width={256}
      height={240}
    >
      <Rect width={256} height={240} fill="#bbbbbb" />
      <Avatar />
      {questionLines.map((line, lineNumber) => (
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
