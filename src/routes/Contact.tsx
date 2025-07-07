import { useEffect, useRef, useState } from 'react'
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
import { animate } from 'animejs'
import { usePageContext } from '@/context/PageContext/PageContext'

export const Route = createFileRoute('/Contact')({
  component: RouteComponent,
})

function RouteComponent() {
  const [step, setStep] = useState<'name' | 'email' | 'message'>('name')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showInput, setShowInput] = useState(true)
  const [toastMessage, setToastMessage] = useState('')

  const { pageTitle } = usePageContext()


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
      animateToast(`Nice to meet you, ${values.currentValue}!`)
      setTimeout(() => {
        setStep('email')
        form.reset({ currentValue: '' })
      }, 1800)
    } else if (step === 'email') {
      setEmail(values.currentValue)
      animateToast(`We’ll respond to you at ${values.currentValue}!`)
      setTimeout(() => {
        setStep('message')
        form.reset({ currentValue: '' })
      }, 1800)
    } else if (step === 'message') {
      handleSubmitForm(name, email, values.currentValue)
      setShowInput(false)
      animateToast(`Message received!`, true)
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

  function animateToast(message: string, keepVisible = false) {
    setToastMessage(message)

    animate('.contact-toast', {
      opacity: [0, 1],
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        if (!keepVisible) {
          setTimeout(() => {
            animate('.contact-toast', {
              opacity: [1, 0],
              duration: 300,
              easing: 'easeInOutQuad',
            })
          }, 1500)
        }
      },
    })
  }

  useEffect(() => {
    if (pageTitle === 'Contact Me') {
      animate('.contact-container', {
        y: ['50px', '0px'],
        opacity: [0, 1],
        duration: 1500,
      })
    } else {
      animate('.contact-container', {
        y: ['0px', '-50px'],
        opacity: [1, 0],
        duration: 1500,
      })
    }
  }, [pageTitle])


  return (
    <div ref={root} className="min-h-screen contact-container">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-black bg-clip-text text-transparent opacity-70 px-4 pt-24 md:pl-48 md:py-24 md:text-6xl">
        Contact
      </h1>
      {showInput ? (<div
        className="grid grid-cols-1 gap-6 px-4 py-12 md:place-items-center"
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
                  <FormLabel>{step.toUpperCase()}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 relative md:min-w-100">
                      {step === 'message' ? (
                        <textarea
                          className="text-black min-h-[100px] w-full p-2 border rounded resize-none bg-white"
                          placeholder="What would you like to say?"
                          {...field}
                        />
                      ) : (
                        <Input
                          className="text-black bg-white"
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

      </div>) : null}
      <section className={`px-4 ${step === 'message' ? 'py-12' : 'py-0'} md:place-self-center`}>
        <div className="flex place-content-between items-start text-white/80 bg-white/10 p-6 rounded-lg shadow-lg w-full opacity-0 contact-toast">
          <p className="text-lg">{toastMessage}</p>
          <IoIosCheckmarkCircle className="w-8 h-8 text-green-500" />
        </div>
      </section>
    </div>
  )
}
