import { Java } from "@/components/ui/svgs/java";
import { SpringBoot } from "@/components/ui/svgs/springBoot";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Typescript } from "@/components/ui/svgs/typescript";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Angular } from "@/components/ui/svgs/angular";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Express } from "@/components/ui/svgs/express";
import { Tailwind } from "@/components/ui/svgs/tailwind";
import { Php } from "@/components/ui/svgs/php";
import { Laravel } from "@/components/ui/svgs/laravel";
import { Firebase } from "@/components/ui/svgs/firebase";
import { MongoDb } from "@/components/ui/svgs/mongoDb";
import { MySql } from "@/components/ui/svgs/mysql";
import { Aws } from "@/components/ui/svgs/aws";
import { Docker } from "@/components/ui/svgs/docker";
import { Git } from "@/components/ui/svgs/git";
import { Ruby } from "@/components/ui/svgs/ruby";
import { Rails } from "@/components/ui/svgs/rails";
import type { ComponentType } from "react";

export const SKILL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  java: Java,
  spring_boot: SpringBoot,
  javascript: Javascript,
  typescript: Typescript,
  react: ReactLight,
  nextjs: NextjsIconDark,
  angular: Angular,
  nodejs: Nodejs,
  express: Express,
  tailwind: Tailwind,
  php: Php,
  laravel: Laravel,
  firebase: Firebase,
  mongodb: MongoDb,
  mysql: MySql,
  aws: Aws,
  docker: Docker,
  git: Git,
  ruby: Ruby,
  rails: Rails,
};

export const SKILL_ICON_KEYS = Object.keys(SKILL_ICONS);
