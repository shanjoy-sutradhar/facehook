import { Link } from "react-router-dom";
import { useAuth } from "../hoooks/useAuth";
const HomePage = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div>
      <p>Home Page</p>
      <Link to="/me">Go to Profile Page</Link>
      {/* <p p className="text-center font-bold">
        {" "}
        {auth.user}{" "}
      </p> */}
    </div>
  );
};

export default HomePage;
