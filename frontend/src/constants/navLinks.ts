import { FaHome } from "react-icons/fa";
import { FaGift, FaUser } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { NavLink } from "../domain/entities/nav-link.entity";

const navLinks: NavLink[] = [
  {
    name: "Home",
    Icon: FaHome,
    route: "/",
  },
  {
    name: "Profile",
    Icon: FaUser,
    route: "/profile",
  },
  {
    name: "My Posts",
    Icon: BsFilePost,
    route: "/my-posts",
  },
  {
    name: "Claims",
    Icon: FaGift,
    route: "/claims",
  },
];

export { navLinks };
