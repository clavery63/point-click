type Predicate<T> = (arg: T) => boolean;
type ArrayItemType<T> = T extends (infer Item)[] ? Item : T

const filter = <
  ObjectsType extends any[],
>(objects: ObjectsType, pred: Predicate<ArrayItemType<ObjectsType>>) => {
  const out: ArrayItemType<ObjectsType>[] = [];
  objects.forEach(object => {
    if (pred(object)) {
      out.push(object);
    }
  });
  return out as ObjectsType;
};

export default filter;
