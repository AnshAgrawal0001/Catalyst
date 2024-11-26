'use client';
import SigninForm from "@/components/SigninForm";


export default function Page() {
  return (
    // a background image and then the signup form leaving a 1rem margin from all sides to look it like a popup
    <div className="w-full h-full">
        <SigninForm />
      </div>


  );
}
