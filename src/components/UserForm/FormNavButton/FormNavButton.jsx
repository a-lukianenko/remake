export const FormNavButton = ({ type, isLastStep, stepBack, stepForward }) => {
  return (
    <button
      type={type}
      onClick={type === "button" ? stepBack : stepForward}
      className={isLastStep ? "accent-button" : ""}
      style={type === "button" ? style.btnBack : style.btnForward}
    >
      {isLastStep ? "Finish" : "Forward"}
    </button>
  );
};

const style = {
  btnBack: {
    display: "inline-block",
    backgroundColor: "#C1CFE0",
  },
  btnForward: {
    marginLeft: "10px",
  },
};
