import styles from "./DeviceSwitcher.module.scss";
import { useEffect, useState } from "react";
import { MdComputer, MdDevices } from "react-icons/md";
import { Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { useSelector } from "react-redux";
import { playerSelector } from "redux/playerSlice";
import { DeviceType } from "utils/types";
import { fetchData, putData } from "utils/functions";
import { PLAYER_ENDPOINT, USER_DEVICES_ENDPOINT } from "utils/endpoints";
import { AiOutlineMobile } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";

const DeviceSwitcher = () => {
  const toast = useToast();
  const toastId = "device-toast";
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const getDevices = async () => {
    const data = await fetchData(USER_DEVICES_ENDPOINT);
    setDevices(data.devices);
  };
  useEffect(() => {
    getDevices();
  }, []);

  const handleDeviceClick = async (dev: DeviceType) => {
    await putData(PLAYER_ENDPOINT, { device_ids: [dev.id] });
    await getDevices();
    if (!toast.isActive(toastId)) {
      toast({
        description: `Playback transferred to ${dev.name}`,
        position: "top",
        id: toastId,
      });
    }
  };

  return (
    <div className={styles["container"]}>
      <Menu
        menuButton={<MdDevices className={styles["device-switcher-icon"]} />}
        theming="dark"
        direction="top"
        onClick={getDevices}
      >
        <h5>Active devices</h5>
        <MenuDivider />
        <div className={styles["devices-container"]}>
          {!!devices.length ? (
            devices.map((dev) => {
              return (
                <MenuItem key={dev.id} onClick={() => handleDeviceClick(dev)}>
                  <div className={styles["device"]}>
                    {dev.type === "Computer" ? (
                      <MdComputer className={styles["device-icon"]} />
                    ) : (
                      <AiOutlineMobile className={styles["device-icon"]} />
                    )}
                    <p
                      key={dev.id}
                      className={dev.is_active ? styles["device-active"] : ""}
                    >
                      {dev.name}
                    </p>
                  </div>
                </MenuItem>
              );
            })
          ) : (
            <MenuItem>No active devices</MenuItem>
          )}
        </div>
      </Menu>
    </div>
  );
};

export default DeviceSwitcher;
