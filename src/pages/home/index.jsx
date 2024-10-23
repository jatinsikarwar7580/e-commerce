import { useSelector } from "react-redux";
import { ProductsList, Navbar } from "../../components";
import "./style.css";

const Home = () => {
  const userInfo = useSelector((state) => state.userData.userInfo);

  return (
    <div className="Home">
      <Navbar />
      <ProductsList />
    </div>
  );
};

export { Home };
