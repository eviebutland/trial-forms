import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  firstName: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

const ZodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <label htmlFor="name">Your name</label>
      <input {...register("name")} />
      {errors.name?.message && (
        <p className="bg-red-900 text-white">{errors.name?.message}</p>
      )}
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {errors.age?.message && (
        <p className="bg-red-900 text-white">{errors.age?.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ZodForm;
