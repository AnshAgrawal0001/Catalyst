'use client';
import SignUpForm from "@/components/SignupForm2";


export default function Page() {
  return (
    // a background image and then the signup form leaving a 1rem margin from all sides to look it like a popup
    <div
      className="flex justify-center bg-black items-center h-screen w-full p-8 md:p-12 lg:p-24 bg-cover bg-center bg-no-repeat rounded-none"
      style={{ backgroundImage: "url('/iron-throne-bg.png')" }}
    >
      <div className="rounded-[50px] shadow-2xl shadow-black w-full h-full overflow-hidden">
        <SignUpForm />
      </div>
    </div>


  );
}
