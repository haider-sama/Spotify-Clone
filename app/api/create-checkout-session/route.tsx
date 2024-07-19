import { stripe } from "@/libs/stripe";
import { createOrRetreiveCustomer } from "@/libs/supabase-admin";
import { getUrl } from "@/libs/helpers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function POST(req: Request) {
    const {price, quantity = 1, metadata = {}} = await req.json();

    try {
        const supabase = createRouteHandlerClient({cookies});

        const {data: {user}} = await supabase.auth.getUser();

        const customer = await createOrRetreiveCustomer({
            uuid: user?.id || "",
            email: user?.email || ""
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "required",
            customer,
            line_items: [{
                price: price.id,
                quantity
            }],
            mode: "subscription",
            allow_promotion_codes: true,
            subscription_data: {
                // Undo-Comment this line if you have set-up the stripe_webhook_key variable
                // trial_from_plan: true,
                metadata
            },
            success_url: `${getUrl()}/account`,
            cancel_url: `${getUrl()}`,
        });

        return NextResponse.json({sessionId: session.id});
    } catch (error: any) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}