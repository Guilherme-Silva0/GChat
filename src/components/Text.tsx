import { FunctionComponent } from "react";

interface TextProps {
  children: React.ReactNode;
  paragraph?: boolean;
  className?: string;
}

const Text: FunctionComponent<TextProps> = ({
  children,
  paragraph,
  className,
}) => {
  return paragraph ? (
    <h2
      className={`text-slate-950 transition-all dark:text-gray-200 ${className}`}
    >
      {children}
    </h2>
  ) : (
    <p
      className={`text-slate-950 transition-all dark:text-gray-200 ${className}`}
    >
      {children}
    </p>
  );
};

export default Text;
