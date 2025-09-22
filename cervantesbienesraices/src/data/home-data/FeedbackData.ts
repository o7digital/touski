import { StaticImageData } from "next/image";

import feedbackThumb_1 from "@/assets/images/media/img_01.jpg";
import feedbackThumb_2 from "@/assets/images/media/img_02.jpg";
import feedbackThumb_3 from "@/assets/images/media/img_03.jpg";

import feedback3Thumb_1 from "@/assets/images/media/img_01.jpg";
import feedback3Thumb_2 from "@/assets/images/media/img_02.jpg";
import feedback3Thumb_3 from "@/assets/images/media/img_03.jpg";

import quoteIcon from "@/assets/images/icon/icon_29.svg";

interface DataType {
   id: number;
   page: string;
   desc: string;
   title: string;
   country: string;
   thumb: StaticImageData;
   quote_icon: StaticImageData;
}

const feedback_data: DataType[] = [
   {
      id: 1,
      page: "home_3",
      desc: "El servicio fue muy eficiente y amable, nos guiaron perfectamente en todo el proceso. Estamos felices con nuestra nueva casa. ¡Gracias!",
      title: "Mariana López",
      country: "Polanco, CDMX",
      thumb: feedback3Thumb_1,
      quote_icon: quoteIcon,
   },
   {
      id: 2,
      page: "home_3",
      desc: "Encontramos la casa de nuestros sueños en Valle de Bravo. Muy buena experiencia de principio a fin. Gracias por el excelente servicio.",
      title: "Carlos Ramírez",
      country: "Valle de Bravo, Edo. de México",
      thumb: feedback3Thumb_2,
      quote_icon: quoteIcon,
   },
   {
      id: 3,
      page: "home_3",
      desc: "Atención rápida y cercana, entendieron exactamente lo que buscábamos. Estamos muy satisfechos con nuestro nuevo hogar.",
      title: "Fernanda González",
      country: "Naucalpan, Edo. de México",
      thumb: feedback3Thumb_3,
      quote_icon: quoteIcon,
   },
   {
      id: 4,
      page: "home_3",
      desc: "Un servicio de primera, nos dieron confianza en cada paso. Definitivamente los recomendamos.",
      title: "Jorge Hernández",
      country: "Polanco, CDMX",
      thumb: feedback3Thumb_2,
      quote_icon: quoteIcon,
   },

   // home_5

   {
      id: 1,
      page: "home_5",
      desc: "Una experiencia que nos cambió la vida. Todo fue ágil, sencillo y seguro. ¡Altamente recomendable!",
      title: "Ana Martínez",
      country: "Valle de Bravo, Edo. de México",
      thumb: feedbackThumb_1,
      quote_icon: quoteIcon,
   },
   {
      id: 2,
      page: "home_5",
      desc: "Gracias a ellos encontramos una propiedad perfecta para invertir. Gran acompañamiento durante todo el proceso.",
      title: "Luis Torres",
      country: "Naucalpan, Edo. de México",
      thumb: feedbackThumb_2,
      quote_icon: quoteIcon,
   },
   {
      id: 3,
      page: "home_5",
      desc: "Muy profesionales y atentos, resolvieron todas nuestras dudas. Hoy disfrutamos de nuestra nueva casa en Polanco.",
      title: "Gabriela Sánchez",
      country: "Polanco, CDMX",
      thumb: feedbackThumb_3,
      quote_icon: quoteIcon,
   },
]

export default feedback_data;
