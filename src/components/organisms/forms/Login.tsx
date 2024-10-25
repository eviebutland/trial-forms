import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs, { Dayjs } from "dayjs";
import { ErrorMessage } from "@hookform/error-message";
import { getValue } from "@testing-library/user-event/dist/utils";

interface FormInput {
  firstName: string;
  numberOfPeople: number;
  dayOfBooking: string;
  time: string;
}
const now = new Date();
const zodDayIsBefore = z.coerce.date();
// .custom((val) => dayjs(val).isBefore(now));
const schema = z.object({
  firstName: z
    .string({ message: "Your name is required" })
    .min(2, { message: "Please enter more letters" }),
  numberOfPeople: z.number().min(1).max(12, { message: "Contact support" }),
  // email: z.string({ required_error: "please provide an email" }).email(),
  dayOfBooking: zodDayIsBefore,
  time: z.coerce.string({ message: "This is required" }),
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

        <input
          {...register("dayOfBooking", { valueAsDate: true })}
          type="date"
        />
        {errors.dayOfBooking?.message && (
          <p className="bg-red-700 text-white">
            {errors.dayOfBooking?.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="time">Booking time</label>

        <input
          {...register("time", {
            valueAsDate: true,
          })}
          type="time"
        />

        {errors.time?.message && (
          <p className="bg-red-700 text-white">{errors.time?.message}</p>
        )}
      </div>

      {/* <button type="submit">Submit</button> */}
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
