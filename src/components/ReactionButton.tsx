import Lottie from "lottie-react";
import { Button, type ButtonProps } from "./Button";
import { useState } from "react";

export interface ReactionButtonProps extends ButtonProps {
  animation: object;
}

let animationLoopedOnce = false;

export function ReactionButton(props: ReactionButtonProps) {
  const { animation, ...rest } = props;
  const [isFocused, setFocused] = useState(false);

  return (
    <Button
      {...rest}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPointerEnter={() => setFocused(true)}
      onPointerLeave={() => setFocused(false)}
    >
      <Lottie
        key={isFocused ? "force-a" : "force-b"}
        animationData={animation}
        autoplay={isFocused || !animationLoopedOnce}
        loop={isFocused || 1}
        className="lottie"
        style={{ width: "20px", height: "20px" }}
        onLoopComplete={() => (animationLoopedOnce = true)}
      />
    </Button>
  );
}
