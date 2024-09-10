import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  CardContainer,
  InfoContainer,
  Text,
  StatusText,
  PositionSolicitationBadge,
  OptionButton,
} from "./styles";
import { ISolicitationStatus } from "@/types/Solicitation";
import { SolicitationCardProps } from "./types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetList } from "@/components/BottomSheets";
import { MaterialIcons } from "@expo/vector-icons";

export default function SolicitationCard({
  book,
  id,
  status,
  user,
  updateStatus,
}: SolicitationCardProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [options, setOptions] = useState<any[]>([]);
  const bottomSheetRef = useRef<any>(null);

  const colors: Record<ISolicitationStatus, string> = {
    pending: "#9B51E0",
    accepted: "#009306",
    canceled: "#FBE200",
    refused: "#FF4747",
  };

  const badgeColor = colors[status];

  useEffect(() => {
    const newOptions = [];

    if (user?.id && user.id === book?.user?.id && status === "pending") {
      newOptions.push({
        id: "3",
        name: "Cancelar",
        icon: "close",
        onPress: () => updateStatus(id, "canceled"),
      });
    }

    if (book?.user?.id && book.user.id === user?.id && status === "pending") {
      newOptions.push(
        {
          id: "1",
          name: "Aceitar",
          icon: "check",
          onPress: () => updateStatus(id, "accepted"),
        },
        {
          id: "2",
          name: "Recusar",
          icon: "close",
          onPress: () => updateStatus(id, "refused"),
        },
      );
    }

    setOptions(newOptions);

    return () => {
      setOptions([]);
    };
  }, [status, user, book, id, updateStatus]);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSelectItem = (item: any) => {
    setSelectedItem(item.id);
    item.onPress();
    bottomSheetRef.current?.dismiss();
  };
  return (
    <View>
      <CardContainer>
        <BottomSheetList
          ref={bottomSheetRef}
          snapPoints={["20%"]}
          flatListProps={{
            data: options,
            renderItem: ({ item }) => {
              const isSelected = selectedItem === item.id;
              return (
                <OptionButton isSelected={isSelected} onPress={() => handleSelectItem(item)}>
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color="#9B51E0"
                    style={{ marginRight: 10 }}
                  />
                  <Text>{item.name}</Text>
                </OptionButton>
              );
            },
            keyExtractor: (item) => item.id,
            ListEmptyComponent: <Text>Nenhum item encontrado</Text>,
          }}
        />

        <InfoContainer
          onPress={() => {
            if (status === "pending") {
              handleOpenBottomSheet();
            }
          }}
        >
          <Text>
            Status: <StatusText>{status}</StatusText>
          </Text>
          <Text>
            Livro Solicitado: <StatusText>{book?.name}</StatusText>
          </Text>
          <Text>
            Solicitante: <StatusText>{user?.name}</StatusText>
          </Text>
          <Text>
            Responsável pela solicitação: <StatusText>{book?.user?.name}</StatusText>
          </Text>
        </InfoContainer>
        <PositionSolicitationBadge badgeColor={badgeColor} />
      </CardContainer>
    </View>
  );
}
