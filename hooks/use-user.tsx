import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export interface Props {
    [propName: string]: any;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const MyUserContextProvider = (props: Props) => {
    const {session, isLoading: isLoadingUser, supabaseClient: supabase} = useSessionContext();
    const user = useUser();
    const token = session?.access_token ?? null;
    const [isLoadingData, SetIsLoadingData] = useState(false);
    const [userDetails, SetUserDetails] = useState<UserDetails | null>(null);
    const [subscription, SetSubscription] = useState<Subscription | null>(null);
    const getUserDetails = () => supabase.from("users").select("*").single();
    const getSubscription = () => supabase.from("subscriptions")
    .select("*, prices(*, products(*))").in("status", ["trailing", "active"]).single();

    useEffect(() => {
        if(user && !isLoadingData && !userDetails && !subscription) {
            SetIsLoadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
                const userDetailsPromise = results[0];
                const subscriptionPromise = results[1];

                if(userDetailsPromise.status === "fulfilled") {
                    SetUserDetails(userDetailsPromise.value.data as UserDetails);
                }
                if(subscriptionPromise.status === "fulfilled") {
                    SetSubscription(subscriptionPromise.value.data as Subscription);
                }

                SetIsLoadingData(false);
            })
    } else if(!user && !isLoadingUser && !isLoadingData) {
        SetUserDetails(null);
        SetSubscription(null);
    }
    }, [user, isLoadingUser]);


    const value = {
        accessToken: token,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return <UserContext.Provider value={value} {...props} />
}

export const useUserHook = () => {
    const context = useContext(UserContext);

    if(context === undefined) {
        throw new Error("useUser must be within a MyUserContextProvider");
    }

    return context;
}