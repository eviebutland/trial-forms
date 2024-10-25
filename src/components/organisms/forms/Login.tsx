import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs, { Dayjs } from "dayjs";
import { ErrorMessage } from "@hookform/error-message";
import { getValue } from "@testing-library/user-event/dist/utils";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface FormInput {
  firstName: string;
  gender: GenderEnum;
  date: string;
}

const schema = z.object({
  firstName: z
    .string({ message: "Your name is required" })
    .min(2, { message: "Please enter more letters" }),
  numberOfPeople: z.number().min(1).max(12, { message: "Contact support" }),
  email: z.string({ required_error: "please provide an email" }).email(),
  // date: zodDayIsBefore,
});

export default function LoginForm() {
  // const zodDay = z.custom<Dayjs>((val) => val instanceof dayjs, "Invalid date");
  const now = new Date();
  const zodDayIsBefore = z.custom((val) => dayjs(val).isBefore(now));

  const {
    register,
    handleSubmit,
    formState: { isDirty, isLoading, isValid, errors, submitCount, disabled },
    getValues,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const submitForm: SubmitHandler<FormInput> = (data) => {
    // why doesn't this trigger?
    console.log("being clicked", data);
  };

  function handleClick() {
    console.log("ebing clicked", getValues());
    handleSubmit(submitForm);
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
        {/* here
        <ErrorMessage
          errors={errors}
          name="model"
          render={({ message }) => <p>{message}</p>}
        /> */}
        {errors && <p>{errors.firstName?.message}</p>}
      </div>

      {/* <div>
        <label>Gender Selection</label>
        <select {...register("model.gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        {errors.model?.gender && (
          <p className="bg-red-100">{errors.model?.gender.message}</p>
        )}
      </div> */}

      {/* {submitCount > 5 && (
        <strong className="text-red-900">
          You have reached max number of submissions
        </strong>
      )} */}

      {/* <div>
        <label htmlFor="date">Booking date</label>

        <input
          {...(register("model.date"), { required: true })}
          type="datetime-local"
        />
      </div> */}
      {/* {errors.model?.date} */}

      <button type="submit">Submit</button>
    </form>
  );
}
