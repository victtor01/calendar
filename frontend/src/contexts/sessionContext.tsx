import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ContextProps {
  setUserInfo: Dispatch<SetStateAction<DataType | {}>>;
  userInfo: Partial<User>;
  logout: () => null;
}

interface DataType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export const SessionContext = createContext<ContextProps>({
  setUserInfo: (): string => "",
  logout: () => null,
  userInfo: {},
});

export const ProviderSessionContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<DataType | {}>({});
  const { push } = useRouter();

  const logout = (): null => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("adminRote");
    push("/login");
    return null;
  };

  return (
    <SessionContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
