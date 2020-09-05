import { Typography, Select, Image } from "antd";

export const statusCodes = {
  OK: 200,
};

export const helperClassNames = {
  ACTIVE: `active-item-for-sc`,
};

export const { Title } = Typography;

export const { Option } = Select;

export const TIMEZONES = ['Europe/London', 'Europe/Warsaw', 'Europe/Kiev', 'Europe/Minsk', 'Europe/Moscow', 'Europe/Volgograd', 'Europe/Ekaterinburg', 'Asia/Tashkent', 'Asia/Tbilisi'];

export const LOGO: {width: number, src: string, alt: string} = {
  width: 83,
  src: 'https://app.rs.school/static/images/logo-rsschool3.png',
  alt: 'Rolling Scopes School Logo'
}