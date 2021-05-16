import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Images from "../components/Images";

const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <Logo />
      <Images />
    </div>
  );
};

export default Home;
