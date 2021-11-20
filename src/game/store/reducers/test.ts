type Address = {
  postCode: string
  street: [string, string | undefined]
}

type UserInfo = {
  address: Address
  previousAddress?: Address
}

type GetFieldType<Obj, Path> = Path extends `${infer Left}.${infer Right}`
  ? Left extends keyof Obj
    ? GetFieldType<Exclude<Obj[Left], undefined>, Right> | Extract<Obj[Left], undefined>
    : undefined
  : Path extends keyof Obj
    ? Obj[Path]
    : undefined

function getValue<
  TData,
  TPath extends string,
  TDefault = GetFieldType<TData, TPath>
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split('.')
    .reduce<GetFieldType<TData, TPath>>(
      (value, key) => (value as any)?.[key],
      data as any
    );

  return value !== undefined ? value : (defaultValue as TDefault);
}

const testFn = () => {
  const chris: UserInfo = {
    address: {
      postCode: '11211',
      street: ['one', 'two']
    }
  }

  const someValue = getValue(chris, 'previousAddress.street');
}

export default testFn;
