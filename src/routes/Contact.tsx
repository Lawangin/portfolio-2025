import { useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IoIosArrowForward, IoIosCheckmarkCircle } from 'react-icons/io'

export const Route = createFileRoute('/Contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const [step, setStep] = useState<'name' | 'email' | 'message'>('name')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const root = useRef<HTMLDivElement | null>(null)

  const formSchema = z.object({
    currentValue: z
      .string()
      .min(step === 'message' ? 10 : 2, {
        message:
          step === 'name'
            ? 'Name must be at least 2 characters.'
            : step === 'email'
              ? 'Please enter a valid email address.'
              : 'Message must be at least 10 characters.',
      })
      .refine(
        (val) => {
          if (step === 'email') {
            return z.string().email().safeParse(val).success
          }
          return true
        },
        { message: 'Please enter a valid email address.' },
      ),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentValue: '',
    },
  })

  function handleNext(values: z.infer<typeof formSchema>) {
    if (step === 'name') {
      setName(values.currentValue)
      setStep('email')
      form.reset({ currentValue: '' })
    } else if (step === 'email') {
      setEmail(values.currentValue)
      setStep('message')
      form.reset({ currentValue: '' })
    } else if (step === 'message') {
      handleSubmitForm(name, email, values.currentValue)
    }
  }

  const generatePlaceholder = () => {
    switch (step) {
      case 'name':
        return 'What should we call you?'
      case 'email':
        return 'What is your e-mail?'
      case 'message':
        return 'What would you like to say?'
      default:
        return ''
    }
  }

  function handleSubmitForm(name: string, email: string, message: string) {
    // Replace with your API call
    console.log('API Call:', { name, email, message })
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 px-4 pt-24 md:pl-48 md:py-24 md:text-6xl">
        Contact
      </h1>
      <div
        ref={root}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-12 md:py-0 md:pl-48"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNext)}
            className="space-y-8 text-white"
          >
            <FormField
              control={form.control}
              name={'currentValue'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 relative">
                      {step === 'message' ? (
                        <textarea
                          className="text-white min-h-[100px] w-full p-2 border rounded resize-none"
                          placeholder="What would you like to say?"
                          {...field}
                        />
                      ) : (
                        <Input
                          className="text-white"
                          placeholder={generatePlaceholder()}
                          type={step === 'email' ? 'email' : 'text'}
                          {...field}
                        />
                      )}
                      <Button
                        type="button"
                        size="icon"
                        className="size-8 bg-white/20 hover:bg-white/30 rounded-full"
                        onClick={() => form.handleSubmit(handleNext)()}
                        tabIndex={-1}
                      >
                        <IoIosArrowForward className="w-5 h-5" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <section>
          <div className="flex place-content-between items-start text-white/80 bg-white/10 p-6 rounded-lg shadow-lg w-full">
            <p className="text-lg">Nice to meet you {name ? name : ''}!</p>
            <IoIosCheckmarkCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex place-content-between items-start text-white/80 bg-white/10 p-6 rounded-lg shadow-lg w-full">
            <p className="text-lg">
              We will respond to you at {email ? email : ''}!
            </p>
            <IoIosCheckmarkCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex place-content-between items-start text-white/80 bg-white/10 p-6 rounded-lg shadow-lg w-full">
            <p className="text-lg">Message received!</p>
            <IoIosCheckmarkCircle className="w-8 h-8 text-green-500" />
          </div>
        </section>
      </div>
    </div>
  )
}
