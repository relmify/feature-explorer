// TODO - determine if these are actually useful!

export const conditionally = <Args, Result>(options: {
  readonly if: (args: Args) => unknown;
  readonly then: (args: Args) => Result;
  readonly else: (args: Args) => Result;
}) => (args: Args) => {
  return options.if(args) ? options.then(args) : options.else(args);
};

export function tryCatch<Args, Result>({
  tryer,
  catcher,
}: {
  readonly tryer: (args: Args) => Result;
  readonly catcher: (args: Args, message: string) => Result;
}) {
  return (args: Args) => {
    // eslint-disable-next-line functional/no-try-statement
    try {
      return tryer(args);
    } catch (e) {
      return catcher(args, e.message);
    }
  };
}
