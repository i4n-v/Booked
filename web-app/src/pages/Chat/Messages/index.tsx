import { FormProvider, useForm } from "react-hook-form";
import { ChatMessages, ChatMessagesContainer, NewMessage } from "./styles";
import Input from "../../../components/Input";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import Message from "./Message";
import useMessage from "../../../services/useMessage";
import { useMutation, useQuery } from "react-query";
import useChat from "../../../services/useChat";
import { IChat } from "../../../services/useChat/types";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { IMessage } from "../../../services/useMessage/types";
import socket from "../../../configs/socket";
import IUser from "../../../commons/IUser";

export default function Messages({ chat }: { chat: IChat }) {
  const form = useForm({
    defaultValues: {
      message: "",
    },
  });

  const [messagesToShow, setMessagesToShow] = useState<IMessage[]>([]);

  const [authData] = useContext(AuthContext);

  const receiver: IUser =
    chat.first_user.id !== authData?.userData?.id
      ? chat.first_user
      : chat.second_user;

  const { createMessage } = useMessage();
  const { getMessages } = useChat();
  const chatMessages = useQuery(
    ["chatMessages"],
    () => getMessages(chat.id as string, {}),
    {
      onSuccess: (data) => {
        setMessagesToShow((curr) => [...data.items.reverse(), ...curr]);
      },
      suspense: false,
    }
  );
  const sendMutation = useMutation({
    mutationFn: createMessage,
    mutationKey: "sendMessage",
  });

  const sendMessage = form.handleSubmit(({ message }: { message: string }) => {
    if (!message) return;
    sendMutation.mutate(
      {
        chat_id: chat.id as string,
        content: message,
        receiver_id: receiver.id as string,
        sender_id: authData?.userData?.id as string,
      },
      {
        onSuccess: (data) => {
          form.reset();
          setMessagesToShow((curr) => [
            { content: message, sender: authData?.userData } as IMessage,
            ...curr,
          ]);
        },
      }
    );
  });

  useEffect(() => {
    socket.emit("enter-in-chat", chat.id);
    socket.on(`receive-message-${chat.id}-${authData?.userData?.id}`, (arg) => {
      setMessagesToShow((curr) => [arg, ...curr]);
    });
    return () => {
      socket.off(`receive-message-${chat.id}-${authData?.userData?.id}`);
    };
  }, []);

  return (
    <ChatMessagesContainer>
      <NewMessage>
        <FormProvider {...form}>
          <form onSubmit={sendMessage}>
            <Input type="text" name="message" inputProps={{ maxLength: 255 }} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ fontSize: "32px" }}
            >
              <Send />
            </Button>
          </form>
        </FormProvider>
      </NewMessage>
      <ChatMessages>
        {/* <Box sx={{textAlign: "center",font: t => t.font.xs}}>
              Someone is typing...
            </Box> */}
        {messagesToShow?.map((message, index, array) => {
          const itsMine = message.sender?.id === authData?.userData?.id;
          const showProfile =
            array[index - 1]?.sender?.id !== message.sender?.id;
          return (
            <Message
              key={index}
              content={message.content}
              showAccount={showProfile}
              response={!itsMine}
            />
          );
        })}
      </ChatMessages>
    </ChatMessagesContainer>
  );
}
