import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
  date: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: {
      isDirty,
      dirtyFields,
      isLoading,
      isValid,
      errors,
      submitCount,
    },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("is dirty", isDirty);
    console.log("errors", errors);
    console.log("is valid", isValid);
    console.log("submitCount", submitCount);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">Your name</label>
      <input {...(register("firstName"), { required: true })} />
      <label>Gender Selection</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      {!isValid && <p className="bg-red-100">Error please check form</p>}
      {submitCount > 5 && (
        <strong className="text-red-900">
          You have reached max number of submissions
        </strong>
      )}

      <label htmlFor="date">Booking date</label>

      <input
        {...(register("date"), { required: true })}
        type="datetime-local"
      ></input>
      <button disabled={submitCount > 5} type="submit">
        Submit
      </button>
    </form>
  );
}
