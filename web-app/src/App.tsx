import { useLocation, useRoutes } from "react-router-dom";
import routes from "./configs/routes";
import { NotifierContextProvider } from "./contexts/NotifierContext";
import { GlobalNotifier } from "./helpers/Notify/Alert";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AuthActionsKind } from "./contexts/AuthContext/types";
import { ConfirmContextProvider } from "./contexts/ConfirmContext";
import GlobalConfirm from "./helpers/Confirm/GlobalConfirm";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const [authData, authDispach] = useContext(AuthContext);
  const chatId = "7dcf5e5f-5720-4059-a30d-db57de48cc79";
  const receiverId = "2176e13d-a767-41a0-bcf8-7c78234def81";

  useEffect(() => {
    window.scrollTo(0, 0);
    authDispach({ type: AuthActionsKind.VERIFY });
  }, [location.pathname, authDispach]);

  useEffect(() => {
    if (authData && authData.valid && authData.userData) {
      const socket = io(process.env.REACT_APP_API_URL as string, {
        extraHeaders: {
          "x-access-token": Cookies.get("x-access-token") as string,
        },
      });

      socket.on(`user-connect-${authData.userData.id}`, (arg) => {
        console.log("user-connect:", arg);
      });

      socket.on(`user-disconnect-${authData.userData.id}`, (arg) => {
        console.log("user-disconnect:", arg);
      });

      socket.on(`receive-message-${chatId}-${receiverId}`, (arg) => {
        console.log("receive-message:", arg);
      });

      socket.on(`receive-chat-${receiverId}`, (arg) => {
        console.log("receive-chat:", arg);
      });

      socket.on(`update-messages-${receiverId}`, (arg) => {
        console.log("updated-messages:", arg);
      });

      socket.on(`deleted-message-${receiverId}`, (arg) => {
        console.log("deleted-message:", arg);
      });

      const handleEnterInChat = () => {
        socket.emit("enter-in-chat", chatId);
      };

      window.addEventListener("click", handleEnterInChat);

      return () => {
        if (authData && authData.valid && authData.userData) {
          socket.off(`user-connect-${authData.userData.id}`);
          socket.off(`user-disconnect-${authData.userData.id}`);
          socket.off(`receive-message-${chatId}-${receiverId}`);
          socket.off(`receive-chat-${receiverId}`);
          socket.off(`updated-messages-${receiverId}`);
          socket.off(`deleted-messages-${receiverId}`);
          window.removeEventListener("click", handleEnterInChat);
        }
      };
    }
  }, [authData]);

  return (
    <NotifierContextProvider>
      <ConfirmContextProvider>
        <GlobalConfirm />
        <GlobalNotifier />
        {useRoutes(routes)}
      </ConfirmContextProvider>
    </NotifierContextProvider>
  );
}

export default App;
