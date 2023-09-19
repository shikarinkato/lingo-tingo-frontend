import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveResult } from "../redux/Slices";

const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [enable, setEnable] = useState<boolean>(false);
  const [ans, setAns] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAns(e.target.value);
  };

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };

  const { words } = useSelector((state: { root: StateType }) => state.root);
  useEffect(() => {
    if (count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result));
  }, [result]);

  // console.log(ans);

  return (
    <div className="w-[20vw] flex flex-col gap-y-6">
      <span>Quiz</span>
      <div className="text-3xl font-semibold">
        {count + 1}- {words[count]?.meaning}
      </div>
      <span>Meaning</span>
      <div className="flex flex-col gap-x-4">
        {words[count]?.options.map((i) => {
          return (
            <div key={i} className="flex  flex-row gap-x-3 items-center">
              <input
                type="radio"
                value={i}
                checked={ans === i}
                id="radio"
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="radio">{i}</label>
            </div>
          );
        })}
      </div>
      <button
        className={
          ans === ""
            ? "bg-gray-400 w-[100%] rounded-md py-2 text-white"
            : "bg-[#14b8a6] w-[100%] rounded-md py-2 text-white"
        }
        onClick={
          count === words.length ? () => navigate("/result") : nextHandler
        }
        disabled={ans === ""}
      >
        {count === words.length - 1 ? "Result" : "Next"}
      </button>
    </div>
  );
};

// onClick={()=> setEnable(!enable)}

export default Quiz;
