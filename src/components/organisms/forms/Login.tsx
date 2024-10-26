import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { FormField } from "../../molecules/FormField";
import { FormInput } from "../../../types/form";
import { ErrorMessage } from "../../molecules/Error";

dayjs.extend(isSameOrAfter);

const now = new Date();
const minTime = dayjs().add(1, "hour").toISOString(); // not actually working
const maxTime = dayjs().add(1, "year").toISOString(); // not actually working

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
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(15, { message: "Please enter a valid phone number" }), // would use a different validation as this is not very strong
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormInput> = (data) => {
    console.log("being clicked", data);
    // call api here
  };

  function handleClick() {
    handleSubmit((data) => submitForm(data));
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate>
      <FormField
        name="firstName"
        label={"Your name"}
        errors={errors?.firstName}
      >
        <input
          type="string"
          {...register("firstName")}
          placeholder="name"
          aria-invalid={errors.firstName ? "true" : "false"}
        />
      </FormField>

      <FormField name="phone" label="Your phone number" errors={errors?.phone}>
        <input
          {...register("phone")}
          placeholder="07720765444"
          type="phone"
          aria-invalid={errors.phone ? "true" : "false"}
        />
      </FormField>

      <FormField name="email" errors={errors.email} label="Your email">
        <input
          {...register("email")}
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
        />
      </FormField>

      <FormField
        name="numberOfPeople"
        label="Number of guests"
        errors={errors.numberOfPeople}
      >
        <input
          {...register("numberOfPeople", {
            setValueAs: (v) => parseInt(v),
          })}
          type="number"
          aria-invalid={errors.numberOfPeople ? "true" : "false"}
        />
      </FormField>

      {/* maybe don't use date time as can't control the time step */}
      <FormField
        label="Reservation date"
        name="dayOfBooking"
        errors={errors.dayOfBooking}
      >
        <input
          min={minTime}
          max={maxTime}
          {...register("dayOfBooking", { valueAsDate: true })}
          type="datetime-local"
          aria-invalid={errors.email ? "true" : "false"}
        />
      </FormField>

      {submitCount > 5 && (
        <ErrorMessage message="You have reached max number of submissions, please come back again later"></ErrorMessage>
      )}

      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
