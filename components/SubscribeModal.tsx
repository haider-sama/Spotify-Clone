'use client';

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/use-auth-modal";
import { useEffect, useState } from "react";
import { Price, ProductWithPrice } from "@/types";
import Button from "./Button";
import { useUserHook } from "@/hooks/use-user";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripe-client";
import useSubscribeModal from "@/hooks/use-subscribe-modal";

interface SubscribeModalProps {
    products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0 / 100));

    return priceString;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({products}) => {
    const subscribeModal = useSubscribeModal();
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const {user, subscription, isLoading} = useUserHook();

    const onChange = (open: boolean) => {
        if(!open) {
            subscribeModal.onClose();
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);

        if(!user) {
            setPriceIdLoading(undefined);
            return toast.error("You must be logged in to checkout!");
        }

        if(subscription) {
            setPriceIdLoading(undefined);
            return toast("You are already subscribed!");
        }

        try {
            const {sessionId} = await postData({
                url: "/api/create-checkout-session",
                data: {price}
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({sessionId});
        } catch (error: any) {
            toast.error((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    }

    let content = (
        <div className="text-center">No products available.</div>
    );

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product?.prices?.length) {
                        return (
                            <div key={product.id}>
                                No prices available.
                            </div>
                        )
                    }

                    return product.prices.map((price) => (
                        <Button key={price.id}
                        onClick={() => handleCheckout(price)}
                        disabled={isLoading || price.id === priceIdLoading}
                        className="mb-4">
                            {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if(subscription) {
        content = (
            <div className="text-center">You are already subscribed!</div>
        );
    }
   
    return (
        <Modal
        title="Only for Premium Users"
        description="Listen to music with Spotify Premium"
        isOpen={subscribeModal.isOpen}
        onChange={onChange}>
            {content}
        </Modal>
    )
}

export default SubscribeModal;