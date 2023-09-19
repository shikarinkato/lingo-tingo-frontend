import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearState } from "../redux/Slices";
import { useNavigate } from "react-router-dom";
import { MatchingElements } from "../utils/Features";

const Result = () => {
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const correctAns = MatchingElements(
    result,
    words.map((i) => i.word)
  );

  console.log(result);
  console.log(words.map((i) => i.meaning));

  console.log(correctAns);

  const percentage = (correctAns / words.length) * 100;
  console.log(percentage);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const resetHandler = () => {
    navigate("/");
    dispatch(clearState());
  };

  useEffect(() => {
    if (words.length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="font-semibold text-3xl text-[#14b8a6]">Result</h1>
      <span>
        You Made {correctAns} out of {words.length}
      </span>
      <div className="grid grid-cols-2 gap-x-16 ml-4">
        <div className="flex justify-center items-center flex-col gap-y-2">
          <h3 className="text-xl">Correct Ans</h3>
          {words.map((i, idx) => (
            <span key={i.word}>
              {idx + 1} : {i.word}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center flex-col gap-y-2">
          <h3 className="text-xl">Your Ans</h3>
          {result.map((i, idx) => (
            <span key={idx}>
              {idx + 1} : {i}
            </span>
          ))}
        </div>
      </div>
      <h2
        className={
          percentage < 50
            ? "text-red-600 text-xl"
            : "text-[#42b883] font-semibold text-xl"
        }
      >
        {percentage < 50 ? "Fail" : "Pass"}
      </h2>
      <button
        onClick={resetHandler}
        className="bg-red-600 py-2 px-4 w-[6rem] hover:shadow-lg text-white rounded-md"
      >
        Reset
      </button>
    </div>
  );
};

export default Result;
