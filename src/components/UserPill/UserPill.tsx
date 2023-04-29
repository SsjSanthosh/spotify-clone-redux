import { useSelector } from "react-redux";
import styles from "./UserPill.module.scss";
import { Menu, MenuItem, MenuDivider } from "@szhsin/react-menu";
import { clearUser, userSelector } from "redux/userSlice";
import Image from "next/image";
import {
  AiFillCaretDown,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
} from "react-icons/ai";
import { useAppDispatch } from "redux/types";
import { clearPlayer } from "redux/playerSlice";
import { deleteToken } from "redux/authSlice";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
const UserPill = () => {
  const { profile } = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  if (!profile) return null;
  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearPlayer());
    dispatch(deleteToken());
    toast({
      description:
        "You've been logged out, click the button below to start using the app again.",
      position: "top",
    });
    router.push("/login");
  };
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
        offsetX={10}
        offsetY={-200}
      >
        <a target="_blank" href="https://open.spotify.com/">
          <MenuItem>Open web player</MenuItem>
        </a>
        <a target="_blank" href="https://open.spotify.com/user/ssjdextrous">
          <MenuItem>Your profile</MenuItem>
        </a>
        <MenuDivider />
        <div className={styles["links-container"]}>
          <a
            target="_blank"
            href="https://github.com/SsjSanthosh/spotify-clone-redux"
          >
            <AiOutlineGithub size={25} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/ssj-santhosh/">
            <AiOutlineLinkedin size={25} />
          </a>
          <a target="_blank" href="mailto: abc@example.com">
            <AiOutlineMail size={25} />
          </a>
        </div>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserPill;
