import { Create } from "./create";
import { fontOpenSans } from "@/app/fonts";
import { Form } from "./style";

export default function Finance() {
  return (
    <Form
      className={`${fontOpenSans} m-auto flex flex-col max-w-[30rem] w-[100%] min-h-auto relative shadow p-3 rounded-md`}
    >
      <header className="p-2 text-2xl text-cyan-600 opacity-90">
        <h1>Criar uma novo registro</h1>
      </header>
      <Create />
    </Form>
  )
}
