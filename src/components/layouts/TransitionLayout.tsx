import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Layout from "./Layout";

enum Transition {
  FADE_IN = "fadeIn",
  FADE_OUT = "fadeOut",
}

interface TransitionLayoutProps {
  route: string;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({
  children,
  route,
}) => {
  const [displayRoute, setDisplayRoute] = useState(route);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<Transition>(
    Transition.FADE_OUT
  );

  useEffect(() => {
    setTransitionStage(Transition.FADE_IN);
  }, []);

  useEffect(() => {
    if (route !== displayRoute) {
      setTransitionStage(Transition.FADE_OUT);
    }
  }, [route, displayRoute]);

  const handleTransitionEnd = () => {
    if (transitionStage === Transition.FADE_OUT) {
      setDisplayRoute(route);
      setDisplayChildren(children);
      setTransitionStage(Transition.FADE_IN);
    }
  };

  return (
    <Layout>
      <div
        onTransitionEnd={handleTransitionEnd}
        className={clsx("opacity-0 duration-300", {
          "opacity-100": transitionStage === Transition.FADE_IN,
        })}
      >
        {displayChildren}
      </div>
    </Layout>
  );
};

export default TransitionLayout;
