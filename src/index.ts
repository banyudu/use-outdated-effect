import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

const useAsyncEffect = (
  effect: (outdated: () => boolean, unmounted: () => boolean, ) => ReturnType<EffectCallback> | Promise<ReturnType<EffectCallback>>,
  inputs?: DependencyList,
) => {
  const asyncFlag = useRef<number>(0);

  useEffect(() => { asyncFlag.current += 1 }, inputs);

  useEffect(function () {
    let result: ReturnType<EffectCallback> | undefined;
    let unmounted = false;
    const innerAsyncFlag = asyncFlag.current;
    const maybePromise = effect(
      () => asyncFlag.current !== innerAsyncFlag,
      () => unmounted,
    );

    Promise.resolve(maybePromise).then((value) => { result = value });

    return () => {
      unmounted = true;
      if (result) {
        result?.();
      }
    };
  }, inputs);
};

export default useAsyncEffect;
