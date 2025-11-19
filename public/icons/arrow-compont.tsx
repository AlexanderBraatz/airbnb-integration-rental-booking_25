import * as React from "react";
const ArrowSvgComp = ({
  className,
  stroke,
}: {
  className: string;
  stroke: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={20}
    fill="none"
    className={className}
  >
    <path
      //   stroke="#12A2C9"
      stroke={stroke}
      strokeWidth={2.6}
      d="M0 9.599h26.495m0 0L15.36 18.167M26.495 9.6 15.36 1.03"
    />
  </svg>
);
export default ArrowSvgComp;
