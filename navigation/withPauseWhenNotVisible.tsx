import * as React from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Text } from "../components/Themed";

const InnerWrapper: React.FC<{ visiblePromise: Promise<void> | undefined }> = ({
  visiblePromise,
  children,
}) => {
  if (visiblePromise) throw visiblePromise;

  return <>{children}</>;
};

const OuterWrapper: React.FC<{ label: string }> = ({ children, label }) => {
  const isFocused = useIsFocused();

  const [pauseUpdates, setPauseUpdates] = React.useState(!isFocused);

  React.useEffect(() => {
    if (isFocused) {
      setPauseUpdates(false);
    } else {
      const timeoutId = setTimeout(() => setPauseUpdates(true), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isFocused]);

  console.log("Render", label, isFocused);

  const resolveWhenVisible = React.useRef<
    { promise: Promise<void>; resolve: () => void } | undefined
  >(undefined);

  if (pauseUpdates && !resolveWhenVisible.current) {
    let resolve: () => void;
    const promise = new Promise<void>((innerResolve) => (resolve = innerResolve));
    //@ts-expect-error
    resolveWhenVisible.current = { promise, resolve };
  }

  if (!pauseUpdates && resolveWhenVisible.current) {
    resolveWhenVisible.current.resolve();
    resolveWhenVisible.current = undefined;
  }

  return (
    <React.Suspense fallback={<Text>Suspended {label}</Text>}>
      <InnerWrapper visiblePromise={resolveWhenVisible.current?.promise}>{children}</InnerWrapper>
    </React.Suspense>
  );
};

export const withPauseWhenNotVisible = (Component: React.ComponentType, label: string) => {
  return () => (
    <OuterWrapper label={label}>
      <Component />
    </OuterWrapper>
  );
};
