var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b;
import { ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useState, useEffect, useRef, Component as Component$1 } from "react";
import { useLocation, Link, useParams, Navigate, useNavigate, Outlet } from "react-router-dom";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, Phone, Mail, MapPin, ChevronRight, Check, ArrowRight, DollarSign, Gavel, FileSignature, ArrowLeft, ChevronLeft, Youtube, ChevronDown, HelpCircle, Home, Search, Filter, FileText, CheckCircle, MessageSquare, Clock, Briefcase, Shield, ExternalLink, BookOpen, Award, Users } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { Slot } from "@radix-ui/react-slot";
import Autoplay from "embla-carousel-autoplay";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { createClient } from "@supabase/supabase-js";
import { useFormContext, FormProvider, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const __vite_glob_0_0 = "/assets/avtotechnichna-BKjD1Cef.png";
const __vite_glob_0_1 = "/assets/avtotovaroznavcha-Bx8H4GJb.png";
const __vite_glob_0_2 = "/assets/backgroundnise-D0F-wK-C.jpg";
const __vite_glob_0_3 = "/assets/budivelno-tehnichna-CibHFIeM.png";
const __vite_glob_0_4 = "/assets/dominos-sV1hqgq7.png";
const __vite_glob_0_5 = "/assets/dtek-DxFbg3tu.png";
const __vite_glob_0_6 = "/assets/ekologichna-Cx-F547X.png";
const __vite_glob_0_7 = "/assets/ekonomichna-CuuvNjvP.jpg";
const __vite_glob_0_8 = "/assets/elektrotehnichna-DTc5lguY.jpg";
const __vite_glob_0_9 = "/assets/epicentr-DVDQjJ-A.png";
const __vite_glob_0_10 = "/assets/hersonoblenergo-DnTDKICV.png";
const __vite_glob_0_11 = "/assets/intvlasnist-BTwUFm3X.jpg";
const __vite_glob_0_12 = "/assets/kompleksna-pojejo-eletechnichna-BLp3WWvm.png";
const __vite_glob_0_13 = "/assets/komputerno-tehnichna-h1bU5pJ3.png";
const __vite_glob_0_14 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA7CAYAAACNOi92AAAOUElEQVR42u2beXRVRZ7HP3WXtyUkAQJBmiAkQISgIqSVFnA5uLSKip62bZw57Zljax97VHp6Gccj02o7gh7sozOD4qC0G45oCyqC0DSCqNggnLAl7JCwZQFC1rfdpWr+uO9lY0ki3e1z+n3PuUnurbp1q36f+lXd+tWNUEop0koZad90BdLqqDSQFFMaSIopDSTFlAaSYkoDSTGlgaSY0kBSTGkgKaY0kBRTGkiKKQ0kxZQGkmLqEohMHGn9bWSc2+0y8fNUrmnX+3o6C5CkX2gdzjqme1cVbVC0dqlpKD1Xlx6itTOtPE0qgEA7vfEVIL7pJn67JE7ZMUyeidPMHOo0Zled7/MO2QlE2lu6p27OIQJQrb1dAkrRBiGRIwmjs9Iwuq9TgSQNmvAGpUBoXkJTPE7A78cCSrc1smPPQQ4dPoplWXxnUB4XjhzG+HG5qDiE/KB/0637Fkqc8SOHduO/BCzAAcorwvzi32ay/2ADGEFawo0oTaKbBtKNM6pgEE88/CCXX5IHUUl2SOvgSd5Tv+lmp65EV1+deG9Q0ALMmf8pL772IVEji15559MSbmLylaNxXIvln33FwEFDqK48gN9p5J7bJvPoz24hUwNT4c1J7eeZVp1pQJNdpP//1FnnEAlElY0rTB6Z9Q7/++HnBHufjyJIXThOuKGWUHA09U1NxOJRqpvCOBl96Zs5iLkLV+E6gt/+/GY0AbrSaDWyVCDaBjSFQgiBUgqhJGjfjAsl+6YQ4qx5WuvaId+pHag75XXWWbufAqQwWfbFLl5ZtJq+BWM4EXXQ/JD/nQwK8zMZNyyHqVePZciATPpnhdB1P0eqm8gtGM/zry1nwYo9NCtwFSA07LiNlIAA13axYxGQLi6u1yglwXVRrsSyLaTjggRpK5DgxJ3W9jtxB9dxUUrhOi4tLS24jtt6ra0RnQ5AOYm0dodQAnGa8dS13Hb5BUp6RnYdhXTbA2kzp4uLTLypKqVaj3MCkqz/vDcX4+87iONRCOTkMnJ0MWMuLmL4kDymXFPCpaOGM/aCAsaPvZALhhdBoBc1DXGy8kfy/CsLiQmwEu00A36UrmM7gKlj+oMI3UBHRwgNNAN008tr+NEMHSVBMwVoYPgNnLhDS3MLummgGzoSgTB0TH8A3dARiWvRSJzONojHLc9grtP2Vpg8NFqH00hzpBWE7tMRBsQicYSWfMnx5LhOwtA6cSeC7Spstz2AngWeuvSQDeXVbN1dgZaRjesLIc0AO/bvZ+EbC5h4+Xg+W/MVX325jlu+fx3vvfUG1UcPomk6ht9HRnYONfWNLF5RTkzCxtIdrF67AV1AU0zxzLNzqDxSjZOoc1xKEIKqw1X8ef0mDhyoxLIcHOV1Q8tyUBKUppOZnYnQIBp30QTs3V/JU7Oe4d77p/PkU7OJxG18IX9rOwCkqzB0HeWApult3nEa79E0Hd2nE4vFAIhG4gQy/EgXbNvFkaAbAqELz1twQNcQujcaJ9dhUtDqKecMRAIbNpfh6iFcYRAJR4hKF6GbFAwbik8IRhYVMbpoJD7XorhwMA0n68jIDBKJtWC7Duh+Pv38K4QOG0q3Un28gYiCsZdezkUll5M/eCCugJhSCE1HAsKfidRMMHy4wuDgkWM0NNtopoHQQJmCzeX7qGu2EH6dTdv3Mf/1t7lswlX88uFHeOTRXyN0ExewNXAFOAKkIdhcvofSsl1EXUHEwjvstsMFhAEbtpRxuOokeihA3AXN72fHnkPEXTBNHVvCjn0HWf3ZugRLE0SAvQcOUlVznFhMoQujKxP3HMixumbQgwR7ZYGu0AwfTU0NRE7WktcryAX52Ywe2pfckE688Rg4MWw7Do6F0kAYJs3hCBoQyshm5979TJl6NzMef5Irrx5LRXWY/5j1n8S9qYJnX1jA5xu3UheJsmrdeh745Qy27j3M8y+/ydtL1lJZ5/LTnz/Gtr2Heejhx6kPw+rP11O+t4KM3nm8uXAxZfuO4egw7433mfKDe4gJsAU89sxL7Kis4d2lq/hsUxlrN5bx7tJPwA+WCfMWLGLX4Wamz3iWQyda+K9XFrDnSBMLP1zNfdNnULqrkumPPMn2ygaef/ENFi1ZRWNE8PisOUQsmPn0C7y/ZCXzX3+HtxcuwQVQAi2xpuvO5N4lvmjcxZEKpVxwbfx+E01a3HX7FK6ZWICJN+yWFA/gR7fehBUPI4QCTeEol6ysTFwpkYDjOOzYuYNpd03j4+UfI4CYA7v2V3LiZD22giM1dWzduY/SbTso372PmvomCotGs750O+V7Knj3g48YeeEl3DL1aiZdfQ1z5y+gMWzhD/VmzNhhDBk+iidnPktVrUXF0ePkF45g2Seb+XLrYRYt/ZhhxRczePhInpj1LCtWf87KT9dRtr+JdxavpeLoMRa8u5gvNm5h7PiJRFzBz6b/itKy3QwcXMg111/BmJLv8f5HK5hw5WS++70rkBhs2lLOgreWUt8Y5aHp9/HPDzzI+g1bqDjUdOoa7FyB5PbpgwCceBiERMkoWSGTn0ybRC8BlgW2BTka3Hz9lYQChjdmGjpSOtTXnSAj6EcDsrNC3DZlCnff+X3qaquY//vFDMzPIGpL8vv3wRBgZmRxXn4BBcNHcN7AgeTm9qW6popLS8YS8Bns3rOba6+7DgmMKxmHaZjsPVDBD380DQFcd/1VDB4ylHcXLeaiiy5kxqMPs+6LddTW1DJp0hVY0QhCuvzm3x9lQP9cMoJ+jtfWcPxYDRlBP7XVVVw1aQK11VUUDR/Gb2Y8ihWPMnHiBEJ+GDvmYmqrq1i7di2rPllJxaEKXnttLjk5fRk37rv4BGRlwIgRIzhYWekZUYluv/pqXSUOHzqYgCaxIxFMQ+BGmxg7uohQyBub//W3c/nVYy9wPAYDB0BJcTEBbHQdNBlHjzVwQX4/HAui4WbqT9ZiACs/XsjSj95n44ZdGJpkzsuvYktY86flNNaf4ETtMWqOHMaOtjB+3DAGD8yjdON6Bg3ox9z/fo4g8Pr8efTL7cO999zNzKeewAVmzZyNFQ/T3FBHyO+jXxY0njyGHW0m3HCCEQWDKCocwvbSjWRlBBg+dDDjS0Zwz4/vRDlxJl5Wws7tWxhTnA92jKMH93NB4RBemvM8OvDyvBcxcNmxbTM/njaN6fffxexnnqOxsY6Vy5eyrbySL7/cypbSr5g04aKeuQcglDzzy7EtoLIFrvvhv3A0nk1G30HEmmp56Cd3ct8PhvH07PdYua4clMHI/P68NOdefjd3I28t+Rjbn01Qi5AXq+CV2TO4rPh8ynZWkNO7N3kDcnBdOHioisNHqyguHsmCBW8watQoNCNATk4femf3AmDVqk8QQqAJwQ033kD/fjl88MEKDh06REFhIVNumgxAaelOVqxYTmFhITfedBN79+xlzJiRaBps2bqb3jk5RKJRFi9ahM/n44477sAwTE7UneDii4qwHdi2tYySktGsWfNnNm/ejJSSBx98gLkv/Q+GrpOfn49l2dx5xxQ2bSpnzZo1mKZO3nkD+Ie7bmPnrsMsXfYRoYCPqVNvZ0BeH3w6tHeOroakswJxBUSA3/3+jzw9bxkFxZdyoGI7Hy56hiWL1/HeBysIa30I+DNx6muYdsfN3HrjGKbe/iD9BxfQUL2XuycX8dwT04nHJaZP81btwhtancQCURNtobP2FU6u7RXguODXvbeg9gpHJIGAhqF5AQCpwEiEz3TAUV75jgSfBpb00pPPST7XUeA4EPCWQEjAdsHU4cW5rzKupIQxF1+Iz5cIuApwpfe3kt7SyXEgmIh9RG0wzVMBnBMQgJjrxbFu+cfHKTt0kgnXXk1mn1ze+2AZWf3yaQo7mD4fmrCJNxzn/nvupuHoUf64eBHjRw9h4bxfEBRgCK/RiITRvHUeTRGLjJCPxqYwwWAQoSk0TW+NngggHLHQdQ3DMPDrEI5JLMvC7/ejGwJD94BFo3GCQT+65pWfXGK4CQjRmMSVEiEEpumFbgy9LW/MBp/pleU6nlkMU+DToCniIITAsW1CGQF0DSJRB7/fIB536BUycJV3TReKjKCJ7YLeKeR9zkCkksSFRtmBKP/00MM0OAI95zyi9KLFEvgzM4iEvQm/l09DjzUQiDeS5Yb5w6tzGDbQ66kxG0wjEWBIQIlFLQxDR9M0DKMtaNG5QjoQdxSaLvB1mhuTHpRcbEu8ME3SyApwksY1BHoiXzzR+7VEHjtxT9yWBEzN8xq8YF/UluiGhi48WMn7kungea5jebB9pldJy3ExjI5Ezg2IAInERcPFC8E/Mvtt/rB0LfWRAL5euYiMAMLQ0G2HxpqDDM3LYNIlhTz+659yfrZX0XYRidYKuaptbO3Ofzl2fknpKkacVOeyu1vOmcpL3nOmtXf7RbmUCt3oWaC0Sw9JPkGi4QCNwJ7DLsuWreNPa7+kPtJMQ1MT/XrncMPkK5h267UMHgA5BijXxtTNDuG69h9BnM1w7Wro/eoU9Os2kE7+1t1yzlRe1wbt9LweRHq9++VZNqiSv1Wi5hrUWYqQT7QOES0xiMUUfXO84UACtgNBHaTjomt6h63DbgMR7S/I0xjy9A2VnQB0DeTsBpM9XNl1BKL9FYAkLdcuItrs2PgBzVUYfp+XTTpomtG6364ntuGT2/HgBdp6DkT2yJCpBQSE6NlGdtdDVvtU4RlOCtCS3zyIjukd7msH49y3bdv3jJ6oK4P+pTfDuiivi+3srr86Eaee6mdqo+riPK0udY6fkv4t9XX31r9dX1T8fX1B8C1Qzz3k63a4v9hc8i1XF+1Pe0iKKQ0kxZQGkmIy/u7H9BRT2kNSTGkgKaY0kBRTGkiKKQ0kxZQGkmJKA0kxpYGkmNJAUkxpICmm/wOy5zrFLQjdbwAAAABJRU5ErkJggg==";
const __vite_glob_0_15 = "/assets/logonise-Cldcrg7F.png";
const __vite_glob_0_16 = "/assets/mau-Whr6KUeT.png";
const __vite_glob_0_17 = "/assets/metro-BPDyEDo0.png";
const __vite_glob_0_18 = "/assets/mystectvo-CZYCx6nn.jpg";
const __vite_glob_0_19 = "/assets/naukovo-pravova-B2NjJwQZ.jpg";
const __vite_glob_0_20 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1200'%20height='1200'%20fill='none'%3e%3crect%20width='1200'%20height='1200'%20fill='%23EAEAEA'%20rx='3'/%3e%3cg%20opacity='.5'%3e%3cg%20opacity='.5'%3e%3cpath%20fill='%23FAFAFA'%20d='M600.709%20736.5c-75.454%200-136.621-61.167-136.621-136.62%200-75.454%2061.167-136.621%20136.621-136.621%2075.453%200%20136.62%2061.167%20136.62%20136.621%200%2075.453-61.167%20136.62-136.62%20136.62Z'/%3e%3cpath%20stroke='%23C9C9C9'%20stroke-width='2.418'%20d='M600.709%20736.5c-75.454%200-136.621-61.167-136.621-136.62%200-75.454%2061.167-136.621%20136.621-136.621%2075.453%200%20136.62%2061.167%20136.62%20136.621%200%2075.453-61.167%20136.62-136.62%20136.62Z'/%3e%3c/g%3e%3cpath%20stroke='url(%23a)'%20stroke-width='2.418'%20d='M0-1.209h553.581'%20transform='scale(1%20-1)%20rotate(45%201163.11%2091.165)'/%3e%3cpath%20stroke='url(%23b)'%20stroke-width='2.418'%20d='M404.846%20598.671h391.726'/%3e%3cpath%20stroke='url(%23c)'%20stroke-width='2.418'%20d='M599.5%20795.742V404.017'/%3e%3cpath%20stroke='url(%23d)'%20stroke-width='2.418'%20d='m795.717%20796.597-391.441-391.44'/%3e%3cpath%20fill='%23fff'%20d='M600.709%20656.704c-31.384%200-56.825-25.441-56.825-56.824%200-31.384%2025.441-56.825%2056.825-56.825%2031.383%200%2056.824%2025.441%2056.824%2056.825%200%2031.383-25.441%2056.824-56.824%2056.824Z'/%3e%3cg%20clip-path='url(%23e)'%3e%3cpath%20fill='%23666'%20fill-rule='evenodd'%20d='M616.426%20586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074%208.463-8.463h2.565l7.18%207.181V586.58Zm-15.715%2014.654%203.698%203.699%201.283%201.282-2.565%202.565-1.282-1.283-5.2-5.199h-6.066l-5.514%205.514-.073.073v2.876a2.418%202.418%200%200%200%202.418%202.418h26.598a2.418%202.418%200%200%200%202.418-2.418v-8.317l-8.463-8.463-7.181%207.181-.071.072Zm-19.347%205.442v4.085a6.045%206.045%200%200%200%206.046%206.045h26.598a6.044%206.044%200%200%200%206.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z'%20clip-rule='evenodd'/%3e%3c/g%3e%3cpath%20stroke='%23C9C9C9'%20stroke-width='2.418'%20d='M600.709%20656.704c-31.384%200-56.825-25.441-56.825-56.824%200-31.384%2025.441-56.825%2056.825-56.825%2031.383%200%2056.824%2025.441%2056.824%2056.825%200%2031.383-25.441%2056.824-56.824%2056.824Z'/%3e%3c/g%3e%3cdefs%3e%3clinearGradient%20id='a'%20x1='554.061'%20x2='-.48'%20y1='.083'%20y2='.087'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='b'%20x1='796.912'%20x2='404.507'%20y1='599.963'%20y2='599.965'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='c'%20x1='600.792'%20x2='600.794'%20y1='403.677'%20y2='796.082'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3clinearGradient%20id='d'%20x1='404.85'%20x2='796.972'%20y1='403.903'%20y2='796.02'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3cstop%20offset='.208'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='.792'%20stop-color='%23C9C9C9'/%3e%3cstop%20offset='1'%20stop-color='%23C9C9C9'%20stop-opacity='0'/%3e%3c/linearGradient%3e%3cclipPath%20id='e'%3e%3cpath%20fill='%23fff'%20d='M581.364%20580.535h38.689v38.689h-38.689z'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const __vite_glob_0_21 = "/assets/pocherkoznavcha-BBFsy_gk.jpg";
const __vite_glob_0_22 = "/assets/poltavaoblenergo-DmMTPCej.png";
const __vite_glob_0_23 = "/assets/privat-DU_t25K4.png";
const __vite_glob_0_24 = "/assets/psyhologichna-DU-TEFBE.jpg";
const __vite_glob_0_25 = "/assets/redbull-BGwBwdjx.png";
const __vite_glob_0_26 = "/assets/semantyko-tekstualna-CY2UUnhI.jpg";
const __vite_glob_0_27 = "/assets/tovaroznavcha-C4J2Yma6.jpg";
const __vite_glob_0_28 = "/assets/trasologichna-DWu3RuMD.png";
const __vite_glob_0_29 = "/assets/ukrtelekom-b_LGBEFu.png";
const __vite_glob_0_30 = "/assets/uzniyport-l3K1PPjT.png";
const __vite_glob_0_31 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAQCAYAAADgUdqDAAAI20lEQVRYCe2YWWxU1xnHpw/tQ6VWidqqb2kVqaGVUrVq00ZtUNqmeSilJShqqGhZEgElAUICJI3ZQ0jYHPbVBIxZDA5rMUtZQm2IyxowBmwwGNsYb2C8z4xnuTP/6nfsz7m6SoQq8ciRzpztW/7fdu69E5K61N3jkjy5lpIUk7xOKRHu3vaUUlwxhdNRdSmiWKJNKQiUEuQP+4PxQQg3dwckJqlDUqOkmp5+S1JVz7xdcrSS58EjJbywC8fDYDyYYODHUMLznINTXkRKV0s6IilL6fRsRZJvS5ospVdJKpXXUKlodaPU6SkapXS66+NhQB5gQMLJpDq9DnWoRjEV6c6dd9TUNES3WwarpvklNdYNlFc/SSrP1aeLZ0tN7VJ7wgWDHy65hwF5cD4ItcpTu5rVoJO6nM7UZe8VVaRHqFFLFNNWqSNbupunvYOeVEPmW1JztZQMKx2P9gYjmUqJTrORVTzZHTiqkBZLxN0e+52RiKOFzs4Z2bczeDrCna6zB62ntJPFHF3IjMZjau/scHSRWJfjb+3gipXbb2lv6+WB1o8LeYbH5MOLXNMBLvissYaPc5phAg97nCMDHqPBDnCwNn3QW0cfLRRWRHkn12ritt9r4sEfacyBb2h6QR+tKRytmIql5GV9Nuc15f7wESl3sdr2rJXuXJOSXS4gBq7wxHG9nfGOJkyaqJzNm3qNRiGN0ZRiAHwGlvmXNTOWc3OCjSbX5BAMm5uhfrnswWuYoP2k4D9avHSJ1mWvdwE1PTgtiIs9eLADOXTbY6Qx+nWYnYbL6Fjbnh9PKKlaHSpeqWn5z2l8wU/049Uh/XTR17WldLk81avi0Mda/szTuvb873T4ie9p44BfSjVnpUREQMCVKLUsBMyYcWNdlu7as0fLV63U4aNHnPJjhQUO7NFjx3ThYrEKjhe687378p0xFy9d0rbtH2vBwg91qfSKmttaNT8zUxs2bdSqNasdzYmiIq3OylL+/n2qqrmltevXKWvdR26PfRy7cvUqIRPHrd+Q7WRAS5Wx/nDxIjU23dW1G9cd1iOfHNXlslJnR219neNftGSxSq5cdlmeu22bWN+91+Tojn96wtESTOwtr7ihpSuWCzp8gV1btuYqc9FC1d9pdLqWLFvm5FbfrlHRqZOa/u5M7Tuw39lkP8gKSbeVUJmKtEzv1w7StzNDWhCepVuqUkrtUl2tdKVCkcEva893HlHLiklSZ4nkRRXtCYhlBE7r+5tnXYUQdYzEMU//+lc6ffaMcwRGTJk21TkHcGfOnVP/AX9W2bWrzqlU19Xycs2Y9a4w/I2JE9TUfE9Dhw9TOBp1cwzp17+/1ny0VhWVN/W3oUNEheLMufPn6aW/DnJV8Ic/9nP6wUWg4SO4BBW58Iyf8KZbDxj4gnMu+nHs1OnTnZN37NrpkgFeMGXn5GjazBnOh6PHvCaq8tWxY3Tuwnln19a8PH0wb65IvkNHDjubSL6xr49zFYjOf07OcIFijzPzHxUTiuue6nRFy+oz9NjCr2pg0fM6rmOqULmkVinSIW3KU96j31V63DCpZKPUXih57T0vwZ8/N+61tAgn43Ccg8OokpH/GOUAk70/6POE6hoanEGz53wgqmXc+NddRWA0GQUwMhKDDhz6t1uTYdzJOAunTnxrkptjDFeOlT/ZR8VASxVRDa+MHOGcDh93O7ToJkjbd+5wwWNN4EkQkgNHgZ9q44yMB9/+gwc17OXhmrdgvgsqVczadBEYEgAdJCX8xSUXXeWyphoJKldX3o7tjg8bqFjOQ2nFdbWrWAM29lWf5Y+q3/5fqO/SJ5V/Y4v7Jqnala0lP39cm77/FV0f/jOdmPycGk6skeLt7rrCswikTM8XX3DKySCMIlMJzMAXX9SpM6ed4wgQ2Vl6tUx/emGAbtfVavLUKY4PoMtWrnCAceTJ06dcxmPciFEj3QN68JC/O9nIIEg0Am6B5AojY2lcl1xjBGhP/l6HkQoiCGQpASBLuSpJCq5d5BI0gkxSEGCuHvBzNRHUjCmTnc0EAmyscTQJhEwSkpvg/blztDl3iwsuAcRPVD/PWSoF/us3K5wMEojrLgTw2uhNHWpdr9zoDD219Gsad/C3atMFSRU6l/WGTs94VhenfEuFb35TG0Y9pdL8HCnMR2R3A9TZ8585I7hLuUbYAxRXAJlIYLi22McBPCMqq6ud08h6Mo0sxGG79/6r90ojcPDgGAxCNhm4c/cuF1T2OCO7aBhIcrAmGDTecOxqIBh09JGlPEd4TpEYOBwsyCSrwYlUrl2eazxT6FQB+1Q3MshusJMA2EkAwch1Bx23BrisMSfg6EAXWKGju4AkFVajLmp9+SQN3fyYzuk9NcSypeRuKZwjVU+V6kZLlRmSd13qjEhdn78GIhDBNKJM5wHqV8YZCjGAfea2Bz+d7MbhNHtJYJ9nhzWTzxoZnDPS7TUTGu52RvTR0GlzeGi2doseWZzB529GZzayxj5GsNm+4aAaeKEAg71ZGm5ojd5Gv84QUMNqUZPqlfXfmTrT/J7Kmseo7t5wtdT9RZGqgUreGi7VzZIat0uN1VKbJ/eK1R0D5xQDAFCAANYUMRqQ4IgT/Z1stvL9Ij7k+ntQHjz+bk6y0c/LHNx0C57R2ejHxtz2/SP6zH5s93c/HfOg/iD+EP9PpRRVZbhKlV0l8nRKCW1WNDZNHa2vSskMKcVdXSAlqqRYsjsYPSlkAgFlRjE3IHb+ZaPR2QivNWZBPs79/X7nJtdGy1Qbbd+v0/YYg/L9Z3YOHpPnx8Y8SG90Ngblh9QVlxJJV/T80eipU57uKKUySSWSrkniT8ZWKQ2dNfcFIr5ZUWrNANg6qDC4NrrgaDKD9CbfxuD5/RwSpP8ivSbbMPhp/GfMkeenC54H10H9wXXIfUx0JKRw3F3E3ELuD/l0XLE0f1f0qMP/PdPu8PHVGlMynbRtP+7eeVBhcB0EjEMpa+hoQfpewT2T4Pn9AhLkhx4ZPaa50Y8pKN9/xhx+40X2/6s/KP9/Vh4A0hDWnkYAAAAASUVORK5CYII=";
const __vite_glob_0_32 = "/assets/zemelno-technichna-B7xkSXVK.png";
const __vite_glob_0_33 = "/assets/zemelnotehnichna-BwYuXqrE.jpg";
const __vite_glob_0_34 = "/assets/zytomyrenergo-COJ4ciFj.png";
const modules = /* @__PURE__ */ Object.assign({
  "./avtotechnichna.png": __vite_glob_0_0,
  "./avtotovaroznavcha.png": __vite_glob_0_1,
  "./backgroundnise.jpg": __vite_glob_0_2,
  "./budivelno-tehnichna.png": __vite_glob_0_3,
  "./dominos.png": __vite_glob_0_4,
  "./dtek.png": __vite_glob_0_5,
  "./ekologichna.png": __vite_glob_0_6,
  "./ekonomichna.jpg": __vite_glob_0_7,
  "./elektrotehnichna.jpg": __vite_glob_0_8,
  "./epicentr.png": __vite_glob_0_9,
  "./hersonoblenergo.png": __vite_glob_0_10,
  "./intvlasnist.jpg": __vite_glob_0_11,
  "./kompleksna-pojejo-eletechnichna.png": __vite_glob_0_12,
  "./komputerno-tehnichna.png": __vite_glob_0_13,
  "./kyivoblenergo.png": __vite_glob_0_14,
  "./logonise.png": __vite_glob_0_15,
  "./mau.png": __vite_glob_0_16,
  "./metro.png": __vite_glob_0_17,
  "./mystectvo.jpg": __vite_glob_0_18,
  "./naukovo-pravova.jpg": __vite_glob_0_19,
  "./placeholder.svg": __vite_glob_0_20,
  "./pocherkoznavcha.jpg": __vite_glob_0_21,
  "./poltavaoblenergo.png": __vite_glob_0_22,
  "./privat.png": __vite_glob_0_23,
  "./psyhologichna.jpg": __vite_glob_0_24,
  "./redbull.png": __vite_glob_0_25,
  "./semantyko-tekstualna.jpg": __vite_glob_0_26,
  "./tovaroznavcha.jpg": __vite_glob_0_27,
  "./trasologichna.png": __vite_glob_0_28,
  "./ukrtelekom.png": __vite_glob_0_29,
  "./uzniyport.png": __vite_glob_0_30,
  "./zakarpattyaoblenergo.png": __vite_glob_0_31,
  "./zemelno-technichna.png": __vite_glob_0_32,
  "./zemelnotehnichna.jpg": __vite_glob_0_33,
  "./zytomyrenergo.png": __vite_glob_0_34
});
const expertiseImages = {};
for (const path in modules) {
  const fileName = path.replace(/^\.\//, "");
  expertiseImages[fileName] = modules[path];
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logo = expertiseImages["logonise.png"];
  const whiteBackgroundRoutes = ["/ekspertyzy", "/kontakty", "/tsiny", "/pro-nas", "/posluhy/ekspertne-doslidzhennia-za-zaiavoiu", "/posluhy/ekspertyza-za-ukhvaloiu-sudu", "/posluhy/shcho-vkhodyt-u-vartist"];
  const isExactWhiteBgPage = whiteBackgroundRoutes.includes(location.pathname);
  const headerClasses = isExactWhiteBgPage ? "bg-white shadow-md py-3" : scrolled || isOpen ? "bg-white shadow-md py-3" : "bg-transparent py-5";
  const textClasses = isExactWhiteBgPage || scrolled || isOpen ? "text-gray-900" : "text-white";
  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => setIsOpen(false), [location.pathname]);
  const navItems = [
    { name: "Експертизи", path: "/ekspertyzy" },
    { name: "Наші ціни", path: "/tsiny" },
    { name: "Контакти", path: "/kontakty" },
    { name: "Про нас", path: "/pro-nas" }
  ];
  const isActive = (path) => location.pathname === path;
  return /* @__PURE__ */ jsx("header", { className: `w-full fixed top-0 left-0 z-50 transition-all duration-300 ${headerClasses}`, children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo,
            alt: "НІСЕ Логотип",
            className: "h-12 w-auto"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: `font-bold text-xl md:text-2xl ml-3 ${textClasses}`, children: "НІСЕ" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
        navItems.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.path,
            className: `text-base font-medium transition-colors ${isActive(item.path) ? "font-bold" : ""} ${textClasses}`,
            children: item.name
          },
          item.name
        )),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/kontakty",
            className: `px-5 py-2 rounded-md font-medium transition-colors ${isExactWhiteBgPage || scrolled || isOpen ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-white text-gray-900 hover:bg-gray-100"}`,
            children: "Замовити консультацію"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleMenu,
          className: "md:hidden focus:outline-none",
          "aria-label": isOpen ? "Close menu" : "Open menu",
          children: isOpen ? /* @__PURE__ */ jsx(X, { className: `h-6 w-6 ${textClasses}` }) : /* @__PURE__ */ jsx(Menu, { className: `h-6 w-6 ${textClasses}` })
        }
      )
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden absolute left-0 right-0 top-full bg-white shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-4 space-y-4", children: [
      navItems.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.path,
          className: `text-base font-medium transition-colors py-2 ${isActive(item.path) ? "text-gray-900" : "text-gray-600"}`,
          children: item.name
        },
        item.name
      )),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/kontakty",
          className: "px-5 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors text-center mt-4",
          children: "Замовити консультацію"
        }
      )
    ] }) })
  ] }) });
};
const Footer = () => {
  const logo = expertiseImages["logonise.png"];
  return /* @__PURE__ */ jsxs("footer", { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-gray-900 text-white pt-16 pb-12", children: /* @__PURE__ */ jsx("div", { className: "container-custom", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "НІСЕ Логотип",
              className: "h-12 w-auto"
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "НІСЕ" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-6", children: "НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ успішно працює у сфері проведення експертизи з 2007 року." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/nise.com.ua", "aria-label": "Facebook НІСЕ", className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/ekspert_online/", "aria-label": "Instagram НІСЕ", className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", clipRule: "evenodd" }) }) }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/ExpertOnlineUA", "aria-label": "Telegram НІСЕ", className: "text-gray-400 hover:text-white", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M9.993 15.51l-.393 4.037c.564 0 .811-.244 1.112-.537l2.665-2.522 5.527 4.035c1.012.556 1.73.264 1.99-.936L23.95 4.614c.315-1.424-.516-1.977-1.47-1.636L1.588 9.285c-1.388.537-1.373 1.29-.244 1.638l5.785 1.8 13.41-8.463c.63-.39 1.21-.173.736.217l-10.5 9.033z"
            }
          ) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-6", children: "Швидкі посилання" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-400 hover:text-white transition-colors", children: "Головна" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy", className: "text-gray-400 hover:text-white transition-colors", children: "Експертизи" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/tsiny", className: "text-gray-400 hover:text-white transition-colors", children: "Наші ціни" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/pro-nas", className: "text-gray-400 hover:text-white transition-colors", children: "Про нас" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-6", children: "Послуги" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy/budivelno-tekhnichna-ekspertyza", className: "text-gray-400 hover:text-white transition-colors", children: "Будівельно-технічна експертиза" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy/zemelno-tekhnichna-ekspertyza", className: "text-gray-400 hover:text-white transition-colors", children: "Земельно-технічна експертиза" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy/pocherkoznavcha-ekspertyza", className: "text-gray-400 hover:text-white transition-colors", children: "Почеркознавча експертиза" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy", className: "text-gray-400 hover:text-white transition-colors", children: "Всі послуги" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-6", children: "Контакти" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 mr-3 text-gray-400 mt-0.5" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("a", { href: "tel:+380445813090", className: "text-gray-400 hover:text-white transition-colors block", children: "(044) 581 30 90" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+380503601682", className: "text-gray-400 hover:text-white transition-colors block", children: "(050) 360 16 82" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+380675555222", className: "text-gray-400 hover:text-white transition-colors block", children: "(067) 5555 222" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 mr-3 text-gray-400 mt-0.5" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@nise.com.ua", className: "text-gray-400 hover:text-white transition-colors", children: "info@nise.com.ua" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 mr-3 text-gray-400 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "04207, Україна, м. Київ, вул. Левка Лук'яненка, 21, корпус 3, офіс 7" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-black py-6", children: /* @__PURE__ */ jsx("div", { className: "container-custom", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col md:flex-row justify-between items-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ. Всі права захищені."
    ] }) }) }) })
  ] });
};
const Hero = () => {
  const background = expertiseImages["backgroundnise.jpg"];
  return /* @__PURE__ */ jsxs("section", { className: "relative pt-24 pb-16 md:pt-32 md:pb-28 bg-gray-900 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: background,
          alt: "Незалежний Інститут Судових Експертиз НІСЕ",
          className: "w-full h-full object-cover opacity-40",
          fetchPriority: "high",
          decoding: "async",
          width: "1920",
          height: "1080"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container-custom relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight", children: "Незалежний Інститут Судових Експертиз — Професійні судові експертизи в Україні" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed tracking-wide", children: "Наша команда кваліфікованих експертів, атестованих Міністерством юстиції України, гарантує професіоналізм,  достовірність та високу якість експертної підтримки. Ми працюємо для того, щоб ви отримали об'єктивні та обґрунтовані експертні відповіді на найскладніші питання." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/kontakty",
            className: "px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors inline-flex items-center",
            children: "Замовити консультацію"
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/ekspertyzy",
            className: "px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors inline-flex items-center",
            children: [
              "Наші послуги ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "ml-2 h-4 w-4" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
};
const services$1 = [
  {
    id: 1,
    icon: Gavel,
    title: "За ухвалою суду",
    audience: "Для суддів, слідчих та органів досудового розслідування",
    bullets: [
      "Прийом ухвали суду чи постанови слідчого",
      "Виїзд експерта на об’єкт дослідження",
      "Висновок експерта як доказ у справі"
    ],
    slug: "ekspertyza-za-ukhvaloiu-sudu",
    ctaLabel: "Деталі",
    variant: "light"
  },
  {
    id: 2,
    icon: FileSignature,
    title: "За заявою сторони",
    audience: "Для адвокатів, юридичних та фізичних осіб",
    bullets: [
      "Безкоштовна консультація перед замовленням",
      "Договір та строки погоджуємо наперед",
      "Висновок експерта, що приймається судом"
    ],
    slug: "ekspertne-doslidzhennia-za-zaiavoiu",
    ctaLabel: "Замовити експертизу",
    variant: "accent"
  }
];
const ServicesSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider", children: "Послуги" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mt-2", children: "Два шляхи отримати експертний висновок" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed", children: "Оберіть формат, який підходить саме вам — процес і результат завжди відповідають вимогам суду." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto", children: services$1.map((service) => {
      const isAccent = service.variant === "accent";
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/posluhy/${service.slug}`,
          className: `group rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${isAccent ? "bg-brand-blue text-white shadow-lg hover:shadow-2xl" : "bg-white text-gray-900 border border-gray-200 shadow-sm hover:shadow-lg"}`,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl ${isAccent ? "bg-white/15 text-white" : "bg-brand-blue/10 text-brand-blue"}`,
                children: /* @__PURE__ */ jsx(service.icon, { className: "h-6 w-6" })
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-1", children: service.title }),
            /* @__PURE__ */ jsx("p", { className: `text-sm mb-5 ${isAccent ? "text-white/80" : "text-gray-500"}`, children: service.audience }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-8", children: service.bullets.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(
                Check,
                {
                  className: `h-5 w-5 mt-0.5 shrink-0 ${isAccent ? "text-white" : "text-brand-blue"}`
                }
              ),
              /* @__PURE__ */ jsx("span", { className: isAccent ? "text-white/95" : "text-gray-700", children: b })
            ] }, i)) }),
            /* @__PURE__ */ jsx("div", { className: "mt-auto", children: /* @__PURE__ */ jsxs(
              "span",
              {
                className: `inline-flex items-center font-medium transition-transform group-hover:translate-x-1 ${isAccent ? "text-white" : "text-brand-blue"}`,
                children: [
                  service.ctaLabel,
                  /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
                ]
              }
            ) })
          ]
        },
        service.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/posluhy/shcho-vkhodyt-u-vartist",
        className: "inline-flex items-center gap-2 text-gray-600 hover:text-brand-blue font-medium transition-colors",
        children: [
          /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }),
          "Дивитись, що входить у вартість",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ]
      }
    ) })
  ] }) });
};
const partners = [
  { id: 1, img: expertiseImages["privat.png"], name: "privat" },
  { id: 2, img: expertiseImages["dominos.png"], name: "dominos" },
  { id: 3, img: expertiseImages["mau.png"], name: "mau" },
  { id: 4, img: expertiseImages["epicentr.png"], name: "epicentr" },
  { id: 5, img: expertiseImages["dtek.png"], name: "dtek" },
  { id: 6, img: expertiseImages["ukrtelekom.png"], name: "ukrtelekom" },
  { id: 7, img: expertiseImages["redbull.png"], name: "redbull" },
  { id: 8, img: expertiseImages["metro.png"], name: "metro" },
  { id: 9, img: expertiseImages["zytomyrenergo.png"], name: "zytomyrenergo" },
  { id: 10, img: expertiseImages["kyivoblenergo.png"], name: "kyivoblenergo" },
  { id: 11, img: expertiseImages["hersonoblenergo.png"], name: "hersonoblenergo" },
  { id: 12, img: expertiseImages["poltavaoblenergo.png"], name: "poltavaoblenergo" },
  { id: 13, img: expertiseImages["zakarpattyaoblenergo.png"], name: "zakarpattyaoblenergo" },
  { id: 14, img: expertiseImages["uzniyport.png"], name: "uzniyport" }
];
const PartnersSection = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-12 border-t border-gray-200 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-8", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "НАМ ДОВІРЯЮТЬ" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center items-center gap-10 md:gap-16", children: partners.map((partner) => /* @__PURE__ */ jsx(
      "img",
      {
        src: partner.img,
        alt: `Логотип партнера ${partner.name} - довіряють експертизі НІСЕ`,
        loading: "lazy",
        width: "120",
        height: "80",
        className: "h-12 md:h-16 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
      },
      partner.id
    )) })
  ] }) });
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({
    orientation = "horizontal",
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex",
        orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
        className
      ),
      ...props
    }
  ) });
});
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "aria-roledescription": "slide",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
});
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
});
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      ref,
      variant,
      size,
      className: cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
});
CarouselNext.displayName = "CarouselNext";
const expertiseData = {
  "budivelno-tekhnichna-ekspertyza": {
    title: "Будівельно-технічна експертиза",
    description: "Будівельна експертиза дозволяє перевірити технічний стан та відповідність будівлі будівельним нормам і правилам, при аварійних пригодах (затоплення, обвал, поява тріщин, дефектів і т.п.), а також при розділі приміщень та земельних ділянок, що перебувають у власності фізичних та юридичних осіб.",
    backgroundImage: expertiseImages["budivelno-tehnichna.png"],
    categories: ["Будівництво", "Нерухомість"],
    content: `
      <p>Об'єктами дослідження будівельної експертизи є: будівлі та споруди, приватні житлові будинки та квартири, приміщення під магазини і офіси, виробничі приміщення, склади, будівельні матеріали та відповідна технічна документація тощо.</p>
      <p><b>В рамках проведення будівельно-технічної експертизи експерти НІСЕ:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>визначать варіанти розподілу нерухомого майна та порядку користування домоволодінням;</li>
        <li>оцінять збитки в результаті аварійної ситуації, залиття, пожежі та визначать вартість відновлювальних ремонтно-будівельних робіт;</li>
        <li>визначать якість виконаних будівельних робіт та їх відповідність вимогам нормативних документів та проектної документації;</li>
        <li>визначать технічний стан і величину фізичного зносу окремих конструктивних елементів будинків і споруд;</li>
        <li>встановлять факт аварійності будівель та споруд;</li>
        <li>здійснять експертну оцінку нерухомості для суду в рамках судових справ.</li>
      </ul>
      
      <p class="mt-4">Якщо Ви не можете визначити, який саме підвид будівельної-технічної експертизи Вам потрібен, достатньо зателефонувати нам (або залишити заявку на зворотний дзвінок) і описати обставини справи.</p>
    `,
    directions: [
      {
        title: "ВСТАНОВЛЕННЯ ВІДПОВІДНОСТІ НОРМАМ ДБН",
        slug: "vstanovlennia-vidpovidnosti-normam-dbn",
        description: "Одним з важливих етапів проведення будь-яких будівельно-монтажних або ремонтних робіт, який гарантовано забезпечує дотримання технології виконання робіт, є визначення відповідності виконаних робіт будівельному проекту і нормативно-технічними документами (регламентам, СНіПам, ГОСТам).",
        fullContent: `
          <p>Одним з важливих етапів проведення будь-яких будівельно-монтажних або ремонтних робіт, який гарантовано забезпечує дотримання технології виконання робіт, є визначення відповідності виконаних робіт будівельному проекту і нормативно-технічними документами (регламентам, СНіПам, ГОСТам).</p>

          <p>Для встановлення факту відповідності (невідповідності) збудованої або реконструйованої будівлі проекту і вимогам державних будівельних норм (ДБН) необхідно провести незалежну експертизу.</p>

          <p><b>Об'єктами експертизи щодо відповідності проектно-технічній документації та вимогам нормативно-правових актів у галузі будівництва є:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>виконані будівельні роботи;</li>
            <li>побудовані об'єкти нерухомого майна (будівель, споруд тощо);</li>
            <li>окремі елементи об'єктів нерухомості;</li>
            <li>короткий опис фабули справи;</li>
            <li>заява про проведення експертизи зі вказанням питань для експерта або Ухвала суду про призначення експертизи в НІСЕ.</li>
          </ul>

          <p><b>При виконанні будівельно-технічної експертизи, метою якої є встановлення відповідності ДБН, експертами виконується:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>візуальний огляд об'єкту з фіксацією пошкоджень і дефектів, що виникли під час або після виконання робіт;</li>
            <li>перевіряються геометричні параметри конструкцій;</li>
            <li>застосовуються інструментальні методи;</li>
            <li>вивчається проектно-кошторисна документація, акти виконаних робіт тощо.</li>
          </ul>
        `
      },
      {
        title: "ВИЗНАЧЕННЯ ЯКОСТІ ТА ОЦІНКА ВАРТОСТІ РЕМОНТНО-БУДІВЕЛЬНИХ РОБІТ",
        slug: "vyznachennia-yakosti-ta-otsinka-vartosti-remontno-budivelnykh-robit",
        description: "Незалежна експертиза обсягу, якості та вартості будівельних чи будівельно-ремонтних робіт проводиться у випадках, коли між замовником та підрядником будівельних робіт виникає спір.",
        fullContent: `
          <p>Незалежна експертиза обсягу, якості та вартості будівельних чи будівельно-ремонтних робіт проводиться у випадках, коли між замовником та підрядником будівельних робіт виникає спір.</p>

          <p>Це трапляється, коли підрядники будівельних чи ремонтних робіт економлять на матеріалах і обладнанні, тим самим порушуючи технології будівництва. У свою чергу, це призводить до того, що замовник будівництва чи ремонту отримує зданий будівельних об'єкт чи об'єкт ремонту з тріщинами в стінах та на стелі, похиленими склопакетами, неякісною сантехнікою тощо.</p>

          <p>З метою вирішення спорів та відшкодування нанесених збитків через несумлінного забудовника чи підрядника ремонтних робіт проводиться незалежна будівельно-технічна експертиза.</p>

          <p>Дана експертиза є також необхідною у разі виникнення підозри щодо завищеної вартості будівельних або ремонтних робіт. Так, експертиза встановить фактичну вартість будівельних/ремонтних робіт та/або будівельних матеріалів як на поточну дату, так і на дату в минулому.</p>

          <p><b>При виконанні будівельно-технічної експертизи, метою якої є визначення якості, фактичного обсягу та вартості виконаних будівельних/ремонтних робіт, експертами виконується:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>візуальний огляд об'єкту з фіксацією пошкоджень і дефектів, що виникли під час або після виконання робіт;</li>
            <li>перевіряються геометричні параметри конструкцій;</li>
            <li>застосовуються інструментальні методи;</li>
            <li>вивчається проектно-кошторисна документація, акти виконаних робіт тощо.</li>
          </ul>
        `
      },
      {
        title: "ЕКСПЕРТИЗА БУДІВЕЛЬНОГО ПРОЕКТУ",
        slug: "ekspertyza-budivelnoho-proektu",
        description: "Експертиза будівельного проекту найчастіше проводиться з метою встановлення, чи відповідає будівельний проект державним будівельним нормам.",
        fullContent: `
          <p>Експертиза будівельного проекту найчастіше проводиться з метою встановлення, чи відповідає будівельний проект державним будівельним нормам.</p>

          <p>В результаті неякісного будівельного проекту будівництво може здійснюватися з порушеннями, наслідки яких можуть потягнути за собою адміністративну або навіть кримінальну відповідальність. Як наслідок, від неякісного будівельного проекту значні збитки може отримати компанія-забудовник.</p>

          <p>У ході експертизи будівельного проекту експерти НІСЕ аналізують відповідність передпроектної та проектної документації вихідним даним, технічним умовам і індивідуальним вимогам до проекту чи будівництва. При цьому аналізуються такі параметри у проектній документації, як:</p>
          <ul class="list-disc pl-6 space-y-2">
            <li>Відповідність державним будівельним нормам;</li>
            <li>Експлуатаційна безпека;</li>
            <li>Конструктивна надійність;</li>
            <li>Стійкість споруджуваних об'єктів;</li>
            <li>Раціональне використання природних ресурсів;</li>
            <li>Раціональне використання фінансових та енергетичних ресурсів.</li>
          </ul>
        `
      },
      {
        title: "Оцінка збитку після залиття",
        slug: "otsinka-zbytku-pislia-zalyttia",
        description: "Експертиза збитку, нанесеного в результаті затоплення, проводиться з метою визначення вартості ремонтно-відновлювальних робіт, необхідних для відновлення приміщення або будівлі, яка постраждала від затоплення.",
        fullContent: `
          <p>Експертиза збитку, нанесеного в результаті затоплення, проводиться з метою визначення вартості ремонтно-відновлювальних робіт, необхідних для відновлення приміщення або будівлі, яка постраждала від затоплення.</p>
          <p>Результатом проведення експертизи є об'єктивний експертний висновок, що містить детальний звіт про оцінку збитку, нанесеного нерухомості після затоплення.</p>
          <p>Даний експертний висновок допоможе Вам відстояти свої права на відшкодування збитків як в судовому порядку, так на досудовому етапі вирішення спору.</p>
        `
      },
      {
        title: "Оцінка вартості нерухомості для суду",
        slug: "otsinka-vartosti-nerukhomosti-dlia-sudu",
        description: "Фахівці Незалежного Інституту Судових Експертиз проводять експертну оцінку вартості нерухомості для суду в рамках судового провадження (як за ухвалою суду, так і за заявою сторін).",
        fullContent: `
          <p>Фахівці Незалежного Інституту Судових Експертиз проводять експертну оцінку вартості нерухомості для суду в рамках судового провадження (як за ухвалою суду, так і за заявою сторін).</p>
          <p>В залежності від мети експертизи і поставленого завдання експерт може визначати ринкову і залишкову вартість нерухомості.</p>
          <p>Проведення експертної оцінки нерухомості враховує всі параметри досліджуваного об'єкта: його місце розташування, площу, віддаленість від об'єктів інфраструктури, планування, стан обробки, тип будинку, капітальний та технічний стан, поверховість і ін.</p>
          <h3 class="text-xl font-semibold mt-4 mb-2">Об'єктами експертної оцінки є:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Житлова нерухомість (квартира, заміська нерухомість, домоволодіння);</li>
            <li>Комерційна нерухомість (офісні, торгові, складські і виробничі приміщення);</li>
            <li>Об'єкти незавершеного будівництва;</li>
            <li>Споруду різного функціонального призначення;</li>
            <li>Оцінка земельних ділянок, на яких розташовані будівельні споруди.</li>
          </ul>
        `
      },
      {
        title: "ЕКСПЕРТИЗА КОШТОРИСУ",
        slug: "ekspertyza-koshtorysu",
        description: "У сфері будівництва досить часто трапляються спори стосовно кошторисної вартості об'єкту будівництва. Замовники будівництва – інвестори та забудовники – зацікавлені реалізувати проект без необґрунтованих витрат та відповідно до коректного кошторису. З цією метою проводиться експертиза проектно-кошторисної документації.",
        fullContent: `
          <p>У сфері будівництва досить часто трапляються спори стосовно кошторисної вартості об'єкту будівництва. Замовники будівництва – інвестори та забудовники – зацікавлені реалізувати проект без необґрунтованих витрат та відповідно до коректного кошторису. З цією метою проводиться експертиза проектно-кошторисної документації.</p>

          <p>Обов'язковій експертизі підлягають проекти будівництва об'єктів, що споруджуються із залученням бюджетних коштів, коштів державних і комунальних підприємств, установ та організацій, а також кредитів, наданих під державні гарантії, якщо їх кошторисна вартість перевищує 300 тисяч гривень.</p>

          <p><b>В рамках проведення експертизи кошторису експерти НІСЕ здійснять:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>перевірку індивідуальних елементних кошторисних норм на будівельні та монтажні роботи;</li>
            <li>перевірку загальнобудівельних та адміністративних витрат;</li>
            <li>експертний аналіз проектів будівництва за всіма розділами проектної документації</li>
            <li>перевірку кошторисної документації;</li>
            <li>перевірку фактичних умов будівництва;</li>
            <li>експертну оцінку кошторисної вартості будівництва об'єкту.</li>
          </ul>
        `
      },
      {
        title: "ЕКСПЛУАТАЦІЙНА ПРИДАТНІСТЬ БУДІВЕЛЬ ТА СПОРУД",
        slug: "ekspluatatsiina-prydatnist-budivel-ta-sporud",
        description: "Фахівці НІСЕ проводять будівельно-технічну експертизу з метою визначення експлуатаційної придатності будівель та споруд як житлового, так і нежитлового призначення.",
        fullContent: `
          <p>Фахівці НІСЕ проводять будівельно-технічну експертизу з метою визначення експлуатаційної придатності будівель та споруд як житлового, так і нежитлового призначення.</p>

          <p>В рамках даного дослідження експерти визначать технічний стан об'єкта нерухомості (квартири, будинку, нежитлових приміщень тощо) та його придатність для подальшої експлуатації.</p>

          <p>Окрім того, експерти також можуть провести експертизу функціонального призначення приміщення та встановити, чи належить приміщення до житлового фонду.</p>

          <p>Вартість експертизи визначається після ознайомлення експерта з наданою документацією та відповідно до кількості поставлених питань.</p>
        `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Скільки коштує будівельна експертиза?",
        answer: "Вартість будівельної експертизи залежить від складності об'єкта та обсягу робіт. Для отримання точної інформації, зв'яжіться з нашими спеціалістами."
      },
      {
        id: 2,
        question: "Скільки часу займає проведення будівельної експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "zemelno-tekhnichna-ekspertyza": {
    title: "Земельно-технічна експертиза",
    description: "Земельно-технічна експертиза необхідна при вирішенні земельних спорів, пов'язаних з розділом земельної ділянки, визначенням порядку користування земельною ділянкою, встановленням її місцезнаходження і меж, накладенням меж ділянок одна на одну, помилками в розрахунку площі та ін.",
    backgroundImage: expertiseImages["zemelno-technichna.png"],
    categories: ["Земельні питання", "Нерухомість"],
    content: `
      <p><b>Експерти Незалежного Інституту Судових Експертиз проводять земельно-технічну експертизу за такими напрямками:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>Експертиза меж земельної ділянки</li>
        <li>Експертиза розподілу земельної ділянки</li>
        <li>Оціночна експертиза земельної ділянки (для суду)</li>
      </ul>

      <p class="mt-4"><b>В рамках проведення земельно-технічної експертизи експерти НІСЕ:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>Встановлять фактичні межі та площу земельної ділянки;</li>
        <li>Визначать відповідність меж земельної ділянки правовстановлюючим документам;</li>
        <li>Визначать варіанти поділу земельної ділянки або порядок користування нею (виділення частки в натурі);</li>
        <li>Встановлять факт наявності зміщення паркану між сусідськими земельними ділянками.</li>
      </ul>

      <p class="mt-4">Якщо Ви не можете визначити, який саме підвид земельно-технічної експертизи Вам потрібен, достатньо зателефонувати нам (або залишити заявку на зворотний дзвінок) і описати обставини справи.</p>
    `,
    directions: [
      {
        title: "Експертиза меж земельної ділянки",
        slug: "ekspertyza-mezh-zemelnoi-dilianky",
        description: "Власники земельних ділянок нерідко помиляються в своїх уявленнях про місце проходження меж їх земельних ділянок. Це може призводити до виникнення спорів щодо меж земельних ділянок між сусідами, вирішити які можна за допомогою земельно-технічної експертизи як в досудовому порядку, так і в рамках судового процесу.",
        fullContent: `
          <p>Власники земельних ділянок нерідко помиляються в своїх уявленнях про місце проходження меж їх земельних ділянок. Це може призводити до виникнення спорів щодо меж земельних ділянок між сусідами, вирішити які можна за допомогою земельно-технічної експертизи як в досудовому порядку, так і в рамках судового процесу.</p>
          
          <p>У більшості випадків межові роботи проводяться для уточнення меж і площі існуючої земельної ділянки, а також при формуванні та оформленні нової земельної ділянки.</p>
          
          <p>Крім межування землі нерідко доводиться проводити межування наземних будівель з метою їх юридичного закріплення на існуючій земельній ділянці.</p>
          
          <p>Питання, що стосуються межування земельної ділянки, будівель, Ви можете вирішити, звернувшись до експертів НІСЕ, які в рамках проведення земельно-технічної експертизи визначать межі і площу земельної ділянки, а також їх відповідність правовстановлюючим документам.</p>
          
          <h3 class="text-xl font-semibold mt-4 mb-2">Орієнтовний перелік документів, необхідних для проведення експертизи:</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>правовстановлюючі документи на земельну ділянку (Державний акт або рішення про передачу в користування);</li>
            <li>правовстановлюючі документи на будинок (за наявності);</li>
          </ul>
        `
      },
      {
        title: "ЕКСПЕРТИЗА РОЗПОДІЛУ ЗЕМЕЛЬНОЇ ДІЛЯНКИ ТА ВИЗНАЧЕННЯ ПОРЯДКУ КОРИСТУВАННЯ",
        slug: "ekspertyza-rozpodilu-zemelnoi-dilianky-ta-vyznachennia-poriadku-korystuvannia",
        description: "Поділ земельної ділянки – одне із завдань земельно-технічної експертизи. Необхідність проведення експертизи розділу земельної ділянки виникає при вирішенні земельних спорів, коли сторони хочуть оформити право власності на частки земельної ділянки.",
        fullContent: `
          <p>Поділ земельної ділянки – одне із завдань земельно-технічної експертизи. Необхідність проведення експертизи розділу земельної ділянки виникає при вирішенні земельних спорів, коли сторони хочуть оформити право власності на частки земельної ділянки.</p>

          <p>Експертиза поділу земельної ділянки може бути як досудовою (за заявою фіз. чи юр. особи), так і в рамках судового процесу (за ухвалою суду).</p>

          <p>Основними завданнями при проведенні експертизи поділу земельної ділянки є виділення частки землі в натурі відповідно до частки учасника землекористування.</p>

          <p>При цьому, як правило, необхідний також поділ наявних на земельній ділянці будівель. У разі неможливості поділу земельної ділянки, а також будівель, наявних на ній, експерти встановлять порядок користування ділянкою.</p>

          <p>Експертиза поділу земельної ділянки є найбільш затребуваною при процесах щодо розірвання шлюбу, розподілу землі між родичами, оформленні спадщини.</p>

          <p>Ці та інші питання, що стосуються поділу земельної ділянки, розділу будинку, визначення порядку користування ділянкою, Ви можете вирішити, звернувшись до акредитованих експертів НІСЕ.</p>
        `
      },
      {
        title: "ОЦІНОЧНА ЕКСПЕРТИЗА ЗЕМЕЛЬНОЇ ДІЛЯНКИ (ДЛЯ СУДУ)",
        slug: "otsinochna-ekspertyza-zemelnoi-dilianky-dlia-sudu",
        description: "Оцінка земельної ділянки – це визначення ринкової вартості або вартості права оренди земельної ділянки.",
        fullContent: `
          <p>Оцінка земельної ділянки – це визначення ринкової вартості або вартості права оренди земельної ділянки.</p>

          <p>При оцінці експертом враховуються такі фактори, як місцезнаходження, наявність чи відсутність під'їзних шляхів, газо- та електропостачання, стан ринку землі на момент проведення оцінки та ін.</p>

          <p>Експерти НІСЕ проводять оцінку земельної ділянки лише для суду (за ухвалою суду або ж за заявою сторін).</p>
        `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Скільки коштує земельна експертиза?",
        answer: "Вартість земельної експертизи залежить від площі ділянки та складності справи. Для отримання точної інформації, зв'яжіться з нашими спеціалістами."
      },
      {
        id: 2,
        question: "Які документи потрібні для проведення земельної експертизи?",
        answer: "Зазвичай потрібні правовстановлюючі документи на земельну ділянку, технічні паспорти на будівлі (за наявності), та інші документи, що стосуються межування."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення земельної експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "elektrotekhnichna-ekspertyza": {
    title: "ЕЛЕКТРОТЕХНІЧНА ЕКСПЕРТИЗА",
    description: "Електротехнічна експертиза проводиться з метою дослідження роботи електромережі та електрообладнання, встановлення причин виникнення в них аварійних режимів тощо.",
    backgroundImage: expertiseImages["elektrotehnichna.jpg"],
    categories: ["Електротехніка", "Технічні експертизи"],
    content: `
      <p><b>В рамках електротехнічної експертизи фахівці НІСЕ:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>встановлять причини виникнення аварійних режимів в електричних мережах та електрообладнанні;</li>
        <li>встановлять вплив аварійних режимів на роботу електроприладів та електробезпеку;</li>
        <li>проведуть аналіз роботи електроустановок та їх відповідність нормативним вимогам;</li>
        <li>встановлять обсяг фактично спожитої електроенергії та перевірять розрахунок нарахованих штрафних санкцій відповідно до методик НКРЕКП;</li>
        <li>перевірять якість електропостачання, виявлять факт перепаду напруги та обрахують розмір завданих збитків;</li>
        <li>дослідять опломбування та корпус електролічильників на предмет несанкціонованого втручання та/або електромагнітного/механічного впливу;</li>
        <li>виявлять факт втрати електроенергії через пробій силового кабелю;</li>
        <li>встановлять причини пожежі, яка виникла в результаті короткого замикання та ін.</li>
      </ul>

      <p class="mt-4">Електротехнічну експертизу проводять атестовані судові експерти за спеціальністю 10.18 «Дослідження технічної експлуатації електроустаткування» Геннадій Пампуха та Олег Гаврилюк. За необхідності до проведення дослідження залучаються вузькопрофільні фахівці, а також експерти з європейських юрисдикцій.</p>

      <h3 class="text-xl font-semibold mt-6 mb-4">Експертиза та аудит сонячних електростанцій</h3>
      <p>НІСЕ проводить комплексні експертизи сонячних електростанцій, в рамках яких експерти:</p>
      <ul class="list-disc pl-6 space-y-2">
        <li>визначають ефективність та безпеку сонячної електростанції;</li>
        <li>встановлюють якість та обсяг виконаних робіт по будівництву, монтажу та запуску сонячних електростанцій;</li>
        <li>встановлюють факт відповідності проектно-кошторисної документації вимогам нормативних актів;</li>
        <li>визначають вартість фактично виконаних робіт;</li>
        <li>здійснюють оцінку електричних показників сонячних батарей;</li>
        <li>визначають якість та оцінку ефективності роботи інверторів;</li>
      </ul>`,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Які об'єкти досліджуються при електротехнічній експертизі?",
        answer: "Електрообладнання, електроприлади та їх фрагменти, електропровід, кабелі, пристрої електрозахисту (плавкі запобіжники, автоматичні вимикачі), електрокомутуючі пристрої тощо."
      },
      {
        id: 2,
        question: "У яких випадках потрібна електротехнічна експертиза?",
        answer: "При виникненні аварійних режимів в електромережах, при розслідуванні причин пожеж, при перевірці якості електропостачання, при оцінці сонячних електростанцій та в інших випадках, пов'язаних з електрообладнанням."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення електротехнічної експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "ekonomichna-ekspertyza": {
    title: "ЕКОНОМІЧНА ЕКСПЕРТИЗА",
    description: "В рамках проведення економічної експертизи експерти аналізують фінансово-економічну діяльність підприємств, перевіряють достовірність проведених господарських операцій, які знайшли відображення в документах про економічну діяльність підприємств, фінансово-кредитні операції, бухгалтерський облік та звітність.",
    backgroundImage: expertiseImages["ekonomichna.jpg"],
    categories: ["Економіка", "Фінанси"],
    content: `
      <p><b>До об'єктів економічної експертизи відносяться:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>Первинні документи (накладні, акти приймання-передачі, касові та банківські документи, митні декларації, інвентаризаційні описи, відомості нарахування заробітної плати тощо);</li>
        <li>Облікові реєстри (касові книги, картки складського обліку, реєстри податкових накладних, відомості аналітичного обліку, журнали-ордери, головні книги);</li>
        <li>Бухгалтерська, фінансова та податкова звітність;</li>
        <li>Кредитний договір.</li>
      </ul>`,
    directions: [
      {
        title: "БУХГАЛТЕРСЬКА ЕКСПЕРТИЗА",
        slug: "bukhhalterska-ekspertyza",
        description: "Проведення бухгалтерської експертизи допоможе визначити показники фінансового стану підприємства, відповідність ведення бухгалтерського обліку вимогам чинного законодавства, встановити наявність або відсутність ознак викривлення даних бухгалтерського обліку та звітності.",
        fullContent: `
          <p>Проведення бухгалтерської експертизи допоможе визначити показники фінансового стану підприємства, відповідність ведення бухгалтерського обліку вимогам чинного законодавства, встановити наявність або відсутність ознак викривлення даних бухгалтерського обліку та звітності.</p>

          <p class="mt-4"><b>В рамках проведення бухгалтерської експертизи експерти НІСЕ:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>проаналізують стан розрахунків з організаціями-контрагентами і визначать обсяг заборгованості підприємства;</li>
            <li>встановлять розмір реального збитку та суми упущеної вигоди при порушенні договірних зобов'язань;</li>
            <li>встановлять факт правомірності застосовуваних правил бухгалтерського обліку.</li>
          </ul>

          <p class="mt-4">Висновок бухгалтерської експертизи є належним доказом в судовому провадженні.</p>`
      },
      {
        title: "ЕКСПЕРТИЗА ФІНАНСОВО-КРЕДИТНИХ ОПЕРАЦІЙ",
        slug: "ekspertyza-finansovo-kredytnykh-operatsii",
        description: "Досить часто в результаті кредитних правовідносин можуть виникати спори у зв'язку з визнанням недійсними кредитних договорів та договорів іпотеки, оскарження істотних змін умов кредитних договорів, реструктуризації проблемних кредитів, списання безнадійної заборгованості та ін.",
        fullContent: `
          <p>Досить часто в результаті кредитних правовідносин можуть виникати спори у зв'язку з визнанням недійсними кредитних договорів та договорів іпотеки, оскарження істотних змін умов кредитних договорів, реструктуризації проблемних кредитів, списання безнадійної заборгованості та ін.</p>

          <p>Вирішити подібні спори часто можливо лише завдяки проведенню незалежної фінансово-економічної експертизи.</p>

          <p>Експерти Незалежного Інституту Судових Експертиз пропонують послуги з проведення незалежної експертизи фінансово-кредитних операцій, що є необхідною складовою для вирішення кредитних спорів з банками чи іншими кредитними установами в рамках судового провадження.</p>
          <p><b>В рамках експертизи по кредиту експерти НІСЕ:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>визначать, чи відповідає дійсності розмір процентної ставки за договором на момент його укладення;</li>
            <li>встановлять, чи відповідає розмір щомісячних платежів умовам договору;</li>
            <li>встановлять, чи змінювалася відсоткова ставка;</li>
            <li>встановлять, чи відповідає графік щомісячних платежів реально нарахованим платежам;</li>
            <li>визначать, чи відповідають щомісячні платежі за договором про надання кредиту процентній ставці за цим договором.</li>
          </ul>

          <p>Висновок, отриманий в результаті експертизи, є належним доказом в суді. Експерти НІСЕ проводять експертні дослідження у відповідності до чинного законодавства та діючих методичних рекомендацій.</p>`
      },
      {
        title: "ЕКСПЕРТИЗА ПОДАТКОВОЇ ЗВІТНОСТІ",
        slug: "ekspertyza-podatkovoi-zvitnosti",
        description: "Експертиза податкової звітності може бути необхідна в спорах між фіскальною службою та платниками податків.",
        fullContent: `
          <p>Експертиза податкової звітності може бути необхідна в спорах між фіскальною службою та платниками податків. Досить часто представники контролюючих органів в ході перевірки суб'єктів вдаються до необґрунтованих, спірних підстав до донарахування податків та відповідних штрафних санкцій. У таких спірних ситуаціях доцільним є проведення незалежної експертизи.</p>

          <p><b>В рамках проведення експертизи експерти НІСЕ:</p></b>
          <ul class="list-disc pl-6 space-y-2">
            <li>перевіряють правильність, обґрунтованість та законність податкових операцій;</li>
            <li>перевіряють правильність обрахунку розміру податкового боргу;</li>
            <li>аналізують порядок нарахування та стягнення податків та зборів;</li>
            <li>досліджують правомірність висновків контролюючих органів за результатами здійснених податкових перевірок.</li>
          </ul>
          <p class="mt-4">Висновок експертизи є належним доказом в судовому провадженні.</p>`
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Які документи потрібні для економічної експертизи?",
        answer: "Для проведення економічної експертизи потрібні первинні документи, облікові реєстри, фінансова та податкова звітність, а також інші документи залежно від конкретного випадку."
      },
      {
        id: 2,
        question: "Скільки часу триває економічна експертиза?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "kompleksna-pozhezhna-ta-elektrotekhnichna-ekspertyza": {
    title: "КОМПЛЕКСНА ПОЖЕЖНА ТА ЕЛЕКТРОТЕХНІЧНА ЕКСПЕРТИЗА",
    description: "Комплексна комісійна пожежно-технічна та електротехнічна експертиза встановлює причини та обставини виникнення пожежі та особливості її перебігу. Експертиза проводиться із залученням до роботи експертів кількох експертних спеціальностей, а також вузькопрофільних фахівців.",
    backgroundImage: expertiseImages["kompleksna-pojejo-eletechnichna.png"],
    categories: ["Пожежа", "Електротехніка"],
    content: `
      <p><b>В рамках проведення пожежної та електротехнічної експертизи експерти НІСЕ встановлять:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>вогнище пожежі і час її виникнення;</li>
        <li>особливості виникнення пожежі (напрямок, характер, шлях і швидкість поширення горіння);</li>
        <li>причини виникнення пожежі (коротке замикання, підпал і т.д.);</li>
        <li>чи викликана пожежа порушенням правил пожежної безпеки;</li>
        <li>стан протипожежної техніки на момент виникнення пожежі.</li>
      </ul>

      <p class="mt-4"><b>Завдяки проведенню комплексної пожежної та електротехнічної експертизи в НІСЕ можливо:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>встановити причини оплавлення проводів і кабелів;</li>
        <li>виявити сліди легкозаймистих і горючих рідин;</li>
        <li>визначити природу невідомих джерел запалювання;</li>
        <li>з'ясувати режим роботи електроустановок до виникнення пожежі;</li>
        <li>встановити причин займання електроприладів;</li>
        <li>визначити ступінь надійності засобів електрозахисту.</li>
      </ul>`,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "У яких випадках проводиться комплексна пожежна та електротехнічна експертиза?",
        answer: "Експертиза проводиться при розслідуванні причин пожеж, пов'язаних з електроустановками, для встановлення причин займання та визначення відповідальності."
      },
      {
        id: 2,
        question: "Які фахівці залучаються до проведення експертизи?",
        answer: "До проведення експертизи залучаються експерти з пожежно-технічної та електротехнічної спеціальностей, а також інші вузькопрофільні фахівці за необхідності."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "avtotekhnichna-ekspertyza": {
    title: "АВТОТЕХНІЧНА ЕКСПЕРТИЗА",
    description: "Автотехнічна експертиза проводиться з метою дослідження обставин та причин дорожньо-транспортних пригод",
    backgroundImage: expertiseImages["avtotechnichna.png"],
    categories: ["Авто", "Транспорт"],
    content: `
      <p><b>Ключові напрямки автотехнічної експертизи:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>Дослідження обставин ДТП (переважно за допомогою розрахункових методів);</li>
        <li>Дослідження слідів на транспортних засобах на місці події;</li>
        <li>Дослідження технічного стану транспортних засобів та їх окремих агрегатів.</li>
      </ul>
      
      <p class="mt-4"><b>В рамках проведення автотехнічної експертизи експерти НІСЕ:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>встановлять несправності транспортного засобу, що могли призвести до настання ДТП;</li>
        <li>встановлять причинно-наслідковий зв'язок ДТП та її елементів;</li>
        <li>визначать, чи відповідали дії водія транспортного засобу технічним вимогам ПДР;</li>
        <li>встановлять, чи була у водія технічна можливість запобігти ДТП.</li>
      </ul>`,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Які об'єкти досліджуються при автотехнічній експертизі?",
        answer: "Досліджуються матеріали справи, транспортні засоби, їх окремі агрегати та деталі, сліди на місці ДТП."
      },
      {
        id: 2,
        question: "Для чого потрібна автотехнічна експертиза?",
        answer: "Експертиза допомагає встановити причини ДТП, визначити технічну можливість його запобігання та відповідність дій водія правилам дорожнього руху."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "avtotovaroznavcha-ekspertyza": {
    title: "АВТОТОВАРОЗНАВЧА ЕКСПЕРТИЗА",
    description: "Автотоварознавча експертиза проводиться з метою визначення ринкової вартості колісних транспортних засобів, їх складових, а також розміру вартості матеріальних збитків унаслідок пошкодження траспортного засобу, його вузлів та деталей.",
    backgroundImage: expertiseImages["avtotovaroznavcha.png"],
    categories: ["Авто", "Оцінка"],
    content: `
      <p>Головні завдання автотоварознавчої експертизи – визначення ринкової вартості колісних транспортних засобів в рамках судових справ, а також визначення розміру вартості матеріальних збитків, заподіяних власнику транспортного засобу в результаті дорожньо-транспортних пригод та інших аварій.</p>

      <p class="mt-4"><b>В рамках проведення автотоварознавчої експертизи експерти НІСЕ:</p></b>
      <ul class="list-disc pl-6 space-y-2">
        <li>визначать ринкову вартість транспортного засобу на дату оцінки;</li>
        <li>визначать якість ремонту транспортного засобу;</li>
        <li>визначать розмір матеріального збитку, заподіяного в результаті ДТП;</li>
        <li>встановлять стан частин автомобіля у порівнянні зі станом до пошкодження;</li>
        <li>визначать вартість відновлювального ремонту транспортного засобу після ДТП.</li>
      </ul>`,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Коли потрібна автотоварознавча експертиза?",
        answer: "Експертиза потрібна при оцінці вартості транспортного засобу, визначенні збитків після ДТП, при спорах зі страховими компаніями щодо розміру виплат."
      },
      {
        id: 2,
        question: "Які документи потрібні для проведення експертизи?",
        answer: "Потрібні документи на транспортний засіб, фотографії пошкоджень, документи про ДТП (якщо воно було), та інші документи залежно від конкретного випадку."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "trasolohichna-ekspertyza": {
    title: "ТРАСОЛОГІЧНА ЕКСПЕРТИЗА",
    description: "Трасологічна експертиза вивчає сліди, слідоутворювальні поверхні, установлення властивостей та станів об'єктів, а також установлення механізму слідоутворення тощо.",
    backgroundImage: expertiseImages["trasologichna.png"],
    categories: ["Криміналістика", "Сліди", "ДТП"],
    content: `
    <p>Трасологічна експертиза може призначатися:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>у справах щодо ДТП;</li>
      <li>у справах щодо порушення цілісності пломб на приладах обліку.</li>
    </ul>
    <p>В рамках проведення трасологічної експертизи ДТП експерти вивчають сліди на місці аварії, що залишилися від транспортних засобів, людей, тварин та інших об'єктів.</p>
    <p><b>Трасологічна експертиза ДТП дозволяє:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>відслідкувати механізм ДТП;</li>
      <li>чітко обмежити місце наїзду (зіткнення);</li>
      <li>визначити точки знаходження всіх учасників дорожнього руху;</li>
      <li>встановити напрямок удару, траєкторію переміщення після удару;</li>
      <li>визначити, чи відносяться пошкодження автомобіля до обставин даної ДТП або вони утворилися в результаті іншої пригоди.</li>
    </ul>
    <p><b>В рамках трасологічної експертизи слідів злому, інструментів, виробів масового виробництва:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>визначають причини пошкодження обладнання, побутової техніки;</li>
      <li>встановлюють факт втручання в роботу приладів обліку та пошкодження опломбування;</li>
      <li>визначають, чи відносяться досліджувані фрагменти до конкретного об'єкта.</li>
    </ul>
  `,
    directions: [
      {
        title: "ТРАНСПОРТНО-ТРАСОЛОГІЧНА ЕКСПЕРТИЗА",
        slug: "transportno-trasolohichna-ekspertyza",
        description: "В рамках трасологічної експертизи ДТП експерти вивчають сліди на місці аварії, що залишилися від транспортних засобів, людей, тварин та інших об'єктів.",
        fullContent: `
        <p><b>Трасологічна експертиза ДТП дозволяє:</p></b>
        <ul class="list-disc pl-6 space-y-2">
          <li>відслідкувати механізм ДТП;</li>
          <li>чітко обмежити місце наїзду (зіткнення);</li>
          <li>визначити точки знаходження всіх учасників дорожнього руху;</li>
          <li>встановити напрямок удару, траєкторію переміщення після удару;</li>
          <li>визначити, чи відносяться пошкодження автомобіля до обставин даної ДТП або до іншої пригоди.</li>
        </ul>
      `
      },
      {
        title: "ТРАСОЛОГІЧНА ЕКСПЕРТИЗА СЛІДІВ ЗЛОМУ, ЗАМИКАЛЬНИХ, ЗАПОБІЖНИХ ПРИСТРОЇВ ВИРОБНИЦТВА",
        slug: "trasolohichna-ekspertyza-slidiv-zlomu",
        description: "Трасологічна експертиза слідів злому, замикальних та запобіжних пристроїв виробництва.",
        fullContent: `
        <p><b>Об'єктами дослідження є:</p></b>
        <ul class="list-disc pl-6 space-y-2">
          <li>замки та інші замикальні пристрої;</li>
          <li>пломби;</li>
          <li>контрольні пристрої.</li>
        </ul>
        <p><b>В рамках експертизи:</p></b>
        <ul class="list-disc pl-6 space-y-2">
          <li>визначають причини пошкодження обладнання, побутової техніки;</li>
          <li>встановлюють факт втручання у роботу приладів обліку та факт пошкодження опломбування;</li>
          <li>визначають, чи відносяться досліджувані фрагменти до конкретного об'єкта.</li>
        </ul>
        <p>Даний напрямок трасологічної експертизи у комплексі з проведенням електротехнічної експертизи затребуваний у справах про незаконне втручання у прилади обліку електроенергії.</p>
      `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "У яких справах застосовується трасологічна експертиза?",
        answer: "У справах про ДТП, незаконне проникнення в приміщення, крадіжки, зломи, пошкодження замикальних пристроїв тощо."
      },
      {
        id: 2,
        question: "Що потрібно для призначення трасологічної експертизи?",
        answer: "Необхідні фотознімки слідів, речові докази, акти огляду місця події або самі об'єкти із залишеними слідами."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "ekolohichna-ekspertyza": {
    title: "ЕКОЛОГІЧНА ЕКСПЕРТИЗА",
    description: "Екологічна експертиза — це дослідження, аналіз і оцінка результатів господарської діяльності, яка може впливати або впливає на стан навколишнього природного середовища або здоров'я людей.",
    backgroundImage: expertiseImages["ekologichna.png"],
    categories: ["Екологія", "Довкілля"],
    content: `
    <p><b>В рамках проведення екологічної експертизи експерти НІСЕ:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>встановлять можливі екологічні ризики при здійсненні підприємством своєї діяльності;</li>
      <li>проаналізують дотримання підприємством чинного законодавства з питань охорони навколишнього середовища та встановлених нормативів по чистоті атмосферного повітря, поверхневих і підземних вод, ґрунтів;</li>
      <li>виявлять, чи є у взятих пробах сліди забруднюючих речовин, які негативно впливають на екологічний стан навколишнього середовища;</li>
      <li>визначать умови, що призвели до негативного антропогенного впливу заводу, фабрики, іншого промислового об'єкту на навколишнє середовище;</li>
      <li>проаналізують дозвільну документацію щодо ступеня забруднення компонентів довкілля внаслідок діяльності підприємств промислової і сільськогосподарської діяльності.</li>
    </ul>
    <p>Результатом проведення екологічної експертизи є експертний висновок про відповідність запланованої чи здійснюваної діяльності підприємства нормам і вимогам діючого законодавства про охорону навколишнього природного середовища, раціональне використання і відтворення природних ресурсів, забезпечення екологічної безпеки.</p>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Коли призначають екологічну експертизу?",
        answer: "При будівництві, промисловій діяльності, забрудненні довкілля, конфліктах з екологічними службами або при поданні скарг на шкоду природі."
      },
      {
        id: 2,
        question: "Які документи або матеріали необхідні для експертизи?",
        answer: "Дозвільна документація, схеми підприємства, зразки повітря, ґрунту, води, результати лабораторних аналізів."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "tovaroznavcha-ekspertyza": {
    title: "ТОВАРОЗНАВЧА ЕКСПЕРТИЗА",
    description: "Товарознавча експертиза проводиться з метою дослідження якостей споживчих і промислових товарів, обладнання, меблів.",
    backgroundImage: expertiseImages["tovaroznavcha.jpg"],
    categories: ["Товари", "Оцінка"],
    content: `
    <p>Товарознавча експертиза проводиться з метою дослідження якостей споживчих і промислових товарів за претензіями громадян після їх придбання, а також в ситуаціях, коли між продавцем, постачальником або виробником товару виникає спір щодо якості продукції, її оригінальності, класифікаційної категорії, походження, інших її характеристик.</p>

    <p>Крім того, без незалежної товарознавчої експертизи не обійтися при оцінці розміру матеріальних збитків, завданих в результаті затоплення приміщень, пожежі (у випадках, коли пошкоджено меблі, електроніку, побутову техніку тощо).</p>

    <p><b>Товарознавча експертиза дає можливість визначити:</b></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>належність товарів/товарної продукції до певної класифікаційної категорії;</li>
      <li>якісні зміни товарної продукції та причини цих змін;</li>
      <li>спосіб виробництва;</li>
      <li>вартість товарної продукції (у т.ч. відсутньої);</li>
      <li>інші питання, що стосуються дослідження товарів різних видів.</li>
    </ul>

    <p>До числа об'єктів товарознавчої експертизи належать: будівельні, меблеві товари, техніка, фото-, радіо- та відеоапаратура тощо.</p>

    <p><b>Як правило, товарознавча експертиза проводиться:</b></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>за ухвалою суду;</li>
      <li>при здійсненні експортно-імпортних операцій (митна вартість);</li>
      <li>для визначення заставної вартості з метою кредитування;</li>
      <li>для страхування, відшкодування при страховому випадку;</li>
      <li>для цілей оподаткування, бухгалтерського обліку;</li>
      <li>при розділі майна між співвласниками;</li>
      <li>при визначенні розміру матеріального збитку, нанесеного майну при залитті, пожежі, інших страхових випадках;</li>
      <li>в інших випадках.</li>
    </ul>

    <p><b>В рамках проведення товарознавчої експертизи експерти НІСЕ:</b></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>визначать приналежність товарів до класифікаційних категорій, які прийняті у виробничо-торговельній сфері (вид, сорт, артикул, марка, модель, розмір, комплектність тощо);</li>
      <li>встановлять якісні зміни товарної продукції, а також причини, через які це сталося (чи мають вони виробничий характер або виникли при транспортуванні, зберіганні, в процесі експлуатації);</li>
      <li>з'ясують спосіб виробництва товарної продукції (промисловий чи кустарний);</li>
      <li>за заявою або в рамках судового процесу оцінять вартість товарної продукції, в т.ч. з урахуванням часткової втрати її товарних якостей через експлуатаційний знос або пошкодження від впливу зовнішніх факторів.</li>
    </ul>

    <h3 class="text-xl font-semibold mt-4 mb-2"><b>Об'єктами товарознавчої експертизи є:</h3></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>обладнання</li>
      <li>техніка та електроніка</li>
      <li>меблі</li>
      <li>взуття</li>
      <li>швейні та текстильно-трикотажні вироби та ін.</li>
    </ul>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Які питання вирішує товарознавча експертиза?",
        answer: "Якість, вартість, автентичність товару, наявність дефектів, відповідність стандартам, розмір збитків."
      },
      {
        id: 2,
        question: "Чи можна оцінити пошкоджені товари після пожежі або затоплення?",
        answer: "Так, експерти можуть оцінити залишкову вартість і причини пошкодження майна."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "kompiuterno-tekhnichna-ekspertyza": {
    title: "КОМП'ЮТЕРНО-ТЕХНІЧНА ЕКСПЕРТИЗА",
    description: "Комп'ютерно-технічна експертиза досліджує характеристики цифрового обладнання і програмного забезпечення.",
    backgroundImage: expertiseImages["komputerno-tehnichna.png"],
    categories: ["Комп'ютери", "Цифрова техніка"],
    content: `
    <h3 class="text-xl font-semibold mt-4 mb-2"><b>В рамках комп'ютерної експертизи експерти НІСЕ:</b></h3>
    <ul class="list-disc pl-6 space-y-2">
      <li>визначать технічний стан, характеристики, конструктивні особливості комп'ютерної техніки і мобільних засобів зв'язку;</li>
      <li>дослідять програмні продукти та технічну супровідну документацію на предмет відповідності технічному завданню з розробки;</li>
      <li>встановлять вартість програмного забезпечення;</li>
      <li>підтвердять або спростують заявлені розробником характеристики, алгоритми та властивості програмного забезпечення;</li>
      <li>виявлять причини блокування сайтів (віруси, мережеві атаки), а також несанкціоноване втручання в роботу сайту, сервера, комп'ютера, електронної пошти тощо;</li>
      <li>зафіксують факт публікації певних матеріалів в мережі Інтернет.</li>
    </ul>
    <h3 class="text-xl font-semibold mt-4 mb-2">Об'єктами комп'ютерно-технічної експертизи є:</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li>Системні блоки персональних комп'ютерів, ноутбуки, нетбуки, планшети;</li>
      <li>Периферійні пристрої (модеми, принтери, сканери, дисплеї, дисководи);</li>
      <li>Комп'ютерні комплектуючі;</li>
      <li>Сервери;</li>
      <li>Програмне забезпечення;</li>
      <li>Інформація з комп'ютерних баз даних;</li>
      <li>Веб-сайти</li>
    </ul>
    `,
    directions: [
      {
        title: "ЕКСПЕРТИЗА ПРОГРАМНОГО ЗАБЕЗПЕЧЕННЯ",
        slug: "ekspertyza-programnoho-zabezpechennia",
        description: "Експертиза програмного забезпечення на відповідність технічним завданням і контрактам.",
        fullContent: `
        <p>В рамках експертизи програмного забезпечення експерти НІСЕ:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li>дослідять програмне забезпечення з метою виявлення ознак контрафактності;</li>
          <li>дослідять програмне забезпечення на відповідність технічним завданням, договорами, контрактами на проектування та розробку програмного забезпечення;</li>
          <li>проведуть аналіз програмного забезпечення сайтів (експертиза сайтів) на відповідність договором, технічним завданням;</li>
          <li>дослідять програмні продукти 1С.</li>
        </ul>
        <p>Для проведення експертизи експерту надається носій з копією досліджуваного програмного продукту або програмного коду.</p>
        `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Що може виявити комп’ютерно-технічна експертиза?",
        answer: "Факти втручання у систему, злам, використання неліцензійного ПЗ, сліди видаленої інформації, IP-адреси доступу."
      },
      {
        id: 2,
        question: "Які об’єкти підлягають дослідженню?",
        answer: "Комп’ютери, ноутбуки, сервери, жорсткі диски, флешки, мобільні пристрої, веб-сайти, ПЗ."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "psykholohichna-ekspertyza": {
    title: "ПСИХОЛОГІЧНА ЕКСПЕРТИЗА",
    description: "Експерти НІСЕ проводять психологічну експертизу моральної шкоди та визначення її розміру.",
    backgroundImage: expertiseImages["psyhologichna.jpg"],
    categories: ["Психологія", "Моральна шкода"],
    content: `
    <p>Експерти Незалежного Інституту Судових Експертиз проводять психологічну експертизу моральної шкоди, під якою слід розуміти втрати немайнового характеру внаслідок моральних чи фізичних страждань або інших негативних явищ, заподіяних фізичній чи юридичній особі незаконними діями або бездіяльністю інших осіб.</p>

    <h3>В яких випадках настає обов'язок особи відшкодувати моральну шкоду?</h3>
    <p>Для цього необхідна наявність чотирьох юридичних ознак в їх сукупності для того, щоб в особи, яка заподіяла моральну шкоду, виник обов'язок її відшкодувати, а саме:</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>наявність моральної шкоди;</li>
      <li>протиправна поведінка особи, яка завдала моральну шкоду;</li>
      <li>причинний зв'язок між поведінкою особи і спричиненням шкоди;</li>
      <li>провина особи, яка заподіяла моральну шкоду.</li>
    </ul>

    <h3>Як визначити і розрахувати розмір компенсації за заподіяні моральні страждання?</h3>
    <p>Норми права не містять жодних конкретних рекомендацій з розрахунку розміру моральної шкоди в грошовому виразі. Не дивлячись на це, суддя зобов'язаний в рішенні про стягнення моральної шкоди вказувати мотиви, що обґрунтовують розмір стягненої суми моральної шкоди. В таких випадках для встановлення факту завдання моральної шкоди та визначення розміру грошової компенсації призначається психологічна експертиза.</p>

    <p><b>В рамках проведення психологічної експертизи фахівці НІСЕ:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>встановлюють факт завдання моральної шкоди та страждань;</li>
      <li>встановлюють обсяг негативних наслідків та глибину переживань, які виникли після певної події або ж дій третіх осіб;</li>
      <li>визначають розмір завданої моральної шкоди.</li>
    </ul>

    <p>У разі, якщо мова йде про психологічну експертизу фізичної особи, то дане експертне дослідження призначається та проводиться тільки по відношенню до психічно здорових осіб (підозрюваних, обвинувачених, свідків, потерпілих, позивачів, відповідачів).</p>

    <p>Якщо фізичній або юридичній особі була завдана шкода честі, гідності та діловій репутації внаслідок публікації чи поширення неправдивої, недостовірної або неточної інформації, що дискредитує фізичну чи юридичну особу, доцільним є проведення комплексного психолого-лінгвістичного дослідження, що включає семантико-текстуальну експертизу писемного мовлення.</p>
  `,
    directions: [
      {
        title: "Експертиза дитячо-батьківських відносин",
        slug: "ekspertyza-dytiacho-batkivskykh-vidnosyn",
        description: "Оцінка емоційної прив’язаності, умов проживання та здатності батьків виховувати дитину в інтересах суду.",
        fullContent: `
        <p>Дана експертиза проводиться у справах, пов’язаних із визначенням місця проживання дитини, встановленням порядку участі одного з батьків у її вихованні, позбавленням чи поновленням батьківських прав.</p>
        <p><b>У рамках проведення експертизи експерти оцінюють:</p></b>
        <ul class="list-disc pl-6 space-y-2">
          <li>рівень емоційної прив’язаності між дитиною та кожним з батьків;</li>
          <li>умови проживання та виховання дитини;</li>
          <li>здатність батьків забезпечувати гармонійний розвиток дитини;</li>
          <li>психологічний клімат у родині;</li>
          <li>вплив конфліктів між дорослими на емоційний стан дитини.</li>
        </ul>
        <p>Дослідження проводиться з урахуванням вікових особливостей дитини. Висновок експерта є доказом у суді.</p>
      `
      },
      {
        title: "Експертиза моральної шкоди",
        slug: "ekspertyza-moralnoi-shkody",
        description: "Психологічна оцінка моральної шкоди, причин її виникнення та обґрунтування компенсації.",
        fullContent: `
        <p>Експертиза моральної шкоди передбачає психологічну оцінку наслідків пережитих особою подій, які спричинили психоемоційні страждання або порушення психологічної рівноваги.</p>
        <p><b>Дана експертиза зазвичай призначається в справах, що стосуються:</p></b>
        <ul class="list-disc pl-6 space-y-2">
          <li>посягання на честь, гідність та ділову репутацію;</li>
          <li>дискримінації, булінгу чи мобінгу;</li>
          <li>протиправних дій посадових осіб;</li>
          <li>домашнього насильства або сексуальних домагань;</li>
          <li>ДТП, травм чи інших подій, що призвели до психологічної травми.</li>
        </ul>
        <p>У межах експертизи визначається наявність моральної шкоди, її інтенсивність, тривалість впливу, психологічні наслідки для особи, обґрунтування розміру грошової компенсації.</p>
      `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Для чого потрібна психологічна експертиза?",
        answer: "Для підтвердження моральної шкоди, емоційного стану особи, її здатності сприймати дійсність, чи стану афекту."
      },
      {
        id: 2,
        question: "Хто може ініціювати психологічну експертизу?",
        answer: "Суд, адвокат, слідчий або сам громадянин у межах цивільної справи про моральну шкоду."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "semantyko-tekstualna-ekspertyza": {
    title: "СЕМАНТИКО-ТЕКСТУАЛЬНА ЕКСПЕРТИЗА",
    description: "Семантико-текстуальна експертиза досліджує писемне мовлення з метою встановлення наявності чи відсутності у ньому висловлювань, які містять негативну інформацію, негативні емоційні оцінки тощо.",
    backgroundImage: expertiseImages["semantyko-tekstualna.jpg"],
    categories: ["Мова", "Лінгвістика"],
    content: `
    <p><b>В рамках проведення семантико-текстуальної (лінгвістичної) експертизи експерти НІСЕ:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>визначають, чи міститься в досліджуваній інформації негатив;</li>
      <li>аналізують заклики до дискримінації за ознаками статі, раси, мови, релігії тощо;</li>
      <li>досліджують негативні емоційні оцінки та приниження гідності;</li>
      <li>встановлюють використання спеціальних мовних прийомів з негативною конотацією.</li>
    </ul>
    <p>Семантико-текстуальна експертиза встановлює факт приниження честі, гідності та поширення негативної інформації у письмових, аудіо- та відеоматеріалах.</p>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "У яких випадках проводиться семантико-текстуальна експертиза?",
        answer: "При образах у ЗМІ, мережі Інтернет, для визначення наявності негативної конотації або приниження гідності у текстах."
      },
      {
        id: 2,
        question: "Які об’єкти підлягають дослідженню?",
        answer: "Писемні тексти, дописи у соцмережах, коментарі, аудіо- та відеозаписи, публічні виступи."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "pocherkoznavcha-ekspertyza": {
    title: "ПОЧЕРКОЗНАВЧА ЕКСПЕРТИЗА",
    description: "Почеркознавча експертиза — ідентифікація виконавця рукописного тексту або підпису.",
    backgroundImage: expertiseImages["pocherkoznavcha.jpg"],
    categories: ["Почерк"],
    content: `
    <p>Почеркознавча експертиза встановлює факт виконання підпису або рукопису конкретною особою, факт підробки, стан виконавця під час написання тощо.</p>
    <p><b>Об'єкти експертизи:</b></p>
    <ul class="list-disc pl-6 space-y-2">
      <li>рукописні тексти та їх фотокопії;</li>
      <li>підписи та короткі буквено-цифрові записи.</li>
    </ul>
    <p><b>Експертиза буває:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>ідентифікаційною (визначення виконавця);</li>
      <li>діагностичною (визначення умов створення рукопису);</li>
      <li>класифікаційною (визначення статі, віку виконавця).</li>
    </ul>
    <p>Встановлюються також факти наслідування почерку, підробки або виконання текстів в незвичних умовах.</p>
    <p><b>Питання, які вирішує почеркознавча експертиза:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>ким з числа зазначених осіб виконані рукописні тексти, літерні або цифрові записи в досліджуваному документі?</li>
      <li>ким виконаний підпис від імені певної особи, ним самим або іншою особою?</li>
      <li>однією чи різними особами виконані рукописні тексти (підписи) в різних документах, або окремі частини тексту в одному документі?</li>
      <li>одним або декількома особами виконані підписи від імені вигаданої особи в різних документах і якщо так, то чи виконані вони конкретною особою?</li>
      <li>ким, чоловіком або жінкою виконані рукописні записи?</li>
      <li>чи виконано рукописний текст (підпис) в незвичайних умовах або в якомусь незвичному стані?</li>
      <li>чи виконано досліджуваний рукопис навмисно зміненим почерком?</li>
      <li>чи дописані слова або цифри в досліджуваному тексті іншою особою?</li>
      <li>чи виконано текст або підпис з наслідуванням почерку або підпису конкретної особи від імені конкретної особи?</li>
    </ul>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Чи можна встановити виконавця підпису?",
        answer: "Так, експертиза дозволяє ідентифікувати особу за почерком або підписом, навіть у складних випадках."
      },
      {
        id: 2,
        question: "Що потрібно надати для проведення експертизи?",
        answer: "Зразки почерку (вільні та експериментальні), оригінали документів, копії з підписами, акти огляду."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "ekspertyza-intelektualnoi-vlasnosti": {
    title: "ЕКСПЕРТИЗА ОБ'ЄКТІВ ІНТЕЛЕКТУАЛЬНОЇ ВЛАСНОСТІ",
    description: "Дослідження властивостей, ознак, законності створення та використання об'єктів інтелектуальної власності, оцінка збитків.",
    backgroundImage: expertiseImages["intvlasnist.jpg"],
    categories: ["Інтелектуальна власність", "Авторство"],
    content: `
    <p><b>В рамках проведення експертизи інтелектуальної власності експерти НІСЕ:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>визначають наявність в об'єкті дослідження ознак об'єкта інтелектуальної власності;</li>
      <li>досліджують відповідність об'єкта критеріям, необхідним для надання правової охорони (новизна, промислова придатність тощо);</li>
      <li>встановлюють факт використання сукупності ознак об'єкта інтелектуальної власності;</li>
      <li>встановлюють факт відтворення об'єкта авторського права тощо;</li>
      <li>визначають вартість майнових прав на об'єкти інтелектуальної власності та здійснюють розрахунок збитків, завданих у результаті порушення прав на них тощо.</li>
    </ul>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Які об’єкти підлягають експертизі інтелектуальної власності?",
        answer: "Авторські тексти, ПЗ, бази даних, товарні знаки, винаходи, промислові зразки, секрети виробництва."
      },
      {
        id: 2,
        question: "Що встановлює така експертиза?",
        answer: "Факт порушення авторських прав, плагіату, обсягу використання, а також визначення збитків."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "mystetvoznavcha-ekspertyza": {
    title: "МИСТЕЦТВОЗНАВЧА ЕКСПЕРТИЗА",
    description: "Експертиза автентичності, авторства, стану збереження та ринкової вартості творів мистецтва.",
    backgroundImage: expertiseImages["mystectvo.jpg"],
    categories: ["Мистецтво", "Антикваріат"],
    content: `
    <p><b>В рамках проведення мистецтвознавчої експертизи експерти НІСЕ:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>встановлюють автентичність твору мистецтва та його автора (за можливості);</li>
      <li>визначають ступінь збереження твору мистецтва, наявність або відсутність реставраційних робіт;</li>
      <li>встановлюють дату (період) створення твору мистецтва;</li>
      <li>визначають ринкову вартість твору мистецтва;</li>
      <li>здійснюють каталогізацію творів мистецтва.</li>
    </ul>
    <p><b>Об'єктами мистецтвознавчої експертизи можуть бути:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>Живопис (картини, малюнки, ікони, графіка);</li>
      <li>Поштові марки і поштові листівки;</li>
      <li>Скульптура;</li>
      <li>Твори декоративно-прикладного мистецтва;</li>
      <li>Мистецтвознавча експертиза достовірності творів мистецтв;</li>
      <li>Антикваріат (меблі, музичні інструменти);</li>
      <li>Об'єкти нумізматики (старовинні монети);</li>
      <li>Книги, рукописи тощо.</li>
    </ul>
    <p>До проведення мистецтвознавчої експертизи залучаються професійні мистецтвознавці вузьких спеціальностей з різних юрисдикцій світу.</p>
    <p>Якщо Ви не можете визначити, який саме підвид мистецтвознавчої експертизи Вам потрібен, достатньо зателефонувати нам (або залишити заявку на зворотний дзвінок) і описати обставини справи.</p>
    
  `,
    directions: [
      {
        title: "АВТОРИЗАЦІЯ ТВОРІВ МИСТЕЦТВА",
        slug: "avtoryzatsiya-tvoriv-mystetstva",
        description: "Авторизація творів мистецтва та виготовлення паспортів автентичності.",
        fullContent: `
        <p>Авторизація засвідчує справжність твору мистецтва для участі у виставках, продажу, страхування.</p>
        <p>Результатом є паспорт твору мистецтва з фото, описом, авторством та датою створення.</p>
      `
      },
      {
        title: "ОЦІНКА ВАРТОСТІ ТВОРІВ МИСТЕЦТВА",
        slug: "otsinka-vartosti-tvoriv-mystetstva",
        description: "Оцінка ринкової вартості творів мистецтва.",
        fullContent: `
        <p>Комплексна оцінка включає експертизу автентичності, ринкову оцінку та атрибуцію твору мистецтва.</p>
      `
      }
    ],
    faqs: [
      {
        id: 1,
        question: "Чи можна підтвердити автентичність картини?",
        answer: "Так, проводиться аналіз техніки виконання, підпису, матеріалів і співставлення з архівними даними."
      },
      {
        id: 2,
        question: "Що таке паспорт твору мистецтва?",
        answer: "Це офіційний документ з описом об’єкта, авторства, дати створення, вартості і експертного висновку."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  },
  "naukovo-pravova-ekspertyza": {
    title: "НАУКОВО-ПРАВОВА ЕКСПЕРТИЗА",
    description: "Науково-правова експертиза — дослідження норм законодавства, судової практики, правочинів, договорів.",
    backgroundImage: expertiseImages["naukovo-pravova.jpg"],
    categories: ["Право", "Юриспруденція"],
    content: `
    <p>Юридична практика свідчить про зростаючу роль та важливість науково-правових експертиз при захисті прав та інтересів учасників правовідносин у суді.</p>
    <p>Це викликано тим, що науково-правова експертиза надає суду можливість більш ефективно та системно використовувати норми матеріального та процесуального права при вирішенні судових спорів.</p>
    <p><b>Науково-правова експертиза включає:</p></b>
    <ul class="list-disc pl-6 space-y-2">
      <li>дослідження норм законодавства України та зарубіжних країн, міжнародного права та практики їх застосування;</li>
      <li>судової практики, правочинів та інших юридичних фактів;</li>
      <li>дослідження документів про діяльність фізичних та юридичних осіб;</li>
      <li>експертизу договору.</li>
    </ul>
    <p>Поряд із зазначеним, в ході здійснення науково-правової експертизи, експертами НІСЕ досліджуються науково-теоретичні доктринальні джерела юридичної науки, що дозволяє зробити більш достовірні, обґрунтовані, комплексні висновки щодо предмету експертного дослідження</p>
  `,
    directions: [],
    faqs: [
      {
        id: 1,
        question: "Що аналізується в межах науково-правової експертизи?",
        answer: "Законодавчі норми, практика їх застосування, судові рішення, договори, правочини, юридичні факти."
      },
      {
        id: 2,
        question: "У яких справах вона застосовується?",
        answer: "У складних правових спорах, міжнародних справах, при тлумаченні норм або оцінці відповідності закону."
      },
      {
        id: 3,
        question: "Скільки часу займає проведення експертизи?",
        answer: "Термін проведення експертизи зазвичай складає від 10 робочих днів, залежно від складності та обсягу робіт."
      }
    ]
  }
};
const ExpertiseCarousel = () => {
  const expertises = Object.entries(expertiseData).map(([slug, data]) => ({
    id: slug,
    title: data.title,
    description: data.description,
    image: data.backgroundImage,
    slug,
    keyDirections: data.directions || []
  }));
  const totalCount = expertises.length;
  const [api, setApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const autoplayRef = useRef(
    Autoplay({ delay: 6e3, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    setSnapCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", () => {
      setSnapCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    });
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return /* @__PURE__ */ jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold mb-4", children: "ЕКСПЕРТИЗА В НІСЕ" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xl text-gray-600", children: [
          "Працюємо за ",
          totalCount,
          " напрямками судової експертизи"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "self-start md:self-auto", children: /* @__PURE__ */ jsxs(Link, { to: "/ekspertyzy", children: [
        "Усі експертизи ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: { align: "start", loop: true },
        plugins: [autoplayRef.current],
        setApi,
        className: "w-full",
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-4", children: expertises.map((expertise) => /* @__PURE__ */ jsx(CarouselItem, { className: "pl-4 md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/ekspertyzy/${expertise.slug}`,
              className: "block group h-[380px] relative rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: expertise.image,
                    alt: `${expertise.title} - професійна судова експертиза в НІСЕ`,
                    loading: "lazy",
                    width: 400,
                    height: 380,
                    className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" }),
                expertise.keyDirections.length > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full", children: [
                  expertise.keyDirections.length,
                  " напрямків"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 p-5 text-white", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 leading-tight", children: expertise.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-white/80 line-clamp-2 mb-3", children: expertise.description }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
                    "Детальніше ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-1" })
                  ] })
                ] })
              ]
            }
          ) }, expertise.id)) }),
          snapCount > 1 && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center gap-2 mt-8", children: Array.from({ length: snapCount }).map((_, i) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": `Слайд ${i + 1}`,
              onClick: () => api == null ? void 0 : api.scrollTo(i),
              className: cn(
                "h-2 rounded-full transition-all duration-300",
                i === selectedIndex ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400 w-2"
              )
            },
            i
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center mt-6 gap-4", children: [
            /* @__PURE__ */ jsxs(
              CarouselPrevious,
              {
                className: "relative inset-auto h-10 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center translate-y-0 left-0 top-0",
                children: [
                  /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 text-gray-700 mr-1" }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-700 text-sm font-medium", children: "Попередня" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 tabular-nums min-w-[60px] text-center", children: [
              selectedIndex + 1,
              " / ",
              totalCount
            ] }),
            /* @__PURE__ */ jsxs(
              CarouselNext,
              {
                className: "relative inset-auto h-10 px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-md shadow-sm flex items-center justify-center translate-y-0 right-0 top-0",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-gray-700 text-sm font-medium", children: "Наступна" }),
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-gray-700 ml-1" })
                ]
              }
            )
          ] })
        ]
      }
    ) })
  ] }) });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const videoRecordings = [
  {
    id: 1,
    title: "Вебінар на тему: «Особливості проведення товарознавчої експертизи щодо визначення вартості товарів»",
    youtubeId: "HtC3b0nJQfc",
    duration: "1:04:46",
    date: "17.06.2025",
    isoDate: "2025-06-17"
  },
  {
    id: 2,
    title: "Відкритий ефір у форматі питання–відповідь з Геннадієм Геннадійовичем Пампухою",
    youtubeId: "eqzygdHoV14",
    duration: "1:06:11",
    date: "12.06.2025",
    isoDate: "2025-06-12"
  },
  {
    id: 3,
    title: "Вебінар: Психологічна експертиза у спорах між батьками щодо виховання та місця проживання дитини",
    youtubeId: "wb8XchP9Iz8",
    duration: "1:17:54",
    date: "20.05.2025",
    isoDate: "2025-05-20"
  }
];
const getThumbnailUrl = (youtubeId) => `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
const getVideoUrl = (youtubeId) => `https://www.youtube.com/live/${youtubeId}`;
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@%D0%9D%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%B8%D0%B9%D0%86%D0%BD%D1%81%D1%82%D0%B8%D1%82%D1%83%D1%82%D0%A1%D1%83%D0%B4%D0%BE%D0%B2%D0%B8%D1%85%D0%95%D0%BA%D1%81%D0%BF%D0%B5/streams";
const VideoRecordings = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
        /* @__PURE__ */ jsx(Youtube, { className: "h-6 w-6 text-red-600 mr-2" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider", children: "Відеогалерея" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900", children: "Записи вебінарів" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl", children: "Ми ділимося цінними знаннями з нашої експертної практики. Переглядайте записи вебінарів та лекцій НІСЕ, щоб поглибити розуміння ключових аспектів судово-експертної галузі України." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: videoRecordings.map((video) => /* @__PURE__ */ jsx(Card, { className: "group overflow-hidden hover:shadow-lg transition-shadow duration-300", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: getVideoUrl(video.youtubeId),
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Дивитись відео: ${video.title}`,
        className: "block",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-video overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: getThumbnailUrl(video.youtubeId),
                alt: video.title,
                width: 480,
                height: 360,
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors", "aria-hidden": "true", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-16 bg-red-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { className: "h-8 w-8 text-white", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded", children: video.duration })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: video.title }),
            /* @__PURE__ */ jsx("time", { dateTime: video.isoDate, className: "text-gray-500 text-sm", children: video.date })
          ] })
        ]
      }
    ) }, video.id)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: YOUTUBE_CHANNEL_URL,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center text-gray-900 font-medium hover:underline",
        children: [
          "Переглянути більше на нашому YouTube каналі",
          /* @__PURE__ */ jsx("svg", { className: "ml-2 h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z", clipRule: "evenodd" }) })
        ]
      }
    ) })
  ] }) });
};
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  constructor(context, canUseDOM) {
    __publicField(this, "instances", []);
    __publicField(this, "canUseDOM", isDocument);
    __publicField(this, "context");
    __publicField(this, "value", {
      setHelmet: (serverState) => {
        this.context.helmet = serverState;
      },
      helmetInstances: {
        get: () => this.canUseDOM ? instances : this.instances,
        add: (instance) => {
          (this.canUseDOM ? instances : this.instances).push(instance);
        },
        remove: (instance) => {
          const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
          (this.canUseDOM ? instances : this.instances).splice(index, 1);
        }
      }
    });
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = (_a = class extends Component$1 {
  constructor(props) {
    super(props);
    __publicField(this, "helmetData");
    this.helmetData = new HelmetData(this.props.context || {}, _a.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
}, __publicField(_a, "canUseDOM", isDocument), _a);
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => {
    var _a2;
    return (_a2 = tag.parentNode) == null ? void 0 : _a2.removeChild(tag);
  });
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component$1 {
  constructor() {
    super(...arguments);
    __publicField(this, "rendered", false);
  }
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = (_b = class extends Component$1 {
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
}, __publicField(_b, "defaultProps", {
  defer: true,
  encodeSpecialCharacters: true,
  prioritizeSeoTags: false
}), _b);
const FAQPageSEO = ({ faqs: faqs2 }) => {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs2.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  return /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(faqStructuredData) }
    }
  ) });
};
const faqs = [
  {
    question: "Як розпочати співпрацю з вашим інститутом?",
    answer: "Для початку співпраці з Незалежним Інститутом Судових Експертиз, вам необхідно зв'язатися з нашими фахівцями за телефоном або через форму на сайті. Після цього ми проконсультуємо вас щодо необхідних документів та подальших кроків."
  },
  {
    question: "Які документи потрібні для проведення експертизи?",
    answer: "Перелік необхідних документів залежить від типу експертизи. Загалом, потрібно надати документи, що підтверджують право власності, технічну документацію, а також додаткові матеріали відповідно до конкретної справи. Детальний перелік ви отримаєте під час консультації з нашими фахівцями."
  },
  {
    question: "Скільки коштують ваші послуги?",
    answer: "Вартість послуг залежить від типу експертизи, складності випадку та обсягу необхідних досліджень. Ми пропонуємо конкурентні ціни на ринку та індивідуальний підхід до кожного клієнта. Для отримання точної інформації про вартість, звертайтеся до нас на консультацію."
  },
  {
    question: "Які терміни проведення експертизи?",
    answer: "Терміни проведення експертизи залежать від її типу, складності, кількості питань на дослідження, обсягу документів тощо. В середньому, експертиза в НІСЕ проводиться від 10 днів. Точні терміни ми погоджуємо з клієнтом індивідуально під час оформлення заявки з після ознайомлення з матеріалами та фабулою справи."
  },
  {
    question: "Чи маєте ви відповідні ліцензії та сертифікати?",
    answer: "Так, Незалежний Інститут Судових Експертиз має всі необхідні ліцензії та сертифікати для проведення експертиз різних типів. Наші експерти є сертифікованими спеціалістами з багаторічним досвідом роботи в галузі."
  },
  {
    question: "Чи проводите ви експертизи за ухвалою суду?",
    answer: "Так, ми проводимо експертизи на підставі ухвали суду з усіх видів експертиз, що входять до нашої компетенції. Наші висновки відповідають всім вимогам законодавства та приймаються судами як належні докази."
  },
  {
    question: "Чи експерти НІСЕ атестовані Мін'юстом?",
    answer: "Експерти Незалежного інституту судових експертиз атестовані Міністерством юстиції України та внесені до Реєстру атестованих судових експертів. \n\nВони проводять експертизи відповідно до:\n- Закону України «Про судову експертизу»;\n- Інструкції № 53/5 «Про призначення та проведення судових експертиз та експертних досліджень»;\n- Інструкції № 3505/5 «Про затвердження Інструкції про особливості здійснення судово‑експертної діяльності атестованими судовими експертами, що не працюють у державних спеціалізованих експертних установах»;\n- статей 242–244 Кримінального процесуального кодексу України."
  }
];
const FaqSection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "py-16 md:py-24", children: [
    /* @__PURE__ */ jsx(FAQPageSEO, { faqs: faqs.map((f) => ({ question: f.question, answer: f.answer })) }),
    /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-4", children: [
          /* @__PURE__ */ jsx(HelpCircle, { className: "h-6 w-6 text-gray-700 mr-2" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500 uppercase tracking-wider", children: "Відповіді на запитання" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900", children: "Часті запитання" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 max-w-3xl mx-auto", children: "Знайдіть відповіді на найпоширеніші запитання про наші послуги та процес проведення експертиз." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${index}`, children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-lg font-medium text-left text-gray-900 py-5", children: faq.question }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "text-gray-600 pb-5", children: faq.answer })
      ] }, index)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: "Не знайшли відповіді на своє запитання?" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/kontakty",
            className: "px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors inline-flex items-center",
            children: "Зв'яжіться з нами"
          }
        )
      ] })
    ] })
  ] });
};
const SEOHead = ({
  title = "НІСЕ - Незалежний Інститут Судових Експертиз",
  description = "Експертиза є не лише належним доказом у судовому провадженні, але і засобом мирного врегулювання спірних питань!",
  keywords = "судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, експертний висновок, Київ",
  image = "https://expertise.com.ua/logonise.png",
  imageAlt = "НІСЕ логотип",
  imageWidth,
  imageHeight,
  url = "https://expertise.com.ua",
  type = "website",
  structuredData,
  robots,
  ogLocale = "uk_UA",
  twitterSite = "@nise_ua"
}) => {
  const fullTitle = title.includes("НІСЕ") ? title : `${title} | НІСЕ`;
  const absoluteImage = (image == null ? void 0 : image.startsWith("http")) ? image : `https://expertise.com.ua${image}`;
  const ldArray = structuredData ? Array.isArray(structuredData) ? structuredData : [structuredData] : null;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords }),
    /* @__PURE__ */ jsx("meta", { name: "author", content: "НІСЕ" }),
    /* @__PURE__ */ jsx("meta", { name: "generator", content: "Lovable" }),
    /* @__PURE__ */ jsx("meta", { name: "robots", content: robots || "index, follow" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: absoluteImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:alt", content: imageAlt }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: (imageWidth == null ? void 0 : imageWidth.toString()) || "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: (imageHeight == null ? void 0 : imageHeight.toString()) || "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:type", content: "image/png" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:secure_url", content: absoluteImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: url }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: "НІСЕ" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: ogLocale }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: absoluteImage }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image:alt", content: imageAlt }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: twitterSite }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: url }),
    ldArray && /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: JSON.stringify(ldArray) }
      }
    )
  ] });
};
const useStructuredData = () => {
  const getOrganizationData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    url: "https://expertise.com.ua",
    logo: "https://expertise.com.ua/logonise.png",
    description: "Незалежний інститут судових експертиз, що надає професійні експертні послуги у різних галузях з 2008 року. Атестовані експерти Мін'юсту України.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
      addressLocality: "Київ",
      addressCountry: "UA",
      postalCode: "04207"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: ["+380445813090", "+380503601682", "+380675555222"],
      email: "info@nise.com.ua",
      contactType: "customer service"
    },
    sameAs: [
      "https://www.facebook.com/nise.com.ua",
      "https://www.linkedin.com/company/nise-com-ua"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      bestRating: 5,
      ratingCount: 127
    }
  });
  const getServiceData = (serviceName, serviceDescription) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://expertise.com.ua"
    },
    areaServed: "Україна",
    serviceType: "Судова експертиза",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "UAH"
    }
  });
  const getProfessionalServiceData = (serviceName, serviceDescription, serviceUrl, directions) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    image: "https://expertise.com.ua/logonise.png",
    provider: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
        addressLocality: "Київ",
        addressRegion: "Київська область",
        postalCode: "04207",
        addressCountry: "UA"
      },
      telephone: ["+380445813090", "+380503601682", "+380675555222"],
      email: "info@nise.com.ua"
    },
    serviceType: "Судова експертиза",
    areaServed: {
      "@type": "Country",
      name: "Україна"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl,
      serviceName
    },
    category: "Експертні послуги",
    audience: {
      "@type": "Audience",
      audienceType: "Юридичні особи та приватні клієнти"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5
    },
    offers: {
      "@type": "Offer",
      url: serviceUrl,
      priceCurrency: "UAH",
      price: 2e3,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "UAH",
        minPrice: 2e3
      },
      availability: "https://schema.org/InStock"
    },
    hasOfferCatalog: directions && directions.length > 0 ? {
      "@type": "OfferCatalog",
      name: `Напрямки ${serviceName.toLowerCase()}`,
      itemListElement: directions.map((direction) => ({
        "@type": "Offer",
        name: direction.title,
        description: direction.description
      }))
    } : void 0
  });
  const getFAQData = (faqs2) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs2.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  });
  const getLocalBusinessData = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    description: "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України.",
    url: "https://expertise.com.ua",
    logo: "https://expertise.com.ua/logonise.png",
    telephone: ["+380445813090", "+380503601682", "+380675555222"],
    email: "info@nise.com.ua",
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
      addressLocality: "Київ",
      addressRegion: "Київська область",
      postalCode: "04207",
      addressCountry: "UA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.4501,
      longitude: 30.5234
    },
    openingHours: [
      "Mo-Fr 09:00-18:00"
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.8,
      reviewCount: 127
    }
  });
  const toISODate = (date) => {
    if (!date) return date;
    const m = date.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    const d = new Date(date);
    return isNaN(d.getTime()) ? date : d.toISOString().split("T")[0];
  };
  const getArticleData = (title, description, datePublished, url, imageUrl, content) => ({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: toISODate(datePublished),
    dateModified: toISODate(datePublished),
    author: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://expertise.com.ua"
    },
    publisher: {
      "@type": "Organization",
      name: "НІСЕ",
      logo: {
        "@type": "ImageObject",
        url: "https://expertise.com.ua/logonise.png"
      }
    },
    image: imageUrl,
    url,
    articleSection: "Новини",
    wordCount: content ? content.replace(/<[^>]*>/g, "").split(/\s+/).length : void 0,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  });
  const getBreadcrumbData = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  });
  const getWebPageData = (name, description, url, breadcrumbItems) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Organization",
      name: "НІСЕ"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  });
  const getProductData = (serviceName, serviceDescription, category = "Судові експертизи", priceRange) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: serviceName,
    description: serviceDescription,
    brand: {
      "@type": "Brand",
      name: "НІСЕ",
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png"
    },
    category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "UAH",
      priceRange,
      seller: {
        "@type": "Organization",
        name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
        url: "https://expertise.com.ua"
      }
    },
    provider: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua",
      telephone: ["+380445813090", "+380503601682", "+380675555222"],
      email: "info@nise.com.ua"
    },
    serviceType: "Судова експертиза",
    areaServed: "Україна"
  });
  const getContactPointData = () => ({
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: ["+380445813090", "+380503601682", "+380675555222"],
    email: "info@nise.com.ua",
    availableLanguage: ["Ukrainian", "Russian"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    areaServed: "Україна",
    parentOrganization: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua"
    }
  });
  const getEventData = (eventName, eventDescription, startDate, endDate, isOnline = false, price, eventUrl) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    description: eventDescription,
    startDate,
    endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isOnline ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: isOnline ? {
      "@type": "VirtualLocation",
      url: eventUrl || "https://expertise.com.ua"
    } : {
      "@type": "Place",
      name: "Офіс НІСЕ",
      address: {
        "@type": "PostalAddress",
        streetAddress: "вул. Левка Лук'яненка, 21, корпус 3, офіс 7",
        addressLocality: "Київ",
        addressCountry: "UA",
        postalCode: "04207"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
      url: "https://expertise.com.ua",
      email: "info@nise.com.ua"
    },
    offers: price ? {
      "@type": "Offer",
      price,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      url: eventUrl
    } : void 0,
    audience: {
      "@type": "Audience",
      audienceType: "Юристи, експерти, представники бізнесу"
    }
  });
  const getWebSiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Незалежний Інститут Судових Експертиз (НІСЕ)",
    alternateName: "НІСЕ",
    url: "https://expertise.com.ua",
    description: "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України.",
    publisher: {
      "@type": "Organization",
      name: "НІСЕ",
      url: "https://expertise.com.ua",
      logo: "https://expertise.com.ua/logonise.png"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://expertise.com.ua/ekspertyzy?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    sameAs: [
      "https://www.facebook.com/nise.com.ua",
      "https://www.linkedin.com/company/nise-com-ua"
    ]
  });
  const getItemListData = (listName, items) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    description: `Перелік ${listName.toLowerCase()}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: item.url,
      image: item.image
    }))
  });
  const getSiteNavigationData = () => {
    const baseUrl = "https://expertise.com.ua";
    return {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      name: "Головна навігація",
      url: baseUrl,
      hasPart: [
        {
          "@type": "SiteNavigationElement",
          name: "Головна",
          url: baseUrl
        },
        {
          "@type": "SiteNavigationElement",
          name: "Експертизи",
          url: `${baseUrl}/ekspertyzy`
        },
        {
          "@type": "SiteNavigationElement",
          name: "Про нас",
          url: `${baseUrl}/pro-nas`
        },
        {
          "@type": "SiteNavigationElement",
          name: "Контакти",
          url: `${baseUrl}/kontakty`
        },
        {
          "@type": "SiteNavigationElement",
          name: "Ціни",
          url: `${baseUrl}/tsiny`
        }
      ]
    };
  };
  return {
    getOrganizationData,
    getServiceData,
    getProfessionalServiceData,
    getFAQData,
    getLocalBusinessData,
    getArticleData,
    getBreadcrumbData,
    getWebPageData,
    getProductData,
    getContactPointData,
    getEventData,
    getWebSiteData,
    getItemListData,
    getSiteNavigationData
  };
};
const PreloadResources = ({
  fonts = [],
  styles = [],
  scripts = [],
  images = []
}) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    fonts.map((font, index) => /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preload",
        href: font,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      },
      `font-${index}`
    )),
    styles.map((style, index) => /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preload",
        href: style,
        as: "style"
      },
      `style-${index}`
    )),
    scripts.map((script, index) => /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preload",
        href: script,
        as: "script"
      },
      `script-${index}`
    )),
    images.map((image, index) => /* @__PURE__ */ jsx(
      "link",
      {
        rel: "preload",
        href: image,
        as: "image"
      },
      `image-${index}`
    )),
    /* @__PURE__ */ jsx("link", { rel: "dns-prefetch", href: "//fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "dns-prefetch", href: "//fonts.gstatic.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" })
  ] });
};
const Index = () => {
  const { getOrganizationData, getLocalBusinessData, getWebPageData, getWebSiteData, getSiteNavigationData } = useStructuredData();
  const combinedStructuredData = [
    getWebSiteData(),
    getOrganizationData(),
    getLocalBusinessData(),
    getSiteNavigationData(),
    getWebPageData(
      "Незалежний Інститут Судових Експертиз (НІСЕ)",
      "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України. Будівельно-технічні, оціночні, земельні та інші види експертиз.",
      "https://expertise.com.ua",
      [{ name: "Головна", url: "https://expertise.com.ua" }]
    )
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-white", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Незалежний Інститут Судових Експертиз — НІСЕ",
        description: "Професійні судові експертизи всіх видів. Атестовані експерти Мін'юсту України. Будівельно-технічні, оціночні, земельні та інші види експертиз.",
        keywords: "судова експертиза, незалежна експертиза, будівельно-технічна експертиза, оціночна експертиза, НІСЕ, експертний висновок, Київ",
        url: "https://expertise.com.ua",
        structuredData: combinedStructuredData
      }
    ),
    /* @__PURE__ */ jsx(
      PreloadResources,
      {
        images: ["/logonise.png"],
        fonts: []
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(ExpertiseCarousel, {}),
      /* @__PURE__ */ jsx(ServicesSection, {}),
      /* @__PURE__ */ jsx(VideoRecordings, {}),
      /* @__PURE__ */ jsx(FaqSection, {}),
      /* @__PURE__ */ jsx(PartnersSection, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ConsultationButton = ({
  className = "",
  variant = "primary",
  size = "md"
}) => {
  const baseClasses = "font-medium rounded-md transition-colors duration-300 text-center inline-block";
  const variantClasses = {
    primary: "bg-brand-blue hover:bg-brand-light text-white",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
    text: "text-brand-blue hover:text-brand-light underline"
  };
  const sizeClasses = {
    sm: "py-1.5 px-4 text-sm",
    md: "py-2.5 px-6",
    lg: "py-3 px-8 text-lg"
  };
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return /* @__PURE__ */ jsx(Link, { to: "/kontakty", className: buttonClasses, children: "Отримати консультацію" });
};
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "lazy"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const handleLoad = () => {
    setIsLoaded(true);
  };
  const handleError = () => {
    setHasError(true);
  };
  if (hasError) {
    return /* @__PURE__ */ jsx("div", { className: `bg-gray-200 flex items-center justify-center ${className}`, children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: "Зображення недоступне" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${className}`, children: [
    !isLoaded && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" }) }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt,
        width,
        height,
        loading,
        onLoad: handleLoad,
        onError: handleError,
        className: `transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`,
        style: {
          maxWidth: "100%",
          height: "auto",
          ...width && height ? { aspectRatio: `${width}/${height}` } : {}
        }
      }
    )
  ] });
};
const Breadcrumb = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const Breadcrumbs = ({ items, className = "" }) => {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: `bg-gray-50 border-b border-gray-200 py-4 ${className}`, children: /* @__PURE__ */ jsx("div", { className: "container-custom", children: /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { className: "flex items-center space-x-2 text-sm text-gray-600", children: [
    /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center hover:text-brand-blue transition-colors", children: [
      /* @__PURE__ */ jsx(Home, { className: "h-4 w-4 mr-1" }),
      "Головна"
    ] }) }) }),
    items.map((item, idx) => [
      /* @__PURE__ */ jsx(BreadcrumbSeparator, { children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-gray-400" }) }, `sep-${idx}`),
      /* @__PURE__ */ jsx(BreadcrumbItem, { children: item.href && !item.isCurrentPage ? /* @__PURE__ */ jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsx(
        Link,
        {
          to: item.href,
          className: "hover:text-brand-blue transition-colors",
          children: item.label
        }
      ) }) : /* @__PURE__ */ jsx(BreadcrumbPage, { className: "text-gray-900 font-medium", children: item.label }) }, `item-${idx}`)
    ])
  ] }) }) }) });
};
const ExpertisesListPage = () => {
  const { getWebPageData, getItemListData, getSiteNavigationData, getFAQData, getBreadcrumbData } = useStructuredData();
  const expertiseList = Object.entries(expertiseData).map(([slug, data]) => ({
    slug,
    ...data,
    // Ensure categories always exists with a default value if not present
    categories: data.categories || ["Загальні"]
  }));
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const categories = Array.from(
    new Set(expertiseList.flatMap((expertise) => expertise.categories))
  );
  const filteredExpertises = expertiseList.filter((expertise) => {
    const matchesSearch = expertise.title.toLowerCase().includes(searchTerm.toLowerCase()) || expertise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? expertise.categories.includes(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });
  const siteNavigationData = getSiteNavigationData();
  const faqData = getFAQData([
    {
      question: "Скільки коштує судова експертиза?",
      answer: "Вартість експертизи залежить від виду, складності та обсягу робіт. Ознайомтеся з актуальними цінами на сторінці цін або зв'яжіться з нами для індивідуального розрахунку."
    },
    {
      question: "Як довго проводиться експертиза?",
      answer: "Терміни проведення експертизи залежать від її виду та складності. Зазвичай це від 5 до 30 робочих днів. Точні терміни уточнюйте при замовленні."
    },
    {
      question: "Чи приймаються експертні висновки НІСЕ в суді?",
      answer: "Так, наші експертні висновки мають повну юридичну силу та приймаються українськими судами. Всі наші експерти атестовані Міністерством юстиції України."
    },
    {
      question: "Чи можна замовити експертизу без рішення суду?",
      answer: "Так, ми проводимо незалежні експертні дослідження як за призначенням суду, так і на замовлення приватних осіб і організацій."
    }
  ]);
  const webPageData = getWebPageData(
    "Судові експертизи | НІСЕ",
    "Повний перелік судових експертиз від Незалежного Інституту Судових Експертиз. Будівельно-технічна, оціночна, земельна та інші види експертиз.",
    "https://expertise.com.ua/ekspertyzy",
    [
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Експертизи", url: "https://expertise.com.ua/ekspertyzy" }
    ]
  );
  const breadcrumbData = getBreadcrumbData([
    { name: "Головна", url: "https://expertise.com.ua" },
    { name: "Експертизи", url: "https://expertise.com.ua/ekspertyzy" }
  ]);
  const itemListData = getItemListData(
    "Судові експертизи НІСЕ",
    expertiseList.map((expertise) => ({
      name: expertise.title,
      description: expertise.description,
      url: `https://expertise.com.ua/ekspertyzy/${expertise.slug}`,
      image: expertise.backgroundImage ? `https://expertise.com.ua${expertise.backgroundImage}` : void 0
    }))
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Судові експертизи | НІСЕ",
        description: "Повний перелік судових експертиз від Незалежного Інституту Судових Експертиз. Будівельно-технічна, оціночна, земельна та інші види експертиз.",
        keywords: "судові експертизи, будівельно-технічна експертиза, оціночна експертиза, земельна експертиза, НІСЕ, список експертиз",
        url: "https://expertise.com.ua/ekspertyzy",
        structuredData: [webPageData, itemListData, siteNavigationData, faqData, breadcrumbData]
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("div", { className: "pt-32 pb-8", children: /* @__PURE__ */ jsx("div", { className: "container-custom", children: /* @__PURE__ */ jsx(
      Breadcrumbs,
      {
        items: [
          { label: "Експертизи", href: "/ekspertyzy", isCurrentPage: true }
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-16", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6", children: "Судові експертизи в Україні - Повний каталог послуг НІСЕ" }),
        /* @__PURE__ */ jsxs("div", { className: "prose prose-lg max-w-none text-gray-700", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl leading-relaxed mb-4", children: "Незалежний Інститут Судових Експертиз (НІСЕ) пропонує повний спектр експертних послуг для судових та позасудових цілей. Наші кваліфіковані експерти проводять дослідження у різних галузях знань з дотриманням усіх процесуальних вимог." }),
          /* @__PURE__ */ jsx("p", { className: "mb-4", children: "Ми виконуємо експертизи за призначенням суду, на замовлення сторін процесу та приватних осіб. Всі наші експертні висновки мають юридичну силу та визнаються українськими та міжнародними судами." }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 mt-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-3 text-gray-900", children: "Чому обирають НІСЕ:" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-600", children: [
              /* @__PURE__ */ jsx("li", { children: "✓ Понад 10 років досвіду у сфері судових експертиз" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Атестовані експерти з вищою освітою та спеціалізацією" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Сучасне обладнання та методики досліджень" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Швидкі терміни виконання без компромісів у якості" }),
              /* @__PURE__ */ jsx("li", { children: "✓ Детальні та обґрунтовані експертні висновки" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-4", children: "Каталог експертиз" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700", children: "Оберіть потрібну експертизу з переліку нижче або скористайтеся пошуком і фільтрами для швидкого знаходження." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Пошук експертизи...",
              "aria-label": "Пошук експертизи",
              className: "pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brand-blue",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(Collapsible, { className: "w-full md:w-auto", children: [
            /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50", children: [
              /* @__PURE__ */ jsx(Filter, { size: 18 }),
              /* @__PURE__ */ jsx("span", { children: "Фільтр" })
            ] }),
            /* @__PURE__ */ jsx(CollapsibleContent, { className: "absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: "Категорії" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `cursor-pointer p-2 rounded-md ${selectedCategory === null ? "bg-brand-blue text-white" : "hover:bg-gray-100"}`,
                    onClick: () => setSelectedCategory(null),
                    children: "Всі категорії"
                  }
                ),
                categories.map((category, index) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `cursor-pointer p-2 rounded-md ${selectedCategory === category ? "bg-brand-blue text-white" : "hover:bg-gray-100"}`,
                    onClick: () => setSelectedCategory(category),
                    children: category
                  },
                  index
                ))
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex border border-gray-300 rounded-md overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Відображати сіткою",
                "aria-pressed": viewMode === "grid",
                className: `p-2 ${viewMode === "grid" ? "bg-brand-blue text-white" : "bg-white text-gray-600"}`,
                onClick: () => setViewMode("grid"),
                children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }),
                  /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }),
                  /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" }),
                  /* @__PURE__ */ jsx("rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Відображати списком",
                "aria-pressed": viewMode === "list",
                className: `p-2 ${viewMode === "list" ? "bg-brand-blue text-white" : "bg-white text-gray-600"}`,
                onClick: () => setViewMode("list"),
                children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("line", { x1: "8", x2: "21", y1: "6", y2: "6" }),
                  /* @__PURE__ */ jsx("line", { x1: "8", x2: "21", y1: "12", y2: "12" }),
                  /* @__PURE__ */ jsx("line", { x1: "8", x2: "21", y1: "18", y2: "18" }),
                  /* @__PURE__ */ jsx("line", { x1: "3", x2: "3.01", y1: "6", y2: "6" }),
                  /* @__PURE__ */ jsx("line", { x1: "3", x2: "3.01", y1: "12", y2: "12" }),
                  /* @__PURE__ */ jsx("line", { x1: "3", x2: "3.01", y1: "18", y2: "18" })
                ] })
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-gray-600", children: [
          "Знайдено результатів: ",
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: filteredExpertises.length }),
          selectedCategory && /* @__PURE__ */ jsxs("span", { className: "ml-2", children: [
            'у категорії "',
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: selectedCategory }),
            '"'
          ] })
        ] }),
        selectedCategory && /* @__PURE__ */ jsx(
          "button",
          {
            className: "text-brand-blue hover:underline flex items-center gap-1",
            onClick: () => setSelectedCategory(null),
            children: "Очистити фільтр"
          }
        )
      ] }),
      viewMode === "grid" && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredExpertises.map((expertise, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full",
          children: [
            /* @__PURE__ */ jsx(Link, { to: `/ekspertyzy/${expertise.slug}`, className: "h-40 bg-blue-50 flex items-center justify-center p-0 overflow-hidden block", children: expertise.backgroundImage ? /* @__PURE__ */ jsx(
              OptimizedImage,
              {
                src: expertise.backgroundImage,
                alt: `${expertise.title} експертиза`,
                className: "w-full h-full object-cover",
                loading: "lazy",
                width: 400,
                height: 160
              }
            ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-r from-blue-100 to-blue-50" }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col h-full", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4 text-center", children: /* @__PURE__ */ jsx(Link, { to: `/ekspertyzy/${expertise.slug}`, className: "hover:text-brand-blue transition-colors", children: expertise.title.toUpperCase() }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600 line-clamp-4", children: expertise.description }),
              expertise.directions && expertise.directions.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-1 text-sm", children: expertise.directions.slice(0, 5).map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/ekspertyzy/${d.slug}`,
                  className: "text-gray-700 hover:text-brand-blue hover:underline line-clamp-1",
                  children: [
                    "› ",
                    d.title
                  ]
                }
              ) }, d.slug)) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-2 flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs(Link, { to: `/ekspertyzy/${expertise.slug}`, className: "text-brand-blue font-medium flex items-center gap-1 hover:underline", children: [
                  "Детальніше ",
                  /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
                ] }),
                expertise.categories.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600", children: expertise.categories[0] })
              ] })
            ] })
          ]
        },
        expertise.slug
      )) }),
      viewMode === "list" && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: filteredExpertises.map((expertise) => /* @__PURE__ */ jsxs(AccordionItem, { value: expertise.slug, className: "bg-white rounded-lg shadow-sm", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-4 hover:no-underline", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-left", children: [
          expertise.backgroundImage ? /* @__PURE__ */ jsx(
            OptimizedImage,
            {
              src: expertise.backgroundImage,
              alt: `${expertise.title} експертиза`,
              className: "w-10 h-10 object-cover rounded-md flex-shrink-0",
              loading: "lazy",
              width: 40,
              height: 40
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-md flex-shrink-0" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900", children: expertise.title }),
            expertise.categories.length > 0 && /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600", children: expertise.categories[0] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(AccordionContent, { className: "px-4 pb-4 pt-0", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: expertise.description }),
          expertise.directions && expertise.directions.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mb-4 space-y-1 text-sm", children: expertise.directions.map((d) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/ekspertyzy/${d.slug}`,
              className: "text-gray-700 hover:text-brand-blue hover:underline",
              children: [
                "› ",
                d.title
              ]
            }
          ) }, d.slug)) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center", children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/ekspertyzy/${expertise.slug}`,
              className: "text-brand-blue hover:underline flex items-center gap-1",
              children: [
                "Детальніше ",
                /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
              ]
            }
          ) })
        ] })
      ] }, expertise.slug)) }) }),
      filteredExpertises.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 flex justify-center mb-4", children: /* @__PURE__ */ jsx(Search, { size: 64 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-gray-900 mb-2", children: "Експертизи не знайдено" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Спробуйте змінити параметри пошуку або зв'яжіться з нами для консультації." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-16 bg-gray-50 rounded-xl p-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-8 text-center", children: "Часті питання про експертизи" }),
        /* @__PURE__ */ jsx(FAQPageSEO, { faqs: [
          {
            question: "Скільки коштує судова експертиза?",
            answer: "Вартість експертизи залежить від виду, складності та обсягу робіт. Ознайомтеся з актуальними цінами на сторінці цін або зв'яжіться з нами для індивідуального розрахунку."
          },
          {
            question: "Як довго проводиться експертиза?",
            answer: "Терміни проведення експертизи залежать від її виду та складності. Зазвичай це від 5 до 30 робочих днів. Точні терміни уточнюйте при замовленні."
          },
          {
            question: "Чи приймаються експертні висновки НІСЕ в суді?",
            answer: "Так, наші експертні висновки мають повну юридичну силу та приймаються українськими судами. Всі наші експерти атестовані Міністерством юстиції України."
          },
          {
            question: "Чи можна замовити експертизу без рішення суду?",
            answer: "Так, ми проводимо незалежні експертні дослідження як за призначенням суду, так і на замовлення приватних осіб і організацій."
          }
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2 text-gray-900", children: "Скільки коштує судова експертиза?" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
              "Вартість експертизи залежить від виду, складності та обсягу робіт. Ознайомтеся з актуальними цінами на ",
              /* @__PURE__ */ jsx("a", { href: "/tsiny", className: "text-blue-600 hover:underline", children: "сторінці цін" }),
              " або зв'яжіться з нами для індивідуального розрахунку."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2 text-gray-900", children: "Як довго проводиться експертиза?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Терміни проведення експертизи залежать від її виду та складності. Зазвичай це від 5 до 30 робочих днів. Точні терміни уточнюйте при замовленні." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2 text-gray-900", children: "Чи приймаються експертні висновки НІСЕ в суді?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Так, наші експертні висновки мають повну юридичну силу та приймаються українськими судами. Всі наші експерти атестовані Міністерством юстиції України." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 shadow-sm", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2 text-gray-900", children: "Чи можна замовити експертизу без рішення суду?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Так, ми проводимо незалежні експертні дослідження як за призначенням суду, так і на замовлення приватних осіб і організацій." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 bg-gray-50 rounded-lg p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Не знаєте, яка експертиза вам потрібна?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-6 max-w-2xl mx-auto", children: "Наші фахівці допоможуть обрати найбільш ефективне рішення для вашої ситуації. Зв'яжіться з нами для безкоштовної консультації." }),
        /* @__PURE__ */ jsx(ConsultationButton, { size: "lg" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ExpertiseHeader = ({
  title,
  description,
  backgroundImage = "/placeholder.svg"
}) => {
  const imagePath = backgroundImage.startsWith("http") || backgroundImage.startsWith("/") ? backgroundImage : `/${backgroundImage}`;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-gray-900",
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imagePath,
            alt: `Ілюстрація: ${title} — професійна послуга НІСЕ`,
            className: "absolute inset-0 w-full h-full object-cover",
            loading: "eager",
            fetchPriority: "high",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/70", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("div", { className: "container-custom relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-200 text-lg mb-8", children: description }),
          /* @__PURE__ */ jsx("div", { className: "bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-5 border border-white border-opacity-20 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-white mb-2", children: "Потрібна консультація?" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center text-white", children: [
                /* @__PURE__ */ jsx("a", { href: "tel:+380675555222", className: "mr-4 hover:underline", children: "+38 (067) 5555 222" }),
                /* @__PURE__ */ jsx("a", { href: "mailto:info@nise.com.ua", className: "hover:underline", children: "info@nise.com.ua" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ConsultationButton, { variant: "primary", size: "lg" }) })
          ] }) })
        ] }) })
      ]
    }
  );
};
const KeyDirections = ({ directions, currentSlug }) => {
  if (!directions || directions.length === 0 || directions.length === 1 && directions[0].slug === currentSlug) {
    return null;
  }
  const filteredDirections = currentSlug ? directions.filter((direction) => direction.slug !== currentSlug) : directions;
  if (filteredDirections.length === 0) {
    return null;
  }
  const categoryColors = [
    "from-blue-100 to-blue-50",
    "from-green-100 to-green-50",
    "from-amber-100 to-amber-50",
    "from-purple-100 to-purple-50",
    "from-rose-100 to-rose-50",
    "from-cyan-100 to-cyan-50"
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "КЛЮЧОВІ НАПРЯМКИ РОБОТИ:" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredDirections.map((direction, index) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/ekspertyzy/${direction.slug}`,
        className: "bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all flex flex-col h-full group",
        children: [
          /* @__PURE__ */ jsx("div", { className: `h-24 bg-gradient-to-r ${categoryColors[index % categoryColors.length]} flex items-center justify-center p-5`, children: /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-700", children: direction.title.toUpperCase() }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-grow", children: [
            direction.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-4 flex-grow leading-relaxed", children: direction.description }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-brand-blue mt-auto pt-2 opacity-80 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Детальніше" }),
              /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "ml-2" })
            ] })
          ] })
        ]
      },
      index
    )) })
  ] }) });
};
const FAQ = ({ faqs: faqs2 = [] }) => {
  if (!faqs2 || faqs2.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx("section", { className: "py-10 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "НАЙЧАСТІШЕ ЗАДАВАНІ ПИТАННЯ" }),
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "w-full", children: faqs2.map((faq) => /* @__PURE__ */ jsxs(AccordionItem, { value: `item-${faq.id}`, className: "border border-gray-200 rounded-lg overflow-hidden bg-white mb-4", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-4 py-3 font-medium text-gray-900", children: faq.question }),
      /* @__PURE__ */ jsx(AccordionContent, { className: "px-4 pb-4 text-gray-700", children: faq.answer })
    ] }, faq.id)) })
  ] }) });
};
const reasons = [
  {
    id: 1,
    title: "Професійність",
    description: "Наші експерти атестовані Міністерством юстиції України, мають відповідну кваліфікацію та багаторічний досвід роботи у сфері судово-експертної діяльності."
  },
  {
    id: 2,
    title: "Надійність",
    description: "Успішно працюємо з 2007 року та за цей час провели понад 10 тисяч експертиз та експертних досліджень за різноманітними напрямками."
  },
  {
    id: 3,
    title: "Офіційний статус",
    description: "Експертні висновки НІСЕ приймаються судом як належний доказ."
  },
  {
    id: 4,
    title: "Широкий спектр досліджень",
    description: "Проводимо понад 20 видів експертиз, у тому числі - масштабні комплексні  експертизи підвищеної складності із залученням експертів з європейських юрисдикцій."
  },
  {
    id: 5,
    title: "Оперативність",
    description: "Ми цінуємо ваш час і виконуємо роботу в максимально можливі стислі терміни."
  }
];
const WhyUs = () => {
  return /* @__PURE__ */ jsx("section", { className: "py-10", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "ЧОМУ ВАРТО ОБРАТИ НАС" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: reasons.map((reason) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-medium text-brand-blue mb-3", children: reason.title }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: reason.description })
    ] }, reason.id)) })
  ] }) });
};
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function Component() {
  var _a2;
  const { slug } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const { getProfessionalServiceData, getBreadcrumbData, getFAQData } = useStructuredData();
  useEffect(() => {
    if (location.search.includes("from=directions")) {
      setActiveTab("overview");
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", location.pathname);
      }
    }
  }, [location]);
  let expertise = null;
  let selectedDirection = null;
  let parentExpertiseSlug = null;
  if (slug && expertiseData[slug]) {
    expertise = expertiseData[slug];
  } else {
    for (const key in expertiseData) {
      const exp = expertiseData[key];
      const found = exp.directions.find((d) => d.slug === slug);
      if (found) {
        expertise = exp;
        selectedDirection = found;
        parentExpertiseSlug = key;
        break;
      }
    }
  }
  if (!expertise) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/ekspertyzy", replace: true });
  }
  const backgroundImage = selectedDirection && selectedDirection.backgroundImage || expertise.backgroundImage;
  const stages = [
    { title: "Подання заяви", description: "Клієнт звертається із заявою про проведення експертизи, надаючи всю необхідну інформацію та документи." },
    { title: "Аналіз матеріалів", description: "Експерти ретельно вивчають отримані матеріали, визначають обсяг робіт та обирають відповідну методологію дослідження." },
    { title: "Проведення експертних досліджень", description: "Виконується комплекс необхідних досліджень, вимірювань і аналізів відповідно до чинних стандартів та методик." },
    { title: "Підготовка експертного висновку", description: "На основі результатів досліджень формується обґрунтований, детальний експертний висновок, який містить висновки та обґрунтування." }
  ];
  const pageTitle = selectedDirection ? selectedDirection.title : expertise.title;
  const pageDescription = selectedDirection ? selectedDirection.description : expertise.description;
  const truncate = (s, n = 158) => {
    const clean = s.replace(/\s+/g, " ").trim();
    return clean.length <= n ? clean : clean.slice(0, n - 1).replace(/\s+\S*$/, "") + "…";
  };
  const seoTitle = selectedDirection ? `${selectedDirection.title} | НІСЕ` : `${expertise.title} | НІСЕ`;
  const seoDescription = truncate(
    selectedDirection ? `${selectedDirection.description} Послуга в межах напряму «${expertise.title}» від НІСЕ — атестовані експерти Мін'юсту України, Київ.` : `${pageDescription} Професійна ${expertise.title.toLowerCase()} від НІСЕ — атестовані експерти Мін'юсту, висновок для суду.`
  );
  const seoKeywords = selectedDirection ? `${selectedDirection.title.toLowerCase()}, ${expertise.title.toLowerCase()}, судова експертиза, НІСЕ, експертний висновок, Київ` : `${expertise.title.toLowerCase()}, ${(expertise.categories || []).join(", ").toLowerCase()}, судова експертиза, НІСЕ, експертний висновок, Київ`;
  const relatedExpertises = Object.entries(expertiseData).filter(([key]) => key !== (parentExpertiseSlug || slug)).slice(0, 4).map(([key, exp]) => ({ slug: key, title: exp.title, description: exp.description }));
  const breadcrumbItems = selectedDirection && parentExpertiseSlug ? [
    { label: "Експертизи", href: "/ekspertyzy" },
    { label: expertise.title, href: `/ekspertyzy/${parentExpertiseSlug}` },
    { label: selectedDirection.title, isCurrentPage: true }
  ] : [
    { label: "Експертизи", href: "/ekspertyzy" },
    { label: pageTitle, isCurrentPage: true }
  ];
  const structuredData = [
    getProfessionalServiceData(
      pageTitle,
      pageDescription,
      `https://expertise.com.ua/ekspertyzy/${slug}`,
      expertise.directions
    ),
    getBreadcrumbData([
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Експертизи", url: "https://expertise.com.ua/ekspertyzy" },
      ...selectedDirection && parentExpertiseSlug ? [
        { name: expertise.title, url: `https://expertise.com.ua/ekspertyzy/${parentExpertiseSlug}` },
        { name: selectedDirection.title, url: `https://expertise.com.ua/ekspertyzy/${slug}` }
      ] : [
        { name: pageTitle, url: `https://expertise.com.ua/ekspertyzy/${slug}` }
      ]
    ]),
    ...expertise.faqs && expertise.faqs.length > 0 ? [getFAQData(expertise.faqs)] : []
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        url: `https://expertise.com.ua/ekspertyzy/${slug}`,
        image: backgroundImage ? `https://expertise.com.ua${backgroundImage}` : void 0,
        imageAlt: `${pageTitle} — НІСЕ`,
        structuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsx(
        ExpertiseHeader,
        {
          title: pageTitle,
          description: pageDescription,
          backgroundImage
        }
      ),
      /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbItems }),
      /* @__PURE__ */ jsxs("div", { className: "container-custom py-10", children: [
        /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "w-full", onValueChange: setActiveTab, value: activeTab, children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "w-full grid grid-cols-2 md:grid-cols-4 mb-8", children: [
            /* @__PURE__ */ jsxs(TabsTrigger, { value: "overview", className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(FileText, { size: 18 }),
              " Огляд"
            ] }),
            /* @__PURE__ */ jsxs(TabsTrigger, { value: "process", className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(CheckCircle, { size: 18 }),
              " Етапи"
            ] }),
            /* @__PURE__ */ jsxs(TabsTrigger, { value: "directions", className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(MessageSquare, { size: 18 }),
              " Напрямки"
            ] }),
            /* @__PURE__ */ jsxs(TabsTrigger, { value: "faq", className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(Clock, { size: 18 }),
              " FAQ"
            ] })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "overview", className: "animate-fade-in", children: /* @__PURE__ */ jsx("div", { className: "prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-6", dangerouslySetInnerHTML: { __html: selectedDirection ? selectedDirection.fullContent : expertise.content } }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "process", className: "animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-6", children: "Етапи проведення експертизи" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-0 bottom-0 w-1 bg-gray-200 hidden md:block" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-10", children: stages.map((stage, idx) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-start gap-4 md:gap-8 relative", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg z-10", children: idx + 1 }),
                /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100 flex-grow", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: stage.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: stage.description })
                ] })
              ] }, idx)) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "directions", className: "animate-fade-in", children: expertise.directions.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-6", children: "Напрямки експертизи" }),
            /* @__PURE__ */ jsx(KeyDirections, { directions: expertise.directions, currentSlug: slug }),
            selectedDirection && expertise.directions.filter((d) => d.slug !== slug).length === 0 && /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Немає інших напрямків для цієї експертизи." })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-sm p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-gray-900 mb-4", children: "Напрямки експертизи" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Для даної експертизи немає додаткових напрямків." })
          ] }) }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "faq", className: "animate-fade-in", children: [
            /* @__PURE__ */ jsx(FAQ, { faqs: expertise.faqs || [] }),
            ((_a2 = expertise.faqs) == null ? void 0 : _a2.length) === 0 && /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-sm p-6 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "На даний момент немає часто задаваних питань для цієї експертизи. Ви можете задати своє питання через форму консультації." }) })
          ] })
        ] }),
        activeTab === "overview" && !selectedDirection && expertise.directions.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsx(KeyDirections, { directions: expertise.directions }) })
      ] }),
      /* @__PURE__ */ jsx(WhyUs, {}),
      /* @__PURE__ */ jsx("section", { className: "py-12 bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-6", children: "Інші види експертиз" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: relatedExpertises.map((rel) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/ekspertyzy/${rel.slug}`,
            className: "block p-5 bg-white rounded-lg border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900 mb-2 line-clamp-2", children: rel.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 line-clamp-3", children: rel.description })
            ]
          },
          rel.slug
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-brand-blue text-white text-center", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold mb-6", children: "Потрібна консультація експерта?" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl mb-8 max-w-2xl mx-auto", children: "Наші спеціалісти допоможуть вам обрати оптимальне рішення для вашої ситуації" }),
        /* @__PURE__ */ jsx(ConsultationButton, { className: "bg-white !text-black hover:bg-gray-100" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function getStaticPaths() {
  const top = Object.keys(expertiseData).map((slug) => `ekspertyzy/${slug}`);
  const nested = Object.values(expertiseData).flatMap((exp) => exp.directions.map((d) => `ekspertyzy/${d.slug}`));
  return [...top, ...nested];
}
const pricingData = [
  {
    id: 1,
    title: "Земельно-технічна експертиза",
    services: [
      "Встановлення факту накладання меж сусідніх земельних ділянок",
      "Поділ земельної ділянки у рівних частках",
      "Виділ частки в натурі (поділ майна подружжя, спір між спадкоємцями та ін.)"
    ],
    price: "від 45 000 грн."
  },
  {
    id: 2,
    title: "Будівельно-технічна експертиза",
    services: [
      "Оцінка збитку, нанесеного внаслідок залиття квартири",
      "Оцінка вартості нерухомості в рамках судових справ щодо розірвання шлюбу, поділу нерухомості в спадкових спорах",
      "Встановлення факту відповідності державним будівельним нормам (ДБН)",
      "Визначення якості та оцінка вартості ремонтних будівельних робіт"
    ],
    price: "від 45 000 грн."
  },
  {
    id: 3,
    title: "Електротехнічна експертиза",
    services: [
      "Дослідження приладів обліку електроенергії",
      "Встановлення факту втручання в роботу лічильника електроенергії та переопломбування",
      "Виявлення механізму виникнення пошкоджень на корпусі представленого приладу обліку",
      "Визначення причин зміни режиму роботи електроустановки чи її елементів",
      "Визначення причин нештатного (аварійного) режиму роботи елементів електрообладнання"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 4,
    title: "Екологічна експертиза",
    services: [
      "Встановлення обсягу збитку, нанесеного навколишньому середовищу в результаті здійснення промислової діяльності",
      "Визначення рівня забруднення води, ґрунту та повітря за комплексом показників",
      "Встановлення факту приналежності земель сільськогосподарського призначення до радіаційно небезпечних земель"
    ],
    price: "від 65 000 грн."
  },
  {
    id: 5,
    title: "Економічна експертиза",
    services: [
      "Дослідження документів бухгалтерського обліку та звітності",
      "Дослідження документів фінансово-кредитних операцій в кредитних спорах",
      "Перевірка правильності розрахунків заробітної плати та пенсії",
      "Перевірка правильності розрахунків по кредиту",
      "Перевірка правильності нарахування штрафів за результатами податкової перевірки",
      "Перевірка правильності визначення розміру збитків, нанесених державі"
    ],
    price: "від 50 000 грн."
  },
  {
    id: 6,
    title: "Мистецтвознавча експертиза",
    services: [
      "Встановлення автентичності досліджуваного предмета мистецтва та конкретного автора твору",
      "Дослідження ступеню збереження предмета мистецтва, наявності або відсутності реставраційних робіт",
      "Встановлення факту приналежності твору мистецтва чи предмету колекціонування до певного періоду часу",
      "Визначення, до якого виду мистецтва відноситься предмет мистецтва, наданий на дослідження",
      "Встановлення, чи має досліджуваний предмет мистецтва культурну, історичну, наукову, художню, археологічну або іншу цінність",
      "Визначення ринкової вартість творів мистецтва"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 7,
    title: "Експертиза об'єктів інтелектуальної власності",
    services: [
      "Встановлення ознак об'єкта інтелектуальної власності",
      "Дослідження відповідності об'єкта критеріям, необхідним для надання правової охорони (новизна, промислова придатність)",
      "Встановлення факту використання сукупності ознак об'єкта інтелектуальної власності та факту відтворення об'єкта авторського права",
      "Визначення вартості майнових прав на об'єкти інтелектуальної власності та розрахунок збитків, завданих у результаті порушення прав на них"
    ],
    price: "від 45 000 грн."
  },
  {
    id: 8,
    title: "Товарознавча експертиза",
    services: [
      "Визначення якості товару",
      "Оцінка вартості товару в рамках судової справи",
      "Оцінка збитку в результаті залиття квартири та зіпсування майна"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 9,
    title: "Експертиза промислового обладнання",
    services: [
      "Визначення відповідності поставленого і змонтованого обладнання специфікації та/або договору поставки",
      "Встановлення відповідності обладнання заявленим технічним характеристикам",
      "Визначення характеру зносу обладнання",
      "Визначення причин виходу з ладу обладнання, появи дефектів окремих вузлів і агрегатів"
    ],
    price: "від 35 000 грн."
  },
  {
    id: 10,
    title: "Автотоварознавча експертиза",
    services: [
      "Оцінка збитку, нанесеного в результаті ДТП",
      "Оцінка вартості автомобіля та інших транспортних засобів при поділі майна подружжя, спадкуванні та інших спорах в рамках цивільних справ"
    ],
    price: "від 20 000 грн."
  },
  {
    id: 11,
    title: "Автотехнічна експертиза",
    services: [
      "Дослідження механізму, обставин ДТП та її елементів",
      "Встановлення несправностей транспортного засобу, які загрожували безпеці руху, причин їх утворення та часу виникнення до ДТП чи внаслідок неї або після неї",
      "Визначення механізму впливу несправності транспортного засобу на виникнення та розвиток ДТП",
      "Встановлення відповідності дій водія транспортного засобу в дорожній ситуації технічним вимогам Правил дорожнього руху",
      "Дослідження технічного стану транспортних засобів та їх окремих агрегатів, вузлів і деталей"
    ],
    price: "від 20 000 грн."
  },
  {
    id: 12,
    title: "Трасологічна експертиза",
    services: [
      "Вивчення слідів на проїжджій частині та на транспортному засобі з метою з'ясування обставин ДТП",
      "Експертиза слідів виробничих механізмів",
      "Експертиза слідів втручання в закрутки і пломби"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 13,
    title: "Комплексна Електро-технічна, Пожежно-технічна експертиза",
    services: [
      "Встановлення осередку пожежі (місця виникнення початкового займання)",
      "Встановлення причини, умов і процесів виникнення пожежі",
      "Встановлення часу і шляхів поширення горіння",
      "Визначення пожежонебезпечних властивостей речовин і матеріалів"
    ],
    price: "від 55 000 грн."
  },
  {
    id: 14,
    title: "Почеркознавча експертиза",
    services: [
      "Встановлення факту фальсифікації підпису",
      "Встановлення факту наслідування підпису, зміни почерку",
      "Встановлення конкретного виконавця рукописного тексту, підпису",
      "Порівняння зразків підпису"
    ],
    price: "від 25 000 грн."
  },
  {
    id: 15,
    title: "Семантико-текстуальна експертиза",
    services: [
      "Встановлення наявності в досліджуваних текстах публічних закликів та негативних емоційних оцінок і негативних установок, характеристик, що принижують гідність людини або групи осіб",
      "Визначення факту наявності стверджень в досліджуваних текстах",
      "Проведення комплексної психолого-лінгвістичної експертизи у справах про завдання моральної шкоди та у справах про захист честі і гідності"
    ],
    price: "від 25 000 грн."
  },
  {
    id: 16,
    title: "Авторознавча експертиза",
    services: [
      "Встановлення, чи є особа автором тексту конкретного машинописного або рукописного документу",
      "Встановлення, чи є особа автором декількох документів або якого-небудь фрагмента тексту документа",
      "Встановлення, чи є певна мова рідною для автора конкретного документа",
      "Який освітній рівень, стать, вік автора тексту конкретного документа"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 17,
    title: "Комп'ютерно-технічна експертиза",
    services: [
      "Виявлення властивостей, якостей і особливостей використання технічних комп'ютерних систем",
      "Встановлення особливостей розробки і використання програмних продуктів (при встановленні фактів використання програмного забезпечення з порушенням авторських прав його розробника)",
      "Встановлення факту відповідності розробленого програмного забезпечення вимогам технічного завдання, а також іншим нормативним і технічним документам",
      "Отримання доступу до інформації на носіях, встановлення факту її видалення чи зміни",
      "Встановлення факту монтажу відео- чи аудіо-запису",
      "Дослідження роботи онлайн-сервісів",
      "Фіксація інформації/публікацій в мережі Інтернет"
    ],
    price: "від 30 000 грн."
  },
  {
    id: 18,
    title: "Психологічна експертиза",
    services: [
      "Встановлення факту завдання моральної шкоди та страждань",
      "Визначення розміру завданої моральної шкоди",
      "Інші питання"
    ],
    price: "від 25 000 грн."
  },
  {
    id: 19,
    title: "Науково-правова експертиза",
    services: [
      "Тлумачення норм законів",
      "Встановлення законності застосування норм українського або міжнародного законодавства"
    ],
    price: "від 50 000 грн."
  }
];
const PricingPage = () => {
  const { getBreadcrumbData, getWebPageData, getSiteNavigationData } = useStructuredData();
  const webPageData = getWebPageData(
    "Ціни на експертизи | НІСЕ",
    "Вартість судових експертиз від Незалежного Інституту Судових Експертиз. Прозоре ціноутворення, якісні експертні послуги за доступними цінами.",
    "https://expertise.com.ua/tsiny",
    [
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Ціни", url: "https://expertise.com.ua/tsiny" }
    ]
  );
  const pricingBreadcrumb = getBreadcrumbData([
    { name: "Головна", url: "https://expertise.com.ua" },
    { name: "Ціни", url: "https://expertise.com.ua/tsiny" }
  ]);
  const combinedStructuredData = [webPageData, getSiteNavigationData(), pricingBreadcrumb];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Ціни на експертизи | НІСЕ",
        description: "Вартість судових експертиз від Незалежного Інституту Судових Експертиз. Земельно-технічна від 45 000 грн, будівельно-технічна від 45 000 грн, екологічна від 65 000 грн.",
        keywords: "ціни експертиза, вартість судової експертизи, НІСЕ ціни, експертні послуги ціни",
        url: "https://expertise.com.ua/tsiny",
        structuredData: combinedStructuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-32 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center mb-12", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6", children: "Наші ціни" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700 mb-8 leading-relaxed", children: "Вартість експертизи залежить від складності об'єкта, обсягу робіт та термінів виконання. Розгорніть відповідний розділ для детальної інформації." }),
        /* @__PURE__ */ jsx("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-800", children: /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed", children: "Для отримання точної вартості вашої експертизи, будь ласка, зв'яжіться з нами для консультації." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center", children: "Перелік експертиз та орієнтовні ціни" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-4", children: pricingData.map((expertise) => /* @__PURE__ */ jsxs(
          AccordionItem,
          {
            value: `item-${expertise.id}`,
            className: "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300",
            children: [
              /* @__PURE__ */ jsx(AccordionTrigger, { className: "px-6 py-4 hover:no-underline", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full text-left", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 pr-4", children: expertise.title }),
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-brand-blue shrink-0", children: expertise.price })
              ] }) }),
              /* @__PURE__ */ jsx(AccordionContent, { className: "px-6 pb-6", children: /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide", children: "Послуги включають:" }),
                /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: expertise.services.map((service, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-brand-blue mr-3 mt-1 text-sm", children: "•" }),
                  /* @__PURE__ */ jsx("span", { className: "text-gray-700 leading-relaxed text-sm", children: service })
                ] }, index)) })
              ] }) })
            ]
          },
          expertise.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-50 rounded-lg p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Важлива інформація" }),
        /* @__PURE__ */ jsxs("div", { className: "text-gray-700 space-y-6 leading-relaxed", children: [
          /* @__PURE__ */ jsx("p", { className: "text-base", children: "Кожна експертиза унікальна. Обсяг робіт залежить від питань на дослідження, наявності та повноти документів, технічних завдань." }),
          /* @__PURE__ */ jsx("p", { className: "text-base", children: "Тому вартість експертизи завжди розраховується індивідуально після ознайомлення експертів з фабулою справи та документами." }),
          /* @__PURE__ */ jsx("p", { className: "text-base", children: "Для отримання точної вартості вашої експертизи, будь ласка, надайте нам необхідну інформацію та документи." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(ConsultationButton, { size: "lg" }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Map$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "w-full h-96 rounded-lg shadow-md overflow-hidden", children: /* @__PURE__ */ jsx(
    "iframe",
    {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.0732708086186!2d30.51425880000001!3d50.4519218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cd0dc3eecc05%3A0xdce2a0cd34f38c18!2z0LLRg9C7LiDQm9C10LLQutCwINCb0YPQuifRj9C90LXQvdC60LAsIDIxLCDQmtC40ZfQsiwgMDQyMDc!5e0!3m2!1suk!2sua!4v1716119417372!5m2!1suk!2sua",
      width: "100%",
      height: "100%",
      style: { border: 0 },
      allowFullScreen: true,
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade",
      title: "НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ Location"
    }
  ) });
};
const SUPABASE_URL = "https://cdqolplrdwwxdbnlgize.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcW9scGxyZHd3eGRibmxnaXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMDgxNzUsImV4cCI6MjA2MTc4NDE3NX0.NKfhlpfZgrWw5O53DqSvvpr43xgTJyryt4pqCk_bwKg";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const contactFormSchema = z.object({
  name: z.string().trim().min(2, { message: "Ім'я повинно містити мінімум 2 символи" }).max(100, { message: "Ім'я занадто довге" }).regex(/^[A-Za-zА-ЯЁа-яёҐЄІЇґєії'\s-]+$/u, {
    message: "Ім'я може містити лише літери, пробіли та дефіси"
  }),
  email: z.string().trim().email({ message: "Невірний формат email" }).max(255, { message: "Email занадто довгий" }),
  phone: z.string().trim().regex(/^(\+?38)?0\d{9}$/, {
    message: "Невірний формат телефону. Використовуйте формат: +380XXXXXXXXX або 0XXXXXXXXX"
  }),
  subject: z.string().trim().min(3, { message: "Тема повинна містити мінімум 3 символи" }).max(200, { message: "Тема занадто довга" }),
  message: z.string().trim().min(10, { message: "Повідомлення повинно містити мінімум 10 символів" }).max(2e3, { message: "Повідомлення занадто довге" }),
  website: z.string().max(0, { message: "Invalid submission" }),
  // Honeypot field
  companyName: z.string().optional()
});
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
});
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error == null ? void 0 : error.message) : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-sm font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const ContactPage = () => {
  const { toast: toast2 } = useToast();
  const { getOrganizationData, getLocalBusinessData, getBreadcrumbData, getContactPointData, getSiteNavigationData } = useStructuredData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadTime = useRef(Date.now());
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+38",
      subject: "",
      message: "",
      website: "",
      // Honeypot field
      companyName: "NISE"
    }
  });
  const combinedStructuredData = [
    getOrganizationData(),
    getLocalBusinessData(),
    getContactPointData(),
    getSiteNavigationData(),
    getBreadcrumbData([
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Контакти", url: "https://expertise.com.ua/kontakty" }
    ])
  ];
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const submitTime = Date.now() - formLoadTime.current;
      const submissionData = {
        ...data,
        _submitTime: submitTime
      };
      const { error } = await supabase.functions.invoke("contact-form", {
        body: submissionData
      });
      if (error) {
        throw new Error(error.message);
      }
      toast2({
        title: "Повідомлення надіслано",
        description: "Дякуємо за звернення! Ми зв'яжемося з вами найближчим часом.",
        variant: "default",
        duration: 5e3
      });
      form.reset();
      formLoadTime.current = Date.now();
    } catch (error) {
      console.error("Error sending message:", error);
      toast2({
        title: "Помилка",
        description: "Не вдалося надіслати повідомлення. Будь ласка, спробуйте пізніше.",
        variant: "destructive",
        duration: 5e3
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const breadcrumbItems = [
    { label: "Контакти", isCurrentPage: true }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Контакти | НІСЕ",
        description: "Зв'яжіться з Незалежним Інститутом Судових Експертиз для консультації або замовлення експертизи. Телефони, адреса, електронна пошта.",
        keywords: "контакти НІСЕ, телефон експертиза, адреса НІСЕ, консультація експерта, замовити експертизу",
        url: "https://expertise.com.ua/kontakty",
        structuredData: combinedStructuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow pt-32 pb-16", children: [
      /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbItems }),
      /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-12", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Контакти" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700", children: "Зв'яжіться з нами для консультації або замовлення експертизи" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Наші контакти" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-brand-blue mr-4 mt-1" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 mb-1", children: "Телефон" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: /* @__PURE__ */ jsx("a", { href: "tel:+380445813090", className: "hover:underline", children: "(044) 581 30 90" }) }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: /* @__PURE__ */ jsx("a", { href: "tel:+380503601682", className: "hover:underline", children: "(050) 360 16 82" }) }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: /* @__PURE__ */ jsx("a", { href: "tel:+380675555222", className: "hover:underline", children: "(067) 5555 222" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "h-6 w-6 text-brand-blue mr-4 mt-1" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 mb-1", children: "Email" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: /* @__PURE__ */ jsx("a", { href: "mailto:info@nise.com.ua", className: "hover:underline", children: "info@nise.com.ua" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-6 w-6 text-brand-blue mr-4 mt-1" }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 mb-1", children: "Адреса" }),
                    /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: "04207, Україна, м. Київ, вул. Левка Лук'яненка, 21, корпус 3, офіс 7" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Наше розташування" }),
              /* @__PURE__ */ jsx(Map$1, {})
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Форма зворотного зв'язку" }),
            /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: "-9999px" }, children: /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "website",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Website" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, tabIndex: -1, autoComplete: "off" }) })
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "name",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Ім'я *" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Повне ім'я", ...field }) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "email",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Email *" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "Email адреса", ...field }) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "phone",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Телефон *" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "tel", placeholder: "0XXXXXXXXX", ...field }) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "subject",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Тема *" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Як ми можемо допомогти?", ...field }) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "message",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Повідомлення *" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        placeholder: "Ваше повідомлення...",
                        rows: 5,
                        ...field
                      }
                    ) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting,
                  className: "w-full bg-brand-blue hover:bg-brand-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 disabled:opacity-50",
                  children: isSubmitting ? "Надсилання..." : "Надіслати"
                }
              )
            ] }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const stats = [
  { value: "18+", label: "років досвіду", icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }) },
  { value: "7000+", label: "проведених експертиз", icon: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) },
  { value: "20+", label: "видів експертиз", icon: /* @__PURE__ */ jsx(Award, { className: "h-5 w-5" }) },
  { value: "95%", label: "задоволених клієнтів", icon: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }) }
];
const AboutPage = () => {
  const { getBreadcrumbData, getWebPageData, getOrganizationData, getSiteNavigationData } = useStructuredData();
  const expertiseList = Object.entries(expertiseData).map(([slug, data]) => ({
    slug,
    ...data
  }));
  const webPageData = getWebPageData(
    "Про нас — Незалежний Інститут Судових Експертиз | НІСЕ",
    "Незалежний Інститут Судових Експертиз - професійні судові експертизи з 2007 року. Атестовані експерти, високий рівень якості.",
    "https://expertise.com.ua/pro-nas",
    [
      { name: "Головна", url: "https://expertise.com.ua" },
      { name: "Про нас", url: "https://expertise.com.ua/pro-nas" }
    ]
  );
  const organizationData = getOrganizationData();
  const aboutBreadcrumb = getBreadcrumbData([
    { name: "Головна", url: "https://expertise.com.ua" },
    { name: "Про нас", url: "https://expertise.com.ua/pro-nas" }
  ]);
  const combinedStructuredData = [webPageData, organizationData, getSiteNavigationData(), aboutBreadcrumb];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Про нас — Незалежний Інститут Судових Експертиз | НІСЕ",
        description: "Незалежний Інститут Судових Експертиз - професійні судові експертизи з 2007 року. Атестовані експерти, понад 20 видів експертиз, індивідуальний підхід.",
        keywords: "про НІСЕ, Незалежний Інститут Судових Експертиз, судова експертиза, атестовані експерти, досвід експертизи",
        url: "https://expertise.com.ua/pro-nas",
        structuredData: combinedStructuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-32 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-16 animate-fade-in", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: "Про нас" }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-to-r from-brand-dark via-brand-blue to-brand-light mx-auto mb-6" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-700", children: "НЕЗАЛЕЖНИЙ ІНСТИТУТ СУДОВИХ ЕКСПЕРТИЗ — ваш надійний партнер у сфері експертиз" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [
        /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxs(Card, { className: "h-full shadow-md border-0 overflow-hidden relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-brand-light to-brand-dark" }),
          /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-brand-blue mb-6 flex items-center", children: [
              /* @__PURE__ */ jsx(Briefcase, { className: "mr-2 h-5 w-5" }),
              "Наша історія та досвід"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "prose prose-lg text-gray-700 max-w-none space-y-6", children: [
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Незалежний інститут судових експертиз (надалі – «НІСЕ») – це передова недержавна експертна установа, яка працює у сфері проведення судових експертиз та експертних досліджень з 2007 року." }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "За цей час напрацьовано величезний практичний досвід, що дозволяє НІСЕ проводити експертизи за більш ніж 20 напрямками на високому професійному рівні як за ухвалою суду, так і за заявою сторін." }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Судові експерти НІСЕ атестовані Міністерством юстиції України та мають необхідну кваліфікацію та багаторічний досвід проведення експертиз та експертних досліджень. За необхідності НІСЕ залучає до роботи вузькопрофільних фахівців та експертів з інших юрисдикцій світу, що дає змогу проводити міжнародні комплексні комісійні експертизи підвищеної складності." }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Мінімальний термін проведення експертизи в НІСЕ – від 10 робочих днів (в залежності від кількості питань, поставлених на дослідження, наданих документів, обсягу та складності робіт тощо)." }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "НІСЕ має відмінну репутацію та довіру судів, адвокатської спільноти, підприємств. Кожному клієнту фахівці НІСЕ забезпечують індивідуальний підхід, комплексний супровід та експертну консультацію на найвищому професійному рівні." }),
              /* @__PURE__ */ jsx("p", { className: "leading-relaxed", children: "Окрім практичної діяльності, НІСЕ активно сприяє розвитку судово-експертної галузі, організовуючи семінари, вебінари та круглі столи за участі експертів, адвокатів, суддів для обговорення законодавчих змін та актуальних питань у сфері судової експертизи, удосконалення методики проведення експертиз тощо." })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Card, { className: "h-full shadow-md border-0 overflow-hidden bg-gradient-to-br from-brand-blue to-brand-dark text-white", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center", children: [
            /* @__PURE__ */ jsx(Shield, { className: "mr-2 h-5 w-5" }),
            "Наші переваги"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Досвід з 2007 року" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Понад 20 видів експертиз" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Атестовані експерти" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Індивідуальний підхід" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Міжнародні експертизи" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/20 p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsx("span", { children: "Висока репутація" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-6 bg-white/20" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Отримайте консультацію" }),
            /* @__PURE__ */ jsx(Link, { to: "/kontakty", children: /* @__PURE__ */ jsxs(Button, { className: "w-full bg-white text-brand-blue hover:bg-white/90", size: "lg", children: [
              /* @__PURE__ */ jsx(Phone, { className: "mr-2 h-4 w-4" }),
              " Зв'язатися з нами"
            ] }) })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-8 text-center", children: "Наші досягнення" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((stat, index) => /* @__PURE__ */ jsx(
          Card,
          {
            className: `border-0 shadow-md overflow-hidden card-hover-effect animate-fade-in delay-${index * 100}`,
            children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsx("div", { className: "rounded-full bg-brand-light/20 p-3 text-brand-blue", children: stat.icon }) }),
              /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold text-brand-blue mb-2", children: stat.value }),
              /* @__PURE__ */ jsx("div", { className: "text-gray-700", children: stat.label })
            ] })
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-8 text-center", children: "Напрямки експертних досліджень" }),
        /* @__PURE__ */ jsx(Card, { className: "shadow-md border-0 bg-gradient-to-br from-white to-gray-50", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-lg mb-6", children: "Перелік основних напрямків експертних досліджень, які проводить НІСЕ:" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            expertiseList.slice(0, Math.ceil(expertiseList.length / 2)).map((expertise) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/ekspertyzy/${expertise.slug}`,
                className: "flex items-start gap-3 group hover:bg-gray-100/50 p-2 rounded-md transition-all",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "rounded-full bg-brand-light/20 p-1 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-brand-blue group-hover:text-white transition-colors" }) }),
                  /* @__PURE__ */ jsx("span", { className: "group-hover:text-brand-blue transition-colors flex-grow", children: expertise.title }),
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity" })
                ]
              },
              expertise.slug
            )),
            expertiseList.slice(Math.ceil(expertiseList.length / 2)).map((expertise) => /* @__PURE__ */ jsxs(
              Link,
              {
                to: `/ekspertyzy/${expertise.slug}`,
                className: "flex items-start gap-3 group hover:bg-gray-100/50 p-2 rounded-md transition-all",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "rounded-full bg-brand-light/20 p-1 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4 text-brand-blue group-hover:text-white transition-colors" }) }),
                  /* @__PURE__ */ jsx("span", { className: "group-hover:text-brand-blue transition-colors flex-grow", children: expertise.title }),
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 text-brand-blue transition-opacity" })
                ]
              },
              expertise.slug
            ))
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-brand-light/10 to-brand-dark/10 rounded-lg p-8 text-center animate-fade-in shadow-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-4", children: "Готові до співпраці?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-8 max-w-2xl mx-auto", children: "Ми відкриті до співпраці та готові допомогти у вирішенні найскладніших експертних завдань. Звертайтесь до НІСЕ – і отримаєте надійного партнера, який забезпечить об'єктивність, достовірність та професіоналізм у кожному експертному висновку." }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsx(ConsultationButton, { size: "lg", className: "btn-animate" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const services = {
  "ekspertyza-za-ukhvaloiu-sudu": {
    title: "Експертиза за ухвалою суду",
    description: "Судова експертиза за ухвалою суду від НІСЕ: вивчаємо матеріали справи, проводимо натурне обстеження та готуємо обґрунтований експертний висновок для суду.",
    content: [
      "Одержуємо та вивчаємо матеріали справи;",
      "Прораховуємо вартість робіт;",
      "Призначаємо дату натурного обстеження та повідомляємо суд та сторони;",
      "Виїжджаємо на об'єкт та проводимо натурне обстеження;",
      "Готуємо експертний висновок та надсилаємо його в суд разом з наданими матеріалами."
    ]
  },
  "ekspertne-doslidzhennia-za-zaiavoiu": {
    title: "Експертне дослідження за заявою сторін",
    description: "Досудове експертне дослідження за заявою сторін від НІСЕ: укладаємо договір, проводимо натурне обстеження об'єкта та надаємо письмовий експертний висновок замовнику.",
    content: [
      "Отримуємо заяву про проведення експертного дослідження та необхідні документи;",
      "Вивчаємо надані документи, прораховуємо вартість робіт та укладаємо договір на проведення експертного дослідження;",
      "Погоджуємо дату натурного обстеження та виїжджаємо на об'єкт дослідження;",
      "Готуємо експертний висновок та надсилаємо його замовнику."
    ]
  },
  "shcho-vkhodyt-u-vartist": {
    title: "Що входить у вартість",
    description: "Що входить у вартість судової експертизи НІСЕ: аналіз документів, натурне обстеження, дослідження за методикою, підготовка та оформлення експертного висновку для замовника.",
    content: [
      "З'ясування експертного завдання;",
      "Аналіз та вивчення наданих на дослідження документів;",
      "Натурне обстеження об'єкта дослідження;",
      "Аналіз, узагальнення та систематизація результатів натурного обстеження об'єкта з вивченням відповідної нормативної документації;",
      "Проведення експертного дослідження відповідно до обраної методики;",
      "Підготовка експертного висновку та додатків;",
      "Друкарське оформлення висновку;",
      "Відправка експертного висновку замовнику;",
      "Інші організаційні питання."
    ]
  }
};
const ServicePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getServiceData, getBreadcrumbData } = useStructuredData();
  const serviceContent = slug ? services[slug] : null;
  useEffect(() => {
    if (!serviceContent) {
      navigate("/404");
    }
    window.scrollTo(0, 0);
  }, [serviceContent, navigate]);
  const breadcrumbData = getBreadcrumbData([
    { name: "Головна", url: "https://expertise.com.ua" },
    { name: "Послуги", url: "https://expertise.com.ua/posluhy" },
    { name: (serviceContent == null ? void 0 : serviceContent.title) || "Послуга", url: `https://expertise.com.ua/posluhy/${slug}` }
  ]);
  const serviceStructuredData = serviceContent ? [getServiceData(serviceContent.title, serviceContent.content.join(" ")), breadcrumbData] : [breadcrumbData];
  if (!serviceContent) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: `${serviceContent.title} | НІСЕ`,
        description: serviceContent.description ?? `${serviceContent.title} — детальна інформація про послугу від Незалежного Інституту Судових Експертиз. Атестовані судові експерти, м. Київ.`,
        keywords: `${serviceContent.title.toLowerCase()}, НІСЕ, судова експертиза, послуги експертизи`,
        url: `https://expertise.com.ua/posluhy/${slug}`,
        structuredData: serviceStructuredData
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-24 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "container-custom", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => navigate(-1),
          className: "mb-6 inline-flex items-center text-gray-600 hover:text-brand-blue transition-colors group",
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" }),
            "Назад"
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-8", children: serviceContent.title }),
      /* @__PURE__ */ jsx("div", { className: "bg-white p-8 rounded-xl shadow-sm", children: /* @__PURE__ */ jsx("ol", { className: "space-y-8", children: serviceContent.content.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-medium", children: index + 1 }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700 leading-relaxed pt-1", children: item })
      ] }, index)) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Помилка: Користувач спробував отримати доступ до неіснуючого маршруту:",
      location.pathname
    );
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Сторінку не знайдено | 404 | НІСЕ",
        description: "Сторінка, яку ви шукаєте, не існує або була переміщена. Поверніться на головну сторінку НІСЕ.",
        keywords: "404, сторінка не знайдена, НІСЕ, судова експертиза",
        url: `https://expertise.com.ua${location.pathname}`,
        robots: "noindex, nofollow"
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex items-center justify-center bg-gray-50 py-16", children: /* @__PURE__ */ jsxs("div", { className: "text-center px-4 max-w-lg mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold text-brand-blue mb-4", children: "404" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl text-gray-700 mb-6", children: "Сторінку не знайдено" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-8", children: "Сторінка, яку ви шукаєте, не існує або була переміщена. Можливо, ви перейшли за застарілим посиланням або ввели неправильну адресу." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "btn-primary inline-block",
            children: "Повернутися на головну"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
          /* @__PURE__ */ jsx("p", { children: "Або перейдіть до:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4 mt-2", children: [
            /* @__PURE__ */ jsx(Link, { to: "/ekspertyzy", className: "text-blue-600 hover:underline", children: "Експертизи" }),
            /* @__PURE__ */ jsx(Link, { to: "/kontakty", className: "text-blue-600 hover:underline", children: "Контакти" }),
            /* @__PURE__ */ jsx(Link, { to: "/pro-nas", className: "text-blue-600 hover:underline", children: "Про нас" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const queryClient = new QueryClient();
const RootLayout = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsx(ScrollToTop, {}),
  /* @__PURE__ */ jsx(Outlet, {})
] }) });
const routes = [
  {
    path: "/",
    Component: RootLayout,
    entry: "src/App.tsx",
    children: [
      { index: true, Component: Index, entry: "src/pages/Index.tsx" },
      { path: "ekspertyzy", Component: ExpertisesListPage, entry: "src/pages/ExpertisesListPage.tsx" },
      {
        path: "ekspertyzy/:slug",
        Component,
        getStaticPaths,
        entry: "src/pages/ExpertisePage.tsx"
      },
      { path: "posluhy/:slug", Component: ServicePage, entry: "src/pages/ServicePage.tsx" },
      { path: "tsiny", Component: PricingPage, entry: "src/pages/PricingPage.tsx" },
      { path: "kontakty", Component: ContactPage, entry: "src/pages/ContactPage.tsx" },
      { path: "pro-nas", Component: AboutPage, entry: "src/pages/AboutPage.tsx" },
      { path: "*", Component: NotFound, entry: "src/pages/NotFound.tsx" }
    ]
  }
];
const createRoot = ViteReactSSG(
  {
    routes,
    basename: "/"
  }
);
export {
  createRoot
};
