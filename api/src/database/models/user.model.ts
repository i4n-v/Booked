import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  BeforeValidate,
} from 'sequelize-typescript';
import UserDto from '../../dto/user/user.dto';
import UserCreateDto from '../../dto/user/userCreate.dto';
import { encrypt } from '../../utils';
import Assessment from './assessment.model';
import Acquisition from './acquisition.model';
import Book from './book.model';
import Authentication from './authentication.model';
import Comment from './comment.model';

@Table
export default class User extends Model<UserDto, UserCreateDto> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O nome é requerido.',
      },
    },
  })
  name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  user_name: string;

  @Unique({
    name: 'Users_email_key',
    msg: 'E-mail já cadastrado.',
  })
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'O e-mail é requerido.',
      },
      isEmail: {
        msg: 'E-mail inválido.',
      },
    },
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      notNull: {
        msg: 'A senha é requerida.',
      },
    },
  })
  password: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    validate: {
      notNull: {
        msg: 'A data de nascimento é requerida.',
      },
      isDate: {
        args: true,
        msg: 'Data de nascimento inválida.',
      },
    },
  })
  birth_date: Date;

  @AllowNull(true)
  @Column(DataType.STRING)
  photo_url: string;

  @Column(DataType.STRING)
  description: string;

  @HasMany(() => Book, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  books: Book[];

  @BelongsToMany(() => Book, () => Assessment, 'user_id')
  rated_books: Book[];

  @BelongsToMany(() => Book, () => Acquisition, 'user_id', 'book_id')
  acquisitions: Acquisition[];

  @HasMany(() => Authentication, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  authentications: Authentication[];

  @HasMany(() => Comment)
  comments: Comment[];

  @BeforeValidate
  static async hashPasswordBeforeValidate(user: UserCreateDto) {
    if (user.password) {
      const hashedPassword = await encrypt.hash(user.password);
      user.password = hashedPassword;
    }
  }
}
