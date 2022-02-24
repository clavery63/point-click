import { MapCoord, MapPosition } from 'game/store/types';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
  outerRect: {
    width: '200px',
    height: '200px',
    border: '1px solid gray',
    position: 'relative',
    cursor: 'pointer',
  },
  innerRect: {
    width: '40px',
    height: '40px',
    position: 'absolute',
  },
});

const zeroThroughFour: MapCoord[] = [0, 1, 2, 3, 4];

const isSet = (p: MapPosition, x: number, y: number) => p.x === x && p.y === y;

type Props = {
  label: string;
  value: MapPosition;
  onChange: (value: MapPosition) => void;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MapPositioner = ({ label, value, onChange }: Props) => {
  const styles = useStyles();
  return (
    <div>
      <Typography>{label}</Typography>
      <div className={styles.outerRect}>
        {zeroThroughFour.flatMap(x => zeroThroughFour.map(y => (
          <div
            key={`${x},${y}`}
            className={styles.innerRect}
            style={{
              left: `${x * 40}px`,
              top: `${y * 40}px`,
              backgroundColor: isSet(value, x, y) ? 'black' : 'white',
            }}
            onClick={() => {
              onChange({ x, y });
            }}
          />
        )))}
      </div>
    </div>
  );
};

export default MapPositioner;
