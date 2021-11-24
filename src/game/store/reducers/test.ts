type Address = {
  postCode: string
  street: [string, string | undefined]
}

type Cat = {
  name: string
}

type UserInfo = {
  address: Address
  previousAddress?: Address
  cats: Cat[]
}

type GetIndexedField<T, K> = K extends `${number}`
  ? number extends keyof T
    ? T[number]
    : undefined
  : undefined

type FieldWithPossiblyUndefined<T, Key> =
  | GetFieldType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>

type IndexedFieldWithPossiblyUndefined<T, Key> =
  | GetIndexedField<Exclude<T, undefined>, Key>
  | Extract<T, undefined>

type GetFieldType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey>, Right>
        : undefined
      : undefined
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? IndexedFieldWithPossiblyUndefined<T[FieldKey], IndexKey> | undefined
        : undefined
      : undefined

export function getValue<
  TData,
  TPath extends string,
  TDefault = GetFieldType<TData, TPath>
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split(/[.[\]]/)
    .filter(Boolean)
    .reduce<GetFieldType<TData, TPath>>(
      (value, key) => (value as any)?.[key],
      data as any
    );

  return value !== undefined ? value : (defaultValue as TDefault);
}

const testFn = (): Cat => {
  const myCats = [{ name: 'Oscar' }, { name: 'Oscar' }];
  const chris: UserInfo = {
    address: {
      postCode: '11211',
      street: ['one', 'two'],
    },
    cats: myCats
  }

  const cat = 'yo';

  const someCat = getValue(chris, `cats[${cat}]`);
  const otherCat = chris.cats[20];
  console.log(someCat);

  return otherCat;
}

export default testFn;
