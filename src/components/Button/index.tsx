interface IButton {
  text: string;
}

export const Button = ({ text }: IButton) => {
  return (
    <button className="w-full border-none p-[.9rem] rounded-md bg-secondary-500 text-white-500">
      <span className="text-lg">{text}</span>
    </button>
  )
}