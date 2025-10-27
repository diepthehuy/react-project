import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import useWindowResize from "./hooks/useWindowResize";

const Header = ({ title }) => {
  const {width} = useWindowResize();
  return (
    <header className="Header">
      <h1>{title}</h1>
      {width < 768 ? <FaMobileAlt/>
      : width < 992 ? <FaTabletAlt/>:<FaLaptop/>}
    </header>
  );
};

export default Header;
