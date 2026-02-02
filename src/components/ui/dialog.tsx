"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        asChild
    >
        <motion.div
            ref={ref as any}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
                className
            )}
            {...props}
        />
    </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    return (
        <DialogPortal forceMount>
            <DialogOverlay />
            <DialogPrimitive.Content
                asChild
                ref={ref}
                {...props}
            >
                <motion.div
                    initial={isMobile ? { y: "100%", opacity: 1 } : { scale: 0.95, opacity: 0, y: "-50%", x: "-50%" }}
                    animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: "-50%", x: "-50%" }}
                    exit={isMobile ? { y: "100%", opacity: 1 } : { scale: 0.95, opacity: 0, y: "-50%", x: "-50%" }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300
                    }}
                    className={cn(
                        "fixed z-50 grid w-full gap-4 border p-6 shadow-lg duration-200 sm:rounded-3xl",
                        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
                        // Mobile: Bottom Sheet, Desktop: Center Modal
                        "bottom-0 left-0 right-0 sm:bottom-auto sm:left-[50%] sm:top-[50%] sm:max-w-xl",
                        className
                    )}
                >
                    {children}
                    <DialogPrimitive.Close asChild>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100/50 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground dark:bg-slate-800/50"
                        >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </motion.button>
                    </DialogPrimitive.Close>
                </motion.div>
            </DialogPrimitive.Content>
        </DialogPortal>
    )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-2xl font-bold font-heading leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
