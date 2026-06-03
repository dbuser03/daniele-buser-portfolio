"use client";

import { motion } from "motion/react";
import React from "react";
import {
  helloVariants,
  contactsAnimationConfig,
  contactsDelays,
} from "@/constants/contacts";

const Hello: React.FC = () => {
  return (
    <motion.h1
      className="text-[10rem] leading-none text-[var(--foreground)] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]"
      initial="hidden"
      animate="visible"
      variants={helloVariants}
      transition={{
        ...contactsAnimationConfig,
        delay: contactsDelays.hello,
      }}
    >
      Say Hello
      <span className="text-[var(--accent)]">.</span>
    </motion.h1>
  );
};

export default Hello;
