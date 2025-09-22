interface MenuItem {
  id: number;
  title: string;
  class_name?: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
  menu_column?: {
    id: number;
    mega_title: string;
    mega_menus: {
      link: string;
      title: string;
    }[];
  }[];
}

const menu_data: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Quiénes Somos",
    link: "/#quienes-somos",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "Contacto",
    link: "/#contacto",
    has_dropdown: false,
  },
];

export default menu_data;
