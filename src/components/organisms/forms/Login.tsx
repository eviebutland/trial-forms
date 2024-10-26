import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { FormField } from "../../molecules/FormField";
import { FormInput } from "../../../types/form";
import { ErrorMessage } from "../../molecules/Error";
import { useState } from "react";
import { RButton } from "../../atoms/Button";
import { Loading } from "../../atoms/Loading";

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
    formState: { errors, submitCount, isLoading, isValid, isDirty },
    getValues,
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const [isLoadingApiCall, setIsLoadingApiCall] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const submitForm: SubmitHandler<FormInput> = async (data) => {
    setIsLoadingApiCall(true);
    setDisplaySuccessMessage(false);
    setDisplayErrorMessage(false);

    // TODO: saintise data here before we post it
    try {
      const response = await fetch("http://localhost:3000/bookings", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setDisplaySuccessMessage(true);
      }
    } catch (error) {
      console.log(error);
      setDisplayErrorMessage(true);
    } finally {
      setIsLoadingApiCall(false);
    }
  };

  function handleResetForm() {
    reset();
    setDisplaySuccessMessage(false);
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      noValidate
      className="flex flex-col justify-center"
    >
      <div className="flex space-x-2">
        <FormField
          name="firstName"
          label={"Your name"}
          errors={errors?.firstName}
        >
          <input
            type="string"
            data-testid="name"
            {...register("firstName")}
            placeholder="name"
            className="border rounded p-2"
            aria-invalid={errors.firstName ? "true" : "false"}
          />
        </FormField>

        <FormField
          name="phone"
          label="Your phone number"
          errors={errors?.phone}
        >
          <input
            data-testid="phone"
            {...register("phone")}
            placeholder="07720765444"
            type="phone"
            className="border rounded p-2"
            aria-invalid={errors.phone ? "true" : "false"}
          />
        </FormField>
      </div>
      <div className="flex space-x-2">
        <FormField name="email" errors={errors.email} label="Your email">
          <input
            data-testid="email"
            {...register("email")}
            type="email"
            className="border rounded p-2"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </FormField>

        <FormField
          name="numberOfPeople"
          label="Number of guests"
          errors={errors.numberOfPeople}
        >
          <input
            className="border rounded p-2"
            {...register("numberOfPeople", {
              setValueAs: (v) => parseInt(v),
            })}
            data-testid="numberOfPeople"
            type="number"
            aria-invalid={errors.numberOfPeople ? "true" : "false"}
          />
        </FormField>
      </div>
      <div className="flex">
        <FormField
          label="Reservation date"
          name="dayOfBooking"
          errors={errors.dayOfBooking}
        >
          <input
            className="border rounded p-2"
            min={minTime}
            max={maxTime}
            data-testid="dayOfBooking"
            {...register("dayOfBooking", { valueAsDate: true })}
            type="datetime-local"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </FormField>
      </div>
      {/* TODO: maybe don't use date time as can't control the time step */}
      <div className="flex">
        {submitCount > 5 && (
          <ErrorMessage message="You have reached max number of submissions, please come back again later" />
        )}

        {displayErrorMessage && (
          <ErrorMessage message="Something went wrong, please come back again later" />
        )}

        {(isLoading || isLoadingApiCall) && <Loading />}

        {displaySuccessMessage ? (
          <div data-testid="success-block">
            <p className="text-green-800 font-bold pb-4">
              Thank you for booking!
            </p>
            <p className=" pb-4">
              Your booking confirmation will be emailed to:{" "}
              <span className="font-bold">{getValues("email")}</span>
            </p>

            <RButton
              variant="secondary"
              onClick={handleResetForm}
              label="Book another"
              data-testid="bookAnotherBtn"
            />
          </div>
        ) : (
          <RButton
            disabled={displayErrorMessage || isLoading}
            testId="submitBtn"
            variant="info"
            label="Submit"
            onClick={handleSubmit((data) => submitForm(data))}
          />
        )}
      </div>
    </form>
  );
}
