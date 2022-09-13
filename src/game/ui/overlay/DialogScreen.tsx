import React from 'react';
import { Group, Rect } from 'react-konva';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

const Avatar = () => {
  return (
    <Rect x={201} y={10} width={45} height={60} fill="black" />
  );
};

type AnswerProps = { lines: string[]; index: number };
const Answer = ({ lines, index }: AnswerProps) => {
  const images = useSelector(state => state.images);
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

const DialogScreen = () => {
  const question = [
    "well why don't we put a",
    'couple of lines of text',
    'here. OK, it seems like',
    '4 lines is the max.',
  ];

  const answers = [
    ["I don't know. why don't you", 'tell me?'],
    ['I mean, as far as I can tell', 'it looks fine'],
    ['No clue.'],
    ['Does the extra space here', 'look awkward?'],
  ];

  return (
    <Group
      x={0}
      y={0}
      width={256}
      height={240}
    >
      <Rect width={256} height={240} fill="gray" />
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
          lines={answer}
          index={index}
        />
      ))}
    </Group>
  );
};

export default DialogScreen;
