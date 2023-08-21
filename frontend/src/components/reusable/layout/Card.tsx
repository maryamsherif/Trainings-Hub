import classNames from "classnames";

export default function Card({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={classNames("", className)}>{children}</div>;
}
