import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export function ErrorToast(error) {
  const { theme } = useSelector((state) => state);
  if (error) {
    toast.error(error.message, {
      style: {
        background: theme.mode === "dark" ? "#1a1a1a" : "#f6f7fc",
        color: theme.mode === "dark" ? "#f6f7fc" : "#1a1a1a",
      },
    });
  }
}
