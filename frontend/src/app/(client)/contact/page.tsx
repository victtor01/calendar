import { Form } from "./form";

export default function Contact() {
  return (
    <main className="w-full p-4 min-h-screen flex">
      <section className="max-w-[60rem] m-auto flex flex-col gap-4">
        <header className="items-center flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Contactar-nos.</h1>
          <h2 className="text-xl">
            Olá, escreva resumidamente qual a sua dúvida.
          </h2>
        </header>
        <section className="flex flex-col">
          <Form />
        </section>
      </section>
    </main>
  );
}
