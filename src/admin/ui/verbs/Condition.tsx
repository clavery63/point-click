import { Card, Typography } from '@mui/material';
import {
  Condition, Item, Nullable, Operator,
} from 'game/store/types';
import { isEqual } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ValidPathsFor } from 'shared/util/types';
import LongTextField from '../shared/LongTextField';
import Selector, { makeOptions } from '../shared/Selector';

type LocalCondition = {
  field?: ValidPathsFor<Item, Nullable<number>>;
  operator?: Operator;
  value?: number;
};

const validate = (condition: LocalCondition): [Nullable<Condition>, Nullable<string>] => {
  const { field, operator, value } = condition;
  if (!field) {
    return [null, 'Field must be set'];
  }
  if (!operator) {
    return [null, 'Operator must be set'];
  }
  if (!value) {
    return [null, 'Value must be set'];
  }

  return [{ field, operator, value }, null];
};

type Props = {
  condition?: Condition;
  onChange: (c: Condition) => void;
};
const ConditionEdit = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { condition, onChange } = props;
  const [localCondition, setLocalCondition] = useState<Nullable<LocalCondition>>(condition);

  const handleChange = useCallback((fieldName: keyof Condition) => useCallback((value: any) => {
    setLocalCondition({
      ...localCondition,
      [fieldName]: value,
    });
  }, []), []);

  useEffect(() => {
    if (localCondition && !isEqual(localCondition, condition)) {
      const [validCondition, error] = validate(localCondition);
      if (error) {
        console.log('error setting condition:', error);
      }

      if (validCondition) {
        onChange(validCondition);
      }
    }
  }, [localCondition, onChange]);

  return (
    <Card>
      <Typography variant="overline" display="block" margin="10px">
        Custom Condition
      </Typography>
      <LongTextField
        label="field"
        value={localCondition?.field}
        onChange={handleChange('field')}
      />
      <Selector
        required
        label="operator"
        value={localCondition?.operator}
        onChange={handleChange('operator')}
        options={makeOptions(Object.keys(Operator))}
      />
      <LongTextField
        label="value"
        value={localCondition?.value?.toString()}
        onChange={val => {
          if (val) {
            handleChange('value')(parseInt(val, 10));
          }
        }}
      />
    </Card>
  );
};

export default ConditionEdit;
