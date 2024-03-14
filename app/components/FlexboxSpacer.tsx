export const FlexboxSpacer = ({
  maxWidth = 0,
  minWidth,
  className = "",
}: {
  maxWidth: number;
  minWidth?: number;
  className?: string;
}) => {
  return (
    <div
      className={`invisible shrink-[10000] grow ${className}`}
      style={{ maxWidth: `${maxWidth}px`, minWidth: `${minWidth}px` }}
    ></div>
  );
};
