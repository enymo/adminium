import { Input } from "@enymo/bcc";
import { Form, type SubmitHandler } from "@enymo/react-form-component";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { LoginFrame } from "../LoginFrame";

export interface Submit {
    password: string
}

export function ResetPassword({
    onSubmit
}: {
    onSubmit: SubmitHandler<Submit>
}) {
    const { t } = useTranslation();
    const form = useForm<Submit>()

    return (
        <LoginFrame title={t("resetPassword.title")}>
            <Form form={form} onSubmit={onSubmit} className="flex flex-col justify-center gap-6">
                <Input name="password" type="password" label={t("input.password.label")} options={{
                    required: t("input.password.required"),
                    minLength: {
                        value: 8,
                        message: t("input.password.minLength")
                    }
                }} />
                <Button variant="primary" submit>{t("resetPassword.setPassword")}</Button>
            </Form>
        </LoginFrame>
    )
}