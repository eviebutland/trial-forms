interface Props {
  message: string;
}

export const ErrorMessage = (props: Props) => {
  return <p className="text-red-700">{props.message}</p>;
};
