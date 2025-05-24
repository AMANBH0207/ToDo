import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="w-4 h-4 text-blue-600" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
