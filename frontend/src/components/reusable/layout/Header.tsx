import { Link } from "react-router-dom";
import vodafoneLogo from "../../../../public/vodafone.png";

export default function Header() {
  return (
    <header className="flex bg-primary px-6 py-4 justify-between items-center mb-8">
      <Link to={"/_VOIS-internship"}>
        <h1 className="text-xl text-white font-bold">_VOIS TrainingHub</h1>
      </Link>
      <Link to={"/_VOIS-internship"}>
        <img className="w-16 h-16" src={vodafoneLogo} alt="Vodafone Logo"></img>
      </Link>
    </header>
  );
}
