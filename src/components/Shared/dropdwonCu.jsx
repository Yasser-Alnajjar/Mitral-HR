import { AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance } from "redux/slices/attendance-slice";
import { Whisper, IconButton, Popover, Dropdown } from "rsuite";
const RenderMenu = ({ onClose, left, top, className }, ref) => {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleSelect = (eventKey) => {
    onClose();
    console.log(eventKey);
  };
  const styles = {
    backgroundColor: `${theme.mode === "dark" ? "#1a1a1a" : "#f6f7fc"}`,
    color: `${theme.mode === "dark" ? "#f6f7fc" : "#1a1a1a "}`,
  };
  return (
    <Popover
      ref={ref}
      className={className}
      style={({ left, top }, styles)}
      full
    >
      <Dropdown.Menu style={styles} onSelect={handleSelect}>
        <Dropdown.Item
          onClick={() => dispatch(updateAttendance({ attend: true }))}
          className={theme.mode}
          eventKey={3}
        >
          Attend
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(updateAttendance({ attend: true }))}
          className={theme.mode}
          eventKey={4}
        >
          Leave
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const Dorpmenu = () => {
  const { theme } = useSelector((state) => state);
  return (
    <Whisper
      appearance="subtle"
      placement="leftStart"
      trigger="click"
      speaker={RenderMenu}
    >
      <IconButton className={theme.mode} icon={<AiOutlineMore />} />
    </Whisper>
  );
};
export default Dorpmenu;
