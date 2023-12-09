export default class MessageCreateDto {
  chat_id: string;
  sender_id: string;
  book_id?: string;
  content?: string;
  photo_url?: string | null;
}
