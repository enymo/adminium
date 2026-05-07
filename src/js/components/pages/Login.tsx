import { Input } from "@enymo/bcc";
import { Form, type SubmitHandler } from "@enymo/react-form-component";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmailRegex } from "../../utilities";
import { Button } from "../Button";
import { LoginFrame } from "../LoginFrame";

export interface Submit {
    email: string,
    password: string
}

export function Login({
    onSubmit,
    toForgotPassword,
}: {
    onSubmit: SubmitHandler<Submit>,
    toForgotPassword: string,
}) {
    const { t } = useTranslation();
    const form = useForm<Submit>();

    return (
        <LoginFrame title={t("login.title")} >
            <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-6">
                    <Input name="email" label={t("input.email.label")} options={{
                        required: t("input.email.required"),
                        pattern: {
                            value: EmailRegex,
                            message: t("input.email.pattern")
                        }
                    }} />
                    <Input name="password" type="password" label={t("input.password.label")} options={{
                        required: t("input.password.required")
                    }} />
                </div>
                <div className="flex flex-col gap-4">
                    <Link to={toForgotPassword} className="body-m-md text-primary-500 self-end">{t("login.forgotPassword")}</Link>
                    <Button variant="primary" submit>{t("login.submit")}</Button>
                </div>
            </Form>
        </LoginFrame>
    )
}