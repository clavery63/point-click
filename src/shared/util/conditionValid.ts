import { Condition, Entity, Operator } from 'game/store/types';
import get from 'shared/util/get';

const getPredicate = (operator: Operator) => ({
  LT: (l: number, r: number) => l < r,
  EQ: (l: number, r: number) => l === r,
  GT: (l: number, r: number) => l > r,
}[operator]);

const conditionValid = (condition: Condition, object: Entity) => {
  const { field, value: targetValue, operator } = condition;

  const predicate = getPredicate(operator);

  // TODO: defaulting to 0 isn't really what we want.
  // We need to improve the typing on `field` and potentially make the field itself
  // mandatory on the entity
  const value = get(object, field) || 0;

  return (value !== undefined) && predicate(value, targetValue);
};

// TODO: This should operate on a list of conditions, not "condition wrapper"s
// We did this because we wanted to return some of the surrounding data too
// But we're probably better off just returning an index
type ConditionWrapper = { condition: Condition };
export const getValidCondition = <T extends ConditionWrapper>(wrappers: T[], object: Entity) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const wrapper of wrappers) {
    if (conditionValid(wrapper.condition, object)) {
      return wrapper;
    }
  }

  return null;
};

export default conditionValid;
