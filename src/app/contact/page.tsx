"use client";
import Image from "next/image";
import {useForm} from "react-hook-form";
export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="mt-[120px] flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-center font-thunder text-6xl text-red-carmen mb-5">Contact</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="order-2 flex w-full flex-col items-start justify-center">
            <h2 className="font-thunder text-2xl text-red-carmen">Formulaire</h2>
            <p className="font-thunderLC text-lg text-black-carmen">
              Une question, un commentaire, une suggestion ou une demande particulière ? N'hésitez pas à nous envoyer un
              mail via le formulaire ci-dessous, nous y répondrons dès que possible.
            </p>
          </div>
          <div className="relative order-1 h-[300px] w-full">
            <p className="absolute left-4 top-8 z-[3] -rotate-12 font-softgank text-5xl text-red-carmen">QUESTION ?</p>
            <Image
              className="absolute -bottom-12 left-0 z-[3]"
              src={"/img/contact/pen_2x.png"}
              alt="CONTACT"
              width={250}
              height={200}
            />
            <Image
              className="absolute -right-5 -top-10 z-[3]"
              src={"/img/contact/paperclip_2x.png"}
              alt="CONTACT"
              width={200}
              height={200}
            />
            <Image
              className="absolute left-1/2 top-1/2 ml-8 -translate-x-1/2 -translate-y-1/2"
              src={"/img/contact/contact_ph_2x.png"}
              alt="CONTACT"
              width={250}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
