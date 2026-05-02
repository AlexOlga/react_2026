const Spiner = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#ffd703"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="90"
        strokeDashoffset="30"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
export default Spiner;
