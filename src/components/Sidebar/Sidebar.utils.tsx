import { NavlinkType, UserActionLink } from "./Sidebar.types";
import { AiFillHome, AiOutlineSearch, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscLibrary } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";

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
    link: "/genres",
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
    icon: (
      <div className={styles["navlink-user-action-create-icon-container"]}>
        <IoMdAdd className={styles["navlink-user-action-icon"]} />
      </div>
    ),
    link: "/playlist",
    text: "Create Playlist",
    iconContainerClassName: "create-icon",
    key: nanoid(),
  },
  {
    icon: (
      <div className={styles["navlink-user-action-like-icon-container"]}>
        <AiFillHeart className={styles["navlink-user-action-icon"]} />
      </div>
    ),
    link: "/user-tracks",
    text: "Liked Songs",
    iconContainerClassName: "like-icon",
    key: nanoid(),
  },
];
