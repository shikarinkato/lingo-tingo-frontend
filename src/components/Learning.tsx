import VolumeUp from "../images/volume.png";
import ArrrowBack from "../images/icons8-left-arrow-24.png";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/Features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/Slices";
import Loader from "./Loader";
const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");

  const audioRef = useRef(null);

  const dispatch = useDispatch();

  const params = useSearchParams()[0].get("language") as LangType;

  const navigate = useNavigate();

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };

  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count].meaning, params);
      setAudioSrc(data);
    }
  };

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr) => dispatch(getWordsSuccess(arr)))
      .catch((err) => getWordsFail(err));

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-y-6">
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
      <span
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <img className="h-[30px] w-[25px] cursor-pointer" src={ArrrowBack} alt="" />
      </span>
      <span>Learning Made Easy</span>
      <div className="flex flex-row text-3xl gap-x-4 items-center font-semibold">
        <h1>
          {count + 1} - {words[count]?.word}
        </h1>
        <h1> : {words[count]?.meaning}</h1>
        <button onClick={audioHandler}>
          <img className="h-[30px]" src={VolumeUp} alt="" />
        </button>
      </div>
      <button
        className="bg-[#14b8a6] rounded-md py-2 text-white"
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </button>
    </div>
  );
};

export default Learning;
