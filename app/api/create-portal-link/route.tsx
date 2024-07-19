import { stripe } from "@/libs/stripe";
import { createOrRetreiveCustomer } from "@/libs/supabase-admin";
import { getUrl } from "@/libs/helpers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function POST(req: Request) {
    try {
        const supabase = createRouteHandlerClient({cookies});

        const {data: {user}} = await supabase.auth.getUser();

        if(!user) throw new Error("Could not fetch user!");

        const customer = await createOrRetreiveCustomer({
            uuid: user?.id || "",
            email: user?.email || ""
        });

        if(!customer) throw new Error("Could not fetch customer!");

        const {url} = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`,
        });


        return NextResponse.json({url});
    } catch (error: any) {
        console.log(error);
        return new NextResponse("Internal Error", {status: 500});
    }
}