const handler: ProxyHandler<Record<string, unknown>> = {
  get: (target, prop) =>
    prop in target
      ? target[prop as keyof typeof target]
      : new Proxy({}, handler),
  set: () => {
    throw new Error(`Setting properties on this object is not allowed.`);
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const anything = new Proxy<Record<string, unknown>>({}, handler) as any;
