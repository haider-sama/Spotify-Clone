'use client';

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/use-auth-modal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    const onChange = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

    useEffect(() => {
        if(session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    return (
        <Modal
        title="Welcome Back"
        description="Login into your account!"
        isOpen={isOpen}
        onChange={onChange}>
            <Auth supabaseClient={supabaseClient}
            theme="dark"
            providers={["google"]}
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: "#404040",
                            brandAccent: "22c55e"
                        }
                    }
                }
            }}></Auth>
        </Modal>
    )
}

export default AuthModal;