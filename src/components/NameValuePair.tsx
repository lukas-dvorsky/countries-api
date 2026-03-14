interface NameValuePairProps {
  name: string;
  value?: string | null;
}

function NameValuePair({ name, value = "-" }: NameValuePairProps) {
  return (
    <div className="flex justify-between mx-4">
      <span className="font-bold">{name}</span>
      <span>{value}</span>
    </div>
  );
}

export default NameValuePair;
