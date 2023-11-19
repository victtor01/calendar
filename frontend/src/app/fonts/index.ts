import { Roboto, Open_Sans, Inter, Varela_Round } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "300", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const valela = Varela_Round({
  subsets: ["latin-ext"],
  weight: ["400"],
});

export const fontRoboto = roboto.className;
export const fontOpenSans = openSans.className;
export const fontInter = inter.className;
export const fontValela = valela.className;