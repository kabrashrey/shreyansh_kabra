import { useEffect, useState } from "react";
import "./toast.scss";
import { TOAST_EVENT } from "../../utils/ui";

/**
 * Global status toast. Anything can call showToast() from utils/ui;
 * the message is announced to screen readers via aria-live.
 */
const Toast = () => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 2200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`toast ${visible ? "is-visible" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default Toast;
