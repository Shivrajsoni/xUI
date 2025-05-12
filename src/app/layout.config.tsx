import { HeaderPro } from "@/components/landing/HeaderPro";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Snowflake } from "lucide-react";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center">
        <Snowflake className="mr-2 h-5 w-5 text-blue-400" />
        <span className="hidden md:inline-flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
          xUI
        </span>
      </div>
    ),
  },
  links: [
    {
      type: "custom",
      children: <HeaderPro />,
    },
  ],
};
