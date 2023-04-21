import { NavlinkType, UserActionLink } from "./Sidebar.types";
import { AiFillHome, AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import {BsBookmark} from "react-icons/bs";

import styles from "./Sidebar.module.scss";
import { nanoid } from "nanoid";

export const NAVLINKS: NavlinkType[] = [
  {
    icon: <AiFillHome className={styles["navlink-icon"]} />,
    link: "/",
    text: "Home",
    key: nanoid(),
  },
  {
    icon: <AiOutlineSearch className={styles["navlink-icon"]} />,
    link: "/search",
    text: "Search",
    key: nanoid(),
  },
  {
    icon: <VscLibrary className={styles["navlink-icon"]} />,
    link: "/library",
    text: "Library",
    key: nanoid(),
  },
];

export const USER_LINKS: UserActionLink[] = [
  {
    icon: <IoMdAdd className={styles["navlink-user-action-icon"]} />,
    link: "/playlist",
    text: "Create Playlist",
    iconContainerClassName: "create-icon",
    key: nanoid(),
  },
  {
    icon: <AiOutlineHeart className={styles["navlink-user-action-icon"]} />,
    link: "/liked-songs",
    text: "Liked Songs",
    iconContainerClassName: "like-icon",
    key: nanoid(),
  },
  {
    icon: <BsBookmark className={styles["navlink-user-action-icon"]} />,
    link: "/episodes",
    text: "Your Episodes",
    iconContainerClassName: "episodes-icon",
    key: nanoid(),
  },
];
