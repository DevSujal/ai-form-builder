"use client";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Progress } from "../../../components/ui";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { JosnForms } from "../../../../configs/schema";
import { db } from "../../../../configs";
import { toast } from "../../../hooks/use-toast";
import {CreateForm} from "./";
import { eq } from "drizzle-orm";

const SideNav = ({className}) => {
  const [countOfFormBuild, setCountOfFormBuild] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const menulist = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  const { user } = useUser();

  useEffect(() => {
    user && getFormCount();
  }, [user]);

  const getFormCount = async () => {
    const result = await db
      .select()
      .from(JosnForms)
      .where(eq(JosnForms.createdBy, user.primaryEmailAddress?.emailAddress));
    if (result) {
      setCountOfFormBuild(result.length);
      setPercentage(result.length);
    } else {
      toast({
        description: "No form found",
      });
    }
  };
  return (
    <div className={`h-screen shadow-md border ${className}`}>
      <div className="p-5">
        {menulist.map((menu, index) => (
          <Link
            key={menu.id}
            className={`flex cursor-pointer items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg ${
              path == menu.path && "bg-primary text-white"
            }`}
            href={menu.path}
          >
            <menu.icon size="24" />
            {menu.name}
          </Link>
        ))}
      </div>

      <div className="fixed bottom-7 p-6 w-64">
        <CreateForm className="w-full" />
        <div className="my-7">
          <Progress value={percentage} />
          <h1 className="text-sm text-gray-600 mt-2 ml-1">
            <strong>{countOfFormBuild}</strong> out of <strong>100</strong> file
            created
          </h1>
          <h2 className="text-sm text-gray-600 mt-3 ml-1">
            Upgrade your plan for unlimited ai form builder
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
