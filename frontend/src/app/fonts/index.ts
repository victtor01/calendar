import { Roboto, Open_Sans } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "300", "500", "700"],
});

export const fontRoboto = roboto.className;
export const fontOpenSans = openSans.className