import { memo } from "react";

interface Props {
  message: string;
}

// Using memo to make sure we don't get unnessary re-renders when the props haven't changed
export const ErrorMessage = memo(function ErrorMesage(props: Props) {
  return (
    <p data-testid="validationError" className="text-red-700">
      {props.message}
    </p>
  );
});
