import { Input } from "@enymo/bcc";
import { Form, type SubmitHandler } from "@enymo/react-form-component";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import { EmailRegex } from "../../utilities";
import { Button } from "../Button";
import { LoginFrame } from "../LoginFrame";

export interface Submit {
    email: string
}

export function ForgotPassword({
    onSubmit,
    toLogin
}: {
    onSubmit: SubmitHandler<Submit>,
    toLogin: string
}) {
    const { t } = useTranslation();
    const form = useForm<Submit>();

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit: SubmitHandler<Submit> = async data => {
        await onSubmit(data);
        setSubmitted(true);
    }

    return submitted ? (
        <LoginFrame title={t("forgotPassword.reset")}>
            <p className="body-m text-text-800 text-center">{t("forgotPassword.text")}</p>
            <p className="body-m text-text-800 text-center mt-6">
                <Trans i18nKey="forgotPassword.resend">
                    Keine E-Mail erhalten? <button type="button" onClick={() => setSubmitted(false)} className="text-primary-500 cursor-pointer">Erneut anforden</button>
                </Trans>
            </p>
        </LoginFrame>
    ) : (
        <LoginFrame title={t("forgotPassword.title")}>
            <Form form={form} onSubmit={handleSubmit} className="flex flex-col justify-center gap-6">
                <Input name="email" label={t("input.email.label")} options={{
                    required: t("input.email.required"),
                    pattern: {
                        value: EmailRegex,
                        message: t("input.email.pattern")
                    }
                }} />
                <Button variant="primary" submit>{t("forgotPassword.reset")}</Button>
                <Link to={toLogin} className="body-m-md text-primary-500 self-center">{t("forgotPassword.backToLogin")}</Link>
            </Form>
        </LoginFrame>
    )
}