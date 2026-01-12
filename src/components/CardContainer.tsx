import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function CardContainer({ children }: Props) {
  return <div className="rounded-md overflow-hidden ">{children}</div>;
}

export default CardContainer;
