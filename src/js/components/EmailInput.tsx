import { Input, type InputProps } from "@enymo/bcc";
import { type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { EmailRegex } from "../utilities";

export default function EmailInput({ options, label, name = "email", ...props }: Omit<InputProps, "type">) {
    const { t } = useTranslation();

    return (
        <Input name={name} type="email" label={label ?? t("email.label")} options={{
            pattern: {
                value: EmailRegex,
                message: t("email.pattern")
            },
            ...options
        } as RegisterOptions} {...props} />
    )
}