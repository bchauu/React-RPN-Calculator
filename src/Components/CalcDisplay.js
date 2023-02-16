import "./CalcDisplay.css";

const CalcDisplay = ({ value }) => {
  return (
    <div className="calcDisplay" mode="single" max={70}>
      {value}
    </div>
  );
};

export default CalcDisplay;