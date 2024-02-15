import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    function setChecked(checked) {
        return undefined;
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="flex align-items-center justify-content-center flex-column">
                <div className="surface-card p-6 sm:p-4 shadow-2 border-round w-full lg:w-4">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            Welcome Back
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Username
                                </label>
                                <InputText
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    className="w-full"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.username}
                                    className=""
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Password
                                </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className=""
                                />
                            </div>

                            <div className="flex align-items-center justify-content-between mb-6">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="rememberme-login"
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        checked={data.remember}
                                        className="mr-2"
                                    />
                                    <label htmlFor="rememberme-login">
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                label="Sign In"
                                className="w-full"
                                disabled={processing}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
