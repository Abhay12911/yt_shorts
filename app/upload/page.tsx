"use client" 
import { uploadShortsAction } from '@/actions/upload-short'
import { Button } from '@/components/ui/button'
import Upload from '@/components/upload'
import { Loader2 } from 'lucide-react'
import React, { useActionState, useState } from 'react'

function page() {

    const [formState, action , isPending] = useActionState(uploadShortsAction,{errors: {}})
    const [videoUrl,setvideoUrl] = useState<string>("");

    // to add video to the form data
    const handleSubmit = (formData:FormData)=>{
        formData.append("video", videoUrl);
        return action(formData);
    }
  return (
    <div className='max-w-md mx-auto p-6'> 
        <h1 className='text-2xl text-center font-bold'>Upload Page</h1>
        <form action={handleSubmit}>
            <div className='mb-4'>
                <label>Title:</label>
                <input type="text" placeholder='title' className='border-2 border-gray-300 rounded-md p-2 w-full'/>
            {
                formState.errors.title && <span className='text-red-500'>{formState.errors.title}</span>

            }
            </div>
            <div className='mb-4'>
                <label>Desciption:</label>
                <input type="text" placeholder='description' className='border-2 border-gray-300 rounded-md p-2 w-full'/>
            {
                formState.errors.description && <span className='text-red-500'>{formState.errors.description}</span>
            }
            </div>
            <div className='mb-4'>
                <Upload setVideoUrl={setvideoUrl} />
                {formState.errors.video && (
            <span className="text-red-500 text-sm">
              {formState.errors.video}
            </span>
          )}
            </div>
            <div className='text-center'>
            <Button type="submit" className='cursor-pointer'>
            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Upload"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default page