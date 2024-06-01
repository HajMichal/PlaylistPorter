import { Input } from "@mantine/core";

interface CustomInput {
  label: string;
  setter: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const CustomInput = ({ setter, label }: CustomInput) => {
  return (
    <Input.Wrapper label={label} className="text-white w-full max-w-[600px]">
      <Input
        placeholder="Paste link here"
        onChange={(e) => setter(e.target.value)}
      />
    </Input.Wrapper>
  );
};
