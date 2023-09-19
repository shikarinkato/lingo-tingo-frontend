import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-y-12 home">
      <div className=" flex justify-center items-center">
        <h1 className="font-semibold text-5xl ml-[6rem] leading-12  text-teal-500">
          Welcome, Begin Your Journey Of Learning
        </h1>
      </div>
      <div className=" grid grid-cols-4 gap-8">
        {languages.map((i) => {
          return (
            <button
              onClick={() => {
                languageSelectHandler(i.code);
              }}
              className=" text-white bg-teal-600 py-2 px-4 rounded-lg hover:shadow-lg"
              key={i.code}
            >
              {i.name}
            </button>
          );
        })}
      </div>
      <span className="font-semibold text-xl">
        Choose One Language from Above
      </span>
    </div>
  );
};

export default Home;
