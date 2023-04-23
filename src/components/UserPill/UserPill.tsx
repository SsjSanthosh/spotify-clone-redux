import { useSelector } from "react-redux";
import styles from "./UserPill.module.scss";
import { Menu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { userSelector } from "redux/userSlice";
import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";
const UserPill = () => {
  const { profile } = useSelector(userSelector);
  if (!profile) return null;
  return (
    <div className={styles["container"]}>
      <Menu
        menuButton={
          <div className={styles["menu-button"]}>
            <div className={styles["menu-button-image-container"]}>
              <Image
                fill
                alt={profile?.display_name}
                src={profile.images[0].url as string}
              />
            </div>
            <span>{profile.display_name}</span>
            <AiFillCaretDown />
          </div>
        }
        theming="dark"
        transition
        direction="bottom"
        offsetX={-50}
        offsetY={4}
      >
        <a target="_blank" href="https://open.spotify.com/">
          <MenuItem>Open web player</MenuItem>
        </a>
        <a target="_blank" href="https://open.spotify.com/user/ssjdextrous">
          <MenuItem>Your profile</MenuItem>
        </a>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserPill;
