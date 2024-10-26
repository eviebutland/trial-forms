interface Props {
  message: string;
}

export const ErrorMessage = (props: Props) => {
  return <p className="bg-red-700 text-white">{props.message}</p>;
};
