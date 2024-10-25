import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);
interface FormInput {
  firstName: string;
  numberOfPeople: number;
  dayOfBooking: string;
  email: string;
}
const now = new Date();
const minTime = dayjs().add(1, "hour").toISOString(); // not actually working
const maxTime = dayjs().add(1, "year").toISOString(); // not actually working

console.log(minTime);
const zodDayIsBefore = z.coerce
  .date({ message: "Please provide a date" })
  .refine((day) => dayjs(day).isSameOrAfter(now), {
    message: "Date cannot be in the past",
  });

const schema = z.object({
  firstName: z
    .string({ message: "Your name is required" })
    .min(2, { message: "Please enter more letters" }),
  numberOfPeople: z.number().min(1).max(12, { message: "Contact support" }),
  email: z.string({ required_error: "please provide an email" }).email(),
  dayOfBooking: zodDayIsBefore,
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isLoading, isValid, errors, submitCount, disabled },
    getValues,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormInput> = (data) => {
    console.log("being clicked", data);
  };

  function handleClick() {
    console.log("ebing clicked", getValues());
    handleSubmit((data) => submitForm(data));

    console.log("is dirty", isDirty);
    console.log("errors", errors);
    console.log("is valid", isValid);
    console.log("submitCount", submitCount);
    console.log("isLoading", isLoading);
    console.log("disabled", disabled);
  }
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* make into component */}
      <div>
        <label htmlFor="firstName">Your name</label>
        <input
          {...register("firstName")}
          placeholder="name"
          aria-invalid={errors?.firstName ? "true" : "false"}
        />

        {errors.firstName?.message && (
          <p className="bg-red-700 text-white">{errors.firstName?.message}</p>
        )}
      </div>

      {/* {submitCount > 5 && (
        <strong className="text-red-900">
          You have reached max number of submissions
        </strong>
      )} */}

      <input
        type="number"
        {...register("numberOfPeople", {
          setValueAs: (v) => parseInt(v),
        })}
      />
      {errors.numberOfPeople?.message && (
        <p className="bg-red-700 text-white">
          {errors.numberOfPeople?.message}
        </p>
      )}

      <div>
        <label htmlFor="dayOfBooking">Booking date</label>

        {/* maybe don't use date time as can't control the time step */}
        <input
          {...register("dayOfBooking", { valueAsDate: true })}
          type="datetime-local"
          min={minTime}
          max={maxTime}
        />
        {errors.dayOfBooking?.message && (
          <p className="bg-red-700 text-white">
            {errors.dayOfBooking?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Your email</label>

        <input {...register("email")} type="email" />

        {errors.email?.message && (
          <p className="bg-red-700 text-white">{errors.email?.message}</p>
        )}
      </div>

      {/* <button type="submit">Submit</button> */}
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
