'use client';

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/use-auth-modal";
import { useEffect, useState } from "react";
import useUploadModal from "@/hooks/use-upload-modal";
import { Field, FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUserHook } from "@/hooks/use-user";
import uniqid from "uniqid";

const UploadModal = () => {
    
    const { onClose, isOpen } = useUploadModal();
    const [isLoading, SetIsLoading] = useState(false);
    const {user} = useUserHook();
    const {register, handleSubmit, reset} = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null
        }
    });


    const supabaseClient = useSupabaseClient();
    const router = useRouter();


    const onChange = (open: boolean) => {
        if(!open) {
            // Reset the form.
            onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // Upload to supabase.
        try {
            SetIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            const uniqueID = uniqid();

            if(!user || !imageFile || !songFile) {
                toast.error("Missing Fields!");
                return;
            }

            // Upload song.
            const {data: songData, error: songError} = await supabaseClient.storage.from("songs")
            .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: "3600",
                upsert: false
            });

            if(songError) {
                SetIsLoading(false);
                return toast.error("Error uploading song!");
            }

            // Upload image.
            const {data: imageData, error: imageError} = await supabaseClient.storage.from("images")
            .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: "3600",
                upsert: false
            });

            if(imageError) {
                SetIsLoading(false);
                return toast.error("Error uploading image!");
            }

            const {error: supabaseError} = await supabaseClient.from("songs").insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData?.path,
                song_path: songData?.path
            });

            if(supabaseError) {
                SetIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            SetIsLoading(false);
            toast.success("Song Added!");
            reset();
            onClose();

        } catch(error) {
            toast.error("Oops! Something went wrong!");
        } finally {
            SetIsLoading(false);
        }
    }

    return (
        <Modal
        title="Add a song"
        description="Upload an mp3 file"
        isOpen={isOpen}
        onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4">
                <Input 
                id="title"
                disabled={isLoading}
                {...register("title", {required: true})} 
                placeholder="Song Title"
                />
                <Input 
                id="author"
                disabled={isLoading}
                {...register("author", {required: true})} 
                placeholder="Author"
                />
                <div>
                    <div className="pb-1">Select an mp3 file</div>
                    <Input 
                    id="song"
                    type="file"
                    disabled={isLoading}
                    accept=".mp3"
                    {...register("song", {required: true})} 
                    />
                </div>
                <div>
                    <div className="pb-1">Select an image</div>
                    <Input 
                    id="image"
                    type="file"
                    disabled={isLoading}
                    accept="image/*"
                    {...register("image", {required: true})} 
                    />
                </div>
                <Button
                disabled={isLoading}
                type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal;