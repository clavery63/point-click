import { textToLines } from 'game/store/epics/util';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Group, Rect } from 'react-konva';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

const frame$ = (numFrames: number) => interval(16).pipe(
  takeWhile((frame: number) => frame <= numFrames),
);

type Dialog = { question: string; answers: string[] };
const computeDialog = (input: Dialog, currentFrame: number) => {
  const answersTruncated = input.answers.slice(0, input.answers.length - 1);
  const startFrames = answersTruncated.reduce((acc, cur) => {
    acc.push(acc[acc.length - 1] + cur.length);
    return acc;
  }, [input.question.length]);

  return {
    question: input.question.slice(0, currentFrame),
    answers: startFrames.map((startFrame, index) => {
      return input.answers[index].slice(0, Math.max(currentFrame - startFrame, 0));
    }),
  };
};

const Avatar = () => {
  return (
    <Rect x={201} y={10} width={45} height={60} fill="black" />
  );
};

type AnswerProps = { answer: string; index: number };
const Answer = ({ answer, index }: AnswerProps) => {
  const images = useSelector(state => state.images);
  const lines = textToLines(28)(answer);
  const top = 100 + index * 34;
  return (
    <>
      <Image image={images.get('menu-button')} x={10} y={top} />
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

const defaultDialog = {
  question: "well why don't we put a couple of lines of text here. OK, it seems like 4 lines is the max.",
  answers: [
    "I don't know. why don't you tell me?",
    'I mean, as far as I can tell it looks fine',
    'No clue.',
    'Does the extra space here look awkward?',
  ],
};

const DialogScreen = () => {
  const [inputDialog, setInputDialog] = useState(defaultDialog);

  const resetDialog = useCallback(() => {
    // TODO: just for testing. remove once we read this from the store
    setInputDialog({
      question: defaultDialog.question,
      answers: defaultDialog.answers,
    });
  }, []);

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {

  });

  useEffect(() => {
    const { question, answers } = inputDialog;
    const totalLength = question.length + answers.join('').length;
    const subscription = frame$(totalLength).subscribe(setCurrentFrame);

    return () => subscription.unsubscribe();
  }, [inputDialog]);

  const { question, answers } = computeDialog(inputDialog, currentFrame);

  const questionLines = textToLines(23)(question);

  return (
    <Group
      x={0}
      y={0}
      width={256}
      height={240}
      onClick={resetDialog}
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
