'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false),
})

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8 lg:p-12 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/iron-throne-bg.png')" }}>
      <div className="w-full max-w-[1200px] grid md:grid-cols-2 overflow-hidden rounded-3xl bg-white font-[500]">
        <div className="p-8 md:p-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium">WELCOME BACK</h1>
              <p className="text-gray-500 font-[400]">Welcome back! Please enter your details.</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[400]">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-[400]">Password</FormLabel>
                      <FormControl>
                        <Input placeholder="**********" type="password" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium">Remember me</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link href="/forgot-password" className="text-sm text-red-500 hover:underline">
                    Forgot password
                  </Link>
                </div>
                <Button type="submit" className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">
                  Sign in
                </Button>
              </form>
            </Form>
            <Button
              variant="outline"
              className="w-full h-12 flex items-center justify-center space-x-2"
              onClick={() => console.log("Sign in with Google")}
            >
              <GoogleIcon className="h-5 w-5" />
              <span>Sign in with Google</span>
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-red-500 hover:underline">
                Sign up for free!
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/iron-throne.png')",
          }}
        />
      </div>
    </div>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  )
}

